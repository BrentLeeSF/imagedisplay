import "../App.css";
import React, { useState } from "react";
import { Form, Button, Container, Navbar, Nav } from "react-bootstrap";
import PhotoContainer from "./PhotoContainer";
import SpellChecker from "./SpellChecker";
import Layout from "./Layout";
import dict from "./dict";
import { eachImage } from '../interfaces/eachImage';


const Main = () => {

    const [photos, setPhotos] = useState<Array<eachImage>>([]);
    const [currentSearch, setCurrentSearch] = useState<any | null>("");
    const [everyWord, setEveryWord] = useState<Set<string> | null>(new Set(dict));
    const [errorMessage, setErrorMessage] = useState<string>("");
    

  const showFile = async (e: any) => {
    e.preventDefault();
    const lettersNoSpaces = /^[A-Za-z]+$/;
    
    const reader = new FileReader();
    let everyWordArr: Array<string> = [];

    reader.onload = async (e: any) => {
      const text = e.target.result;
      const newThing: Array<string> = text.split(/\s+/);
      let eachWord: string = '';
      for (let i: number = 0; i < newThing.length; i++) {
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
      if (everyWord !== null && currentSearch !== null) {
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
          
          const returnedImages: Array<eachImage> = [];
          if (data.hits.length > 0) {
            let index: number = 0;
            for (let eachValue of data.hits) {
              returnedImages.push({
                searchWord: eachValue.tags,
                index,
                image: eachValue.largeImageURL
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
