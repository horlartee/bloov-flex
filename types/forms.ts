export interface SignUp {
  fullName: string;
  email: string;
  password: string;
  terms?: boolean;
  rememberMe?: boolean;
}
export interface Login {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface EmailVerification {
  email: string;
  OTPToken: string;
  OTPCode: string;
}
