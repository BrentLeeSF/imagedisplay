import "../App.css";
import React, { useState } from "react";
import { Form, Button, Container, Navbar, Nav } from "react-bootstrap";
import PhotoContainer from "./PhotoContainer";
import SpellChecker from "./SpellChecker";
import Layout from "./Layout";
import dict from "./dict";

const Main = () => {

    const [photos, setPhotos] = useState([]);
    const [currentSearch, setCurrentSearch] = useState("");
    const [everyWord, setEveryWord] = useState(new Set(dict));
    const [errorMessage, setErrorMessage] = useState("");

  const showFile = async (e) => {
    e.preventDefault();
    const lettersNoSpaces = /^[A-Za-z]+$/;
    
    const reader = new FileReader();
    let everyWordArr = [];

    reader.onload = async (e) => {
      const text = e.target.result;
      const newThing = text.split(/\s+/);
      let eachWord = ''
      for (let i = 0; i < newThing.length; i++) {
        eachWord = newThing[i].toLowerCase().toString();
        if(lettersNoSpaces.test(eachWord)) {
          everyWordArr.push(eachWord);
        }
      }
      setEveryWord(new Set(everyWordArr));
    };
    reader.readAsText(e.target.files[0]);
    setErrorMessage("");
  };

  const searchText = async () => {
    try {
      setErrorMessage("");
      const APIKEY = process.env.REACT_APP_API_KEY;
      if (everyWord.size > 0) {
        const returnedWord = SpellChecker(
          currentSearch,
          everyWord
        );
        if (returnedWord !== null) {
          const res = await fetch(
            `https://pixabay.com/api/?key=${APIKEY}&q=${returnedWord}&image_type=images`
          );
          if (!res.ok) {
            throw Error("Error!");
          }
          const data = await res.json();
          const returnedImages = [];

          if (data.hits.length > 0) {
            let index = 0;
            for (let eachValue of data.hits) {
              returnedImages.push({
                searchWord: eachValue.tags,
                index,
                image: eachValue.largeImageURL,
                webformatURL: eachValue.webformatURL,
              });
              ++index;
            }
            setPhotos(returnedImages);
          } else {
            setErrorMessage("Your search returned no results. Please try again");
          }
        } else {
          setErrorMessage("Your search returned no results. Please try again");
        }
      } else {
        setErrorMessage("Please load dictionary before you search");
      }
      setCurrentSearch("");
    } catch (error) {
      throw new Error(error.message);
    }
  }

    return (
      <div className="App">
        <div>
          <Navbar bg="primary" variant="light">
            <Nav className="mr-auto search-text">
              Search images, or download text file from GitHub repo and use another dictionary
            </Nav>
            <Form inline>
              <Form.Group>
                <Form.Control
                  placeholder="Search Image"
                  type="text"
                  className="mr-sm-2"
                  value={currentSearch}
                  name="currentSearch"
                  onChange={(e) => setCurrentSearch(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="light"
                id="searchText"
                onClick={() => searchText()}
              >
                Submit
              </Button>
            </Form>
          </Navbar>
        </div>
        <Layout>
          <Container fluid="sm">
            <p>
                <a href="https://github.com/BrentLeeSF/imagedisplay" 
                target="blank">Option: use a different dictionary from here</a>{" "}
                <input type="file" onChange={e => showFile(e)} />
              </p>
            {errorMessage !== null ? (
                <div className="errorMessage">
                  <h3>{errorMessage}</h3>
                </div>
              ) : (
                <div />
              )}
              <div>
              <PhotoContainer photos={photos} />
            </div>
          </Container>
        </Layout>
      </div>
    );
}

export default Main;
