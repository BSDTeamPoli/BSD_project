export interface Loan {
    id: number;
    name: string;
    description: string;
}

export interface LoanCalculate {
    id: number;
    userId: number;
    amount: number;
    period: number;
}