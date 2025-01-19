import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DeleteDialogService } from '../../services/dialog.service';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.css'
})
export class MyProfilePageComponent implements OnInit, AfterViewInit {
  fetchingUser = true;
  @ViewChild(DeleteDialogComponent)
  deleteDialogComponent!: DeleteDialogComponent;

  isEditMode: boolean = false;
  myProfileForm!: FormGroup;

  isDisabled: boolean = true;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private deleteDialogService: DeleteDialogService
  ) { }
  ngAfterViewInit(): void {
    this.deleteDialogService.setDeleteDialogComponent(this.deleteDialogComponent);
  }

  ngOnInit() {
    this.myProfileForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthdate: ['', Validators.required],
        occupation: ['', Validators.required],
        monthlyIncome: ['', [Validators.required, Validators.min(0)]],
        existingCredit: [false],
        existingCreditAmount: [''],
        monthlyInstallment: [false],
        monthlyInstallmentAmount: [''],
      },
      {
        validator: [
          this.conditionalValidation('existingCredit', 'existingCreditAmount'),
          this.conditionalValidation('monthlyInstallment', 'monthlyInstallmentAmount'),
        ]
      }
    );
    this.getUserDetails();
    this.myProfileForm.disable();
  };

  // Convenience getter for easy access to form fields
  get f() {
    return this.myProfileForm.controls;
  }

  getUserDetails() {
    const currentUser = this.authService.getCurrentUser();
    this.userService.getUser(currentUser.id ?? 0).subscribe((data: any) => {
      this.myProfileForm.patchValue(data);
      this.fetchingUser = false;
    }, (error: any) => {
      this.fetchingUser = false;

      console.error('Error:', error);
      if (error.status === 404) {
        this.toastr.error('User data not found');
      } else {
        this.toastr.error('Error fetching user details');
      }
    });
  }

  saveUserDetails() {
    const currentUser = this.authService.getCurrentUser();
    this.userService.updateUser(currentUser.id ?? 0, this.myProfileForm.value).subscribe((data: any) => {
      this.toastr.success('User  details updated successfully');
    }, (error: any) => {
      console.error('Error:', error);
      if (error.status === 404) {
        this.toastr.error('User not found');
      } else {
        this.toastr.error('Error updating user details');
      }
    });
  }

  // custom validators ---------------------------------------------
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  conditionalValidation(booleanControlName: string, amountControlName: string) {
    return (formGroup: FormGroup) => {
      const booleanControl = formGroup.get(booleanControlName);
      const amountControl = formGroup.get(amountControlName);

      if (booleanControl && booleanControl.value === true) {
        // If the boolean is true, check if the amount field is valid
        if (amountControl && (!amountControl.value || amountControl.value < 0)) {
          amountControl.setErrors({ required: true, min: true });
        } else if (amountControl) {
          amountControl.setErrors(null);
        }
      } else if (amountControl) {
        // If the boolean is false, clear the errors
        amountControl.setErrors(null);
      }
    };
  }

  updateAmountControlValidators(booleanValue: boolean, amountControl: AbstractControl) {
    if (booleanValue) {
      // If the boolean is true, add required and min(0) validators
      amountControl.setValidators([Validators.required, Validators.min(0)]);
    } else {
      // If the boolean is false, clear the validators
      amountControl.clearValidators();
    }

    // Update the control's validity
    amountControl.updateValueAndValidity({ onlySelf: true });
  }

  // Event handlers ------------------------------------------------
  deleteMode() {
    this.deleteDialogService.openDeleteDialog();
  }

  enterEditMode() {
    this.isEditMode = true;
    this.myProfileForm.enable(); // Enable the form controls
  }

  cancelEditMode() {
    this.isEditMode = false;
    this.myProfileForm.disable(); // Disable the form controls
    this.myProfileForm.reset(this.myProfileForm.value); // Reset to original values
  }

  onSubmit() {
    this.submitted = true;
    // Exit function if form is invalid
    if (this.myProfileForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveUserDetails();
    this.loading = false;
  }

}
