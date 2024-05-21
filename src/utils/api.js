import { CLIENT_ID, CLIENT_SECRET } from "../constants/spotifyConfig";

async function fetchAccessToken() {
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET,
  };

  const response = await fetch("https://accounts.spotify.com/api/token", authParameters);
  const data = await response.json();
  return data.access_token;
}

async function searchArtist(searchInput, accessToken) {
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const response = await fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
    searchParameters
  );
  const data = await response.json();
  return data.artists.items[0].id;
}

async function fetchArtistDetails(artistID, accessToken) {
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const response = await fetch("https://api.spotify.com/v1/artists/" + artistID, searchParameters);
  const data = await response.json();
  return data;
}

async function fetchAlbums(artistID, accessToken) {
  const searchParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  const response = await fetch(
    "https://api.spotify.com/v1/artists/" +
      artistID +
      "/albums" +
      "?include_groups=album&market=FR&limit=50",
    searchParameters
  );
  const data = await response.json();
  return data.items;
}

export { fetchAccessToken, searchArtist, fetchArtistDetails, fetchAlbums };
