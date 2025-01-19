import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { backendUrl } from "../constants";
import { Observable } from "rxjs";
import { LoanCalculate } from "../models/loan";

@Injectable({
    providedIn: 'root',
})
export class LoanService {
    constructor(private http: HttpClient) { }

    getLoans() {
        return this.http.get(backendUrl.loanService.getLoans) as Observable<
            string[]
        >;
    }

    calculateLoan(loanCalculate: LoanCalculate) {
        return this.http.post(
            backendUrl.loanService.calculateLoan,
            loanCalculate
        ) as Observable<any>;
    }
};