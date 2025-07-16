import { getValidAccessToken } from "../utils/auth/spotify-auth";

export class LoginViewModel {
  token: string | undefined;

  async onSreenLoad(): Promise<void> {
    this.token = await getValidAccessToken();
  }

  async onLoginClick(): Promise<void> {
    if (!this.token) {
      // TODO - Implement login logic
    }
  }
}
