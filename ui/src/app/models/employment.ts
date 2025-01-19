export interface Employment {
    employmentType: string;
    monthlyNetIncome: number | null;
    currentEmployer: string;
    industry: string;
    startOfEmployment: Date | null;
    endOfEmployment: Date | null;
}