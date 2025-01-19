import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { LoanService } from '../../services/loan.service';
import { LoanCalculate } from '../../models/loan';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.css'
})
export class LoanFormComponent {
  @Input() selectedLoanId: number | null = null; // Unique identifier
  @Input() name: string = ''; // Title to display on the left
  @Input() description: string = '';  // Optional endpoint to navigate to on click
  @Output() clicked = new EventEmitter<string>();

  loanForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loanService: LoanService,
  ) { }

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      amount: ['', Validators.required, this.minAsyncValidator(1)],
      period: ['', Validators.required, this.minAsyncValidator(1)],
    });

  }

  minAsyncValidator(minValue: number): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (value < minValue) {
        return of({ 'min': true, 'requiredValue': minValue });
      }
      return of(null);
    };
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loanForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Exit function if form is invalid
    if (this.loanForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('Loan form submitted');
    // Call API to save the loan
    const userId = this.authenticationService.getCurrentUser().id ?? 0;

    const loanCalculate: LoanCalculate = {
      id: this.selectedLoanId ?? 0,
      userId: userId,
      amount: this.f['amount'].value,
      period: this.f['period'].value,
    };
    console.log('Loan form called with:', loanCalculate);
    this.loanService.calculateLoan(loanCalculate).subscribe(
      (response) => {
        this.toastr.success('Loan calculated successfully');
        this.router.navigate(['/myResult']);
      }, (error) => {
        this.toastr.error('Error calculating loan');
        console.error('Error:', error);
        this.loading = false;
      });
  }

  onCancel() {
    this.clicked.emit();
  }
}
