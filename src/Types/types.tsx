export interface LoginUserType {
  email: string;
  password: string;
}

export interface UserSuccess {
  loginSuccess: boolean;
  message: string;
}

export interface RegisterUser {
  email: string;
  password: string;
  name: string;
  lastName: string;
  confirmPassword?: string;
}

export interface isAuthType {
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  lastName: string;
  role: number;
  cart: Array<any>;
  history: Array<any>;
}
