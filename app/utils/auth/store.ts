import * as SecureStore from "expo-secure-store";

export async function saveSpotifyTokens({
  accessToken,
  refreshToken,
  expiresIn,
}: {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}) {
  // convert to seconds
  const expireAt = (Date.now() + expiresIn * 1000).toString();

  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  await SecureStore.setItemAsync("expireAt", expireAt);
}

export async function getAccessToken(): Promise<string | null> {
  return await SecureStore.getItemAsync("accessToken");
}

export async function getRefreshToken(): Promise<string | null> {
  return await SecureStore.getItemAsync("refreshToken");
}

export async function getTokenExpiration(): Promise<string | null> {
  return await SecureStore.getItemAsync("expireAt");
}
