import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.css'
})
export class LoanFormComponent {
  @Input() selectedLoanId: number | null = null; // Unique identifier
  @Input() name: string = ''; // Title to display on the left
  @Input() description: string = '';  // Optional endpoint to navigate to on click

  loanForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      amount: ['', Validators.required, Validators.min(1)],
      period: ['', Validators.required, Validators.min(1)],
    });

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

  }
}
