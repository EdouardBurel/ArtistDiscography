import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import AlbumCard from "./components/AlbumCard";
import {
  fetchAccessToken,
  searchArtist,
  fetchArtistDetails,
  fetchAlbums,
} from "./utils/api";
import "./App.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [artistGenre, setartistGenre] = useState("");
  const [artistImage, setArtistImage] = useState("");
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    fetchAccessToken().then((token) => setAccessToken(token));
  }, []);

  async function search() {
    console.log("Search for " + searchInput);

    const artistID = await searchArtist(searchInput, accessToken);
    console.log("Artist ID is " + artistID);

    const artistDetails = await fetchArtistDetails(artistID, accessToken);
    console.log("Artist details:", artistDetails);
    setArtistImage(artistDetails.images[0].url);
    setArtistName(artistDetails.name);
    setartistGenre(artistDetails.genres)

    const albumsData = await fetchAlbums(artistID, accessToken);
    console.log(albumsData);
    setAlbums(albumsData);
  }

  useEffect(() => {
    function handleResize() {
      // Adjust number of columns based on screen width
      if (window.innerWidth < 510) {
        setColumns(1); // For small devices, set to 2 columns
      } else if (window.innerWidth < 640) {
        setColumns(2);
      } else if (window.innerWidth < 1020) {
        setColumns(3);
      } else {
        setColumns(4); // For larger devices, set to 4 columns
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial adjustment
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        search();
      }
    }

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [searchInput, accessToken]);

  return (
    <div className="App">
      <SearchForm onSearch={search} setSearchInput={setSearchInput} />
      <Container>
        {artistImage && (
          <Row className="justify-content-center my-5">
            {/* Artist Image */}
            <div className="col-md-4">
              {artistImage && (
                <img
                  src={artistImage}
                  alt="Artist"
                  style={{ maxWidth: "70%", width:"100%", height:"auto", borderRadius: "5%" }}
                />
              )}
            </div>
            {/* Artist Info */}
            <div className="col-md-7 ArtistInfo">
              {/* Display artist information */}
              <div>
                <h2>{artistName}</h2>
                <h3>{artistGenre.slice(0,4).join(" / ")}</h3>
              </div>
            </div>
          </Row>
        )}
        <Row className={`mx-2 row row-cols-${columns}`}>
          {albums.map((album, i) => (
            <AlbumCard key={i} album={album} />
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
