import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrl: './loan-page.component.css'
})
export class LoanPageComponent implements OnInit {

  loans: string[] | undefined;

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.getLoans();
  }

  getLoans() {
    this.loanService.getLoans().subscribe((data: string[]) => {
      this.loans = data;
      console.log('Loans:', this.loans);
    });
  }

}
