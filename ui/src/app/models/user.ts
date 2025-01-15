export class UserRegister {
    id: number | null = null;
    username: string = '';
    fullname: string = '';
    email: string = '';
    birthdate: Date | null = null;
    occupation: string = '';
    monthlyIncome: number | null = null;
    existingCredit: boolean = false;
    existingCreditAmount: number | null = null;
    monthlyInstallment: boolean = false;
    monthlyInstallmentAmount: number | null = null;
    password: string = '';
}

export class UserEdit {
    username: string = '';
    fullname: string = '';
    email: string = '';
    birthdate: Date | null = null;
    occupation: string = '';
    monthlyIncome: number | null = null;
    existingCredit: boolean = false;
    existingCreditAmount: number | null = null;
    monthlyInstallment: boolean = false;
    monthlyInstallmentAmount: number | null = null;
}
