import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { EmploymentService } from '../../services/employment.service';
import { endOf } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-employment-page',
  templateUrl: './employment-page.component.html',
  styleUrl: './employment-page.component.css'
})
export class EmploymentPageComponent {
  fetchingUser = true;
  isEditMode: boolean = false;
  employmentForm!: FormGroup;
  isDisabled: boolean = true;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private employmentService: EmploymentService,
  ) { }

  ngOnInit() {
    this.employmentForm = this.formBuilder.group(
      {
        employmentType: [''],
        monthlyNetIncome: ['', [Validators.min(0)]],
        employer: [''],
        industry: [''],
        startOfEmployment: [''],
        endOfEmployment: [''],
      },
      {
        validator: [
          this.conditionalValidation('startOfEmployment', 'endOfEmployment'),
        ]
      }
    );
    this.getUserDetails();
    this.employmentForm.disable();
  };

  get f() {
    return this.employmentForm.controls;
  }

  getUserDetails() {
    const currentUser = this.authService.getCurrentUser();
    this.employmentService.getEmploymentDetails(currentUser.id ?? 0).subscribe((data: any) => {
      this.employmentForm.patchValue(data);
      this.fetchingUser = false;
    }, (error: any) => {
      this.fetchingUser = false;

      console.error('Error:', error);
      if (error.status === 404) {
        this.toastr.error('Data not found');
      } else {
        this.toastr.error('Error fetching employment details');
      }
    });
  }


  saveEmploymentDetails() {
    const currentUser = this.authService.getCurrentUser();
    this.employmentService.updateEmploymentDetails(currentUser.id ?? 0, this.employmentForm.value).subscribe((data: any) => {
      this.toastr.success('Employment details updated successfully');
    }, (error: any) => {
      console.error('Error:', error);
      if (error.status === 404) {
        this.toastr.error('User not found');
      } else {
        this.toastr.error('Error updating employment details');
      }
    });
  }

  conditionalValidation(start: string, end: string) {
    return (formGroup: FormGroup) => {
      const startControl = formGroup.get(start);
      const endControl = formGroup.get(end);

      if (endControl && startControl) {
        // If the boolean is true, check if the amount field is valid
        if ((endControl.value && !startControl.value)) {
          startControl.setErrors({ required: true });
        } else if (endControl.value && startControl.value && endControl.value < startControl.value) {
          endControl.setErrors({ less: true });
        } else {
          // If the boolean is false, clear the errors
          startControl.setErrors(null);
          endControl.setErrors(null);
        }
      }
    };
  }

  enterEditMode() {
    this.isEditMode = true;
    this.employmentForm.enable(); // Enable the form controls
  }

  cancelEditMode() {
    this.isEditMode = false;
    this.employmentForm.disable(); // Disable the form controls
    this.employmentForm.reset(this.employmentForm.value); // Reset to original values
  }

  onSubmit() {
    this.submitted = true;
    // Exit function if form is invalid
    if (this.employmentForm.invalid) {
      return;
    }

    this.loading = true;
    this.saveEmploymentDetails();
    this.loading = false;
  }

}
