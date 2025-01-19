import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
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
        priorLoanDefaults: [false],
        authorizationToCheckCredit: [false],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: [
          this.mustMatch('password', 'confirmPassword'),
          this.conditionalValidation('existingCredit', 'existingCreditAmount'),
          this.conditionalValidation('monthlyInstallment', 'monthlyInstallmentAmount'),
        ]
      }
    );
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
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
  onSubmit() {
    this.submitted = true;
    // Exit function if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.toastr.success('Registration successful!');
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error: string) => {
          this.toastr.error(error);
          this.loading = false;
        }
      );
  }
}