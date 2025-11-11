export interface IAuthService {
  register(name: string, email: string, password: string): Promise<{
    user: { id: string; name: string; email: string };
    token: string;
  }>;
  login(email: string, password: string): Promise<{
    user: { id: string; name: string; email: string };
    token: string;
  }>;
}