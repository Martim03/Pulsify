import {
  exchangeCodeForToken,
  getValidAccessToken,
  sendSpotifyAuthRequest,
} from "../utils/auth/spotify-auth";
import { saveSpotifyTokens } from "../utils/auth/store";

export class LoginViewModel {
  async tryLoadValidToken(): Promise<boolean> {
    try {
      const token = await getValidAccessToken();
      return !!token;
    } catch (error) {
      console.log("Could not retrieve valid token:", error);
      return false;
    }
  }

  // TODO - add loading screen here
  async login(): Promise<boolean> {
    try {
      const { code, codeVerifier } = await sendSpotifyAuthRequest();

      const { accessToken, refreshToken, expiresIn } =
        await exchangeCodeForToken(code, codeVerifier);

      if (!refreshToken || expiresIn === undefined) {
        throw new Error("Missing required token fields from Spotify response");
      }

      await saveSpotifyTokens({ accessToken, refreshToken, expiresIn });

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      // ! TODO - rethrow error to show an error message in the UI
      // throw error;
      return false;
    }
  }
}
