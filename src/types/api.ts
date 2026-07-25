export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    role: 'admin' | 'user';
    createdAt: string;
  };
  token: string;
  refreshToken?: string;
}
