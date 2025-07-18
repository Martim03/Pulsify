import { SpotifyAPI } from "@/app/constants/SpotifyAPI";
import * as AuthSession from "expo-auth-session";
import * as ExpoCrypto from "expo-crypto";
import { sha256 } from "js-sha256";
import { base64URLEncode } from "../conversions";
import {
  getAccessToken,
  getRefreshToken,
  getTokenExpiration,
  saveSpotifyTokens,
} from "./store";

const discovery = {
  authorizationEndpoint: SpotifyAPI.authEndpoint,
  tokenEndpoint: SpotifyAPI.tokenEndpoint, // needed later for token exchange
};

/**
 * Handles Spotify authentication using PKCE
 * This function generates a code verifier and code challenge, initiates the
 * authentication flow, and returns the authorization code and code verifier.
 *
 * @returns {Promise<{ code: string, codeVerifier: string }>} - The authorization code and code verifier
 */
export async function sendSpotifyAuthRequest() {
  const randomBytes = await ExpoCrypto.getRandomBytesAsync(32);
  const codeVerifier = base64URLEncode(randomBytes);
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

  const request = new AuthSession.AuthRequest({
    responseType: AuthSession.ResponseType.Code,
    clientId: SpotifyAPI.clientId,
    scopes: SpotifyAPI.scopes,
    redirectUri: SpotifyAPI.redirectURI,
    codeChallenge: codeChallenge,
    codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
  });

  await request.makeAuthUrlAsync(discovery);

  const result = await request.promptAsync(discovery);

  if (result.type === "success" && result.params.code) {
    return {
      code: result.params.code,
      codeVerifier,
    };
  } else {
    throw new Error("Spotify Authentication failed or was cancelled");
  }
}

/**
 * Exchanges the authorization code for an access token and refresh token.
 *
 * @returns {Promise<{ accessToken: string, refreshToken: string, expiresIn: number }>} - The access token, refresh token, and expiration time
 */
export async function exchangeCodeForToken(code: string, codeVerifier: string) {
  const tokenResponse = await AuthSession.exchangeCodeAsync(
    {
      clientId: SpotifyAPI.clientId,
      code,
      redirectUri: SpotifyAPI.redirectURI,
      extraParams: {
        code_verifier: codeVerifier,
      },
    },
    discovery
  );

  if (!tokenResponse || !tokenResponse.accessToken) {
    throw new Error("Token exchange failed.");
  }

  return {
    accessToken: tokenResponse.accessToken,
    refreshToken: tokenResponse.refreshToken,
    expiresIn: tokenResponse.expiresIn,
    scope: tokenResponse.scope,
    tokenType: tokenResponse.tokenType,
  };
}

/**
 * Retrieves a valid access token, refreshing it if necessary.
 *
 * @returns {Promise<string>} - The valid access token
 */
export async function getValidAccessToken(): Promise<string> {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new Error("No tokens available, user needs to authenticate");
  }

  const expired = await isAccessTokenExpired();

  if (!expired) {
    return accessToken;
  }

  // Refresh token because expired
  const newTokens = await refreshAccessToken(refreshToken);

  if (newTokens.expiresIn === undefined) {
    throw new Error("Missing expiresIn from token refresh response");
  }

  await saveSpotifyTokens({
    accessToken: newTokens.accessToken,
    refreshToken: newTokens.refreshToken,
    expiresIn: newTokens.expiresIn,
  });

  return newTokens.accessToken;
}

/**
 * Checks if the access token is expired.
 *
 * @returns {Promise<boolean>} - True if the access token is expired, false otherwise
 */
async function isAccessTokenExpired(): Promise<boolean> {
  const expireAtStr = await getTokenExpiration();
  if (!expireAtStr) return true; // No expiration info, treat as expired

  const expireAt = parseInt(expireAtStr, 10);
  return Date.now() >= expireAt;
}

/**
 * Refreshes the access token using the refresh token.
 *
 * @returns {Promise<{ accessToken: string, refreshToken: string, expiresIn: number }>} - The new access token, refresh token, and expiration time
 */
async function refreshAccessToken(refreshToken: string) {
  const tokenResponse = await AuthSession.refreshAsync(
    {
      clientId: SpotifyAPI.clientId,
      refreshToken: refreshToken,
    },
    discovery
  );

  if (!tokenResponse || !tokenResponse.accessToken) {
    throw new Error("Failed to refresh access token");
  }

  return {
    accessToken: tokenResponse.accessToken,
    refreshToken: tokenResponse.refreshToken ?? refreshToken, // may not be returned
    expiresIn: tokenResponse.expiresIn,
    scope: tokenResponse.scope,
    tokenType: tokenResponse.tokenType,
  };
}
