import React from "react";
import { Card } from "react-bootstrap";
import "./AlbumCard.css";

function AlbumCard({ album }) {
  const releaseYear = album.release_date.split("-")[0];

  return (
    <Card>
      <Card.Img className="album-img" src={album.images[0].url} />
      <Card.Body>
        <Card.Title className="album-title">{album.name}</Card.Title>
        <Card.Subtitle>({releaseYear})</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;
