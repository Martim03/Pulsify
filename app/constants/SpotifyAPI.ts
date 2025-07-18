export const SpotifyAPI = {
  clientId: "f479b21f61544490b37ae22e07746cd5",
  redirectURI: "exp://192.168.1.78:8081",
  scopes: [
    "playlist-modify-public",
    "user-follow-read",
    "user-top-read",
    "user-read-recently-played",
  ],
  authEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

// TODO - Change redirect URI (AuthSession.makeRedirectUri({ useProxy: true }))
