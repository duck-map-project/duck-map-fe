export interface AuthRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends AuthRequest {
  username: string;
}

export interface UserInfoType {
  id: number;
  username: string;
  email: string;
  userProfile: string;
  role: string;
  loginAt: string;
}
