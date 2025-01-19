export const authApi = 'http://localhost:8200'
export const userService = 'http://localhost:8200'
export const resultApi = 'http://localhost:8210'
export const loanApi = 'http://localhost:8220'

export const backendUrl = {
  authService: {
    authenticate: `${authApi}/user/authenticate`,
    register: `${authApi}/user/register`,
    changePassword: `${authApi}/user/change-password/`,
    delete: `${authApi}/user/`,
  },
  userService: {
    getUser: `${userService}/user/`,
    saveUser: `${userService}/user/`,
  },
  loanService: {
    getLoans: `${loanApi}/loans`,
    calculateLoan: `${loanApi}/loan/calculate`,
  },
  resultService: {
    getResults: `${resultApi}/results`,
  },
}