import React from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";

const SearchForm = ({ onSearch, setSearchInput }) => {
  return (
    <Container>
      <InputGroup className="mb-3" size="lg">
        <FormControl
          placeholder="Search for artist"
          type="input"
          onChange={(event) => setSearchInput(event.target.value)}
          className="rounded-pill border-right-0"
        />

        <Button
          onClick={onSearch}
          className="rounded-pill border-left-0"
          variant="primary"
        >
          Search
        </Button>
      </InputGroup>
    </Container>
  );
};

export default SearchForm;
