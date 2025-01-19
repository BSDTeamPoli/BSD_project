import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.css']
})
export class LoanPageComponent implements OnInit {
  fetchingLoans = true;
  loans: Loan[] | undefined;
  selectedLoanId: number | null = null;
  selectedLoanName: string = '';
  selectedLoanDescription: string = '';

  constructor(private loanService: LoanService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getLoans();
  }

  getLoans() {
    this.loanService.getLoans().subscribe((data: any[]) => {
      this.loans = data;
      this.fetchingLoans = false;
    }, (error: any) => {
      this.fetchingLoans = false;

      console.error('Error:', error);

      this.toastr.error('Error fetching loan types');

    });
  }

  onPickLoan(loanId: string) {
    this.selectedLoanId = Number(loanId);
    if (this.loans) {
      const selectedLoan = this.loans.find((loan) => loan.id === this.selectedLoanId);
      this.selectedLoanName = selectedLoan?.name || '';
      this.selectedLoanDescription = selectedLoan?.description || '';
    }
  }

  onDeselectLoan() {
    this.selectedLoanId = null;
    this.selectedLoanName = '';
    this.selectedLoanDescription = '';
  }
}