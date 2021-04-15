import "../App.css";
import React from "react";
import { Form, Button, Container, Navbar, Nav } from "react-bootstrap";
import PhotoContainer from "./PhotoContainer";
import SpellChecker from "./SpellChecker";
import Layout from "./Layout";
import dict from "./dict";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      currentSearch: "",
      everyWord: new Set(dict),
      errorMessge: "",
    };
  }

  showFile = async (e) => {
    e.preventDefault();
    this.setState({everyWord: new Set()});
    const lettersNoSpaces = /^[A-Za-z]+$/;
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const newThing = text.split(/\s+/);
      let eachWord = '';
      for (let i = 0; i < newThing.length; i++) {
        eachWord = newThing[i].toLowerCase();
        if(lettersNoSpaces.test(eachWord)) {
          this.state.everyWord.add(eachWord);
        }
      }
    };
    reader.readAsText(e.target.files[0]);
    this.setState({ errorMessge: "" });
  };

  async searchText() {
    try {
      this.setState({ errorMessge: "" });
      const APIKEY = process.env.REACT_APP_API_KEY;
      if (this.state.everyWord.size > 0) {
        const returnedWord = SpellChecker(
          this.state.currentSearch,
          this.state.everyWord
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

            this.setState({ photos: returnedImages });
          } else {
            this.setState({
              errorMessge: "Your search returned no results. Please try again",
            });
          }
        } else {
          this.setState({
            errorMessge: "Your search returned no results. Please try again",
          });
        }
      } else {
        this.setState({
          errorMessge: "Please load dictionary before you search",
        });
      }
      this.setState({ currentSearch: "" });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  render() {
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
                  value={this.state.currentSearch}
                  name="currentSearch"
                  onChange={(e) =>
                    this.setState({ currentSearch: e.target.value })
                  }
                />
              </Form.Group>
              <Button
                variant="light"
                id="searchText"
                onClick={() => this.searchText()}
              >
                Submit
              </Button>
            </Form>
          </Navbar>
        </div>
        <Layout>
          <Container fluid="sm">
            <p>
                <a href="https://github.com/BrentLeeSF/imagedisplay" target="blank">Option: use a different dictionary from here</a>{" "}
                <input type="file" onChange={(e) => this.showFile(e)} />
              </p>
            {this.state.errorMessge !== null ? (
                <div className="errorMessage">
                  <h3>{this.state.errorMessge}</h3>
                </div>
              ) : (
                <div />
              )}
              <div>
              <PhotoContainer photos={this.state.photos} />
            </div>
          </Container>
        </Layout>
      </div>
    );
  }
}

export default Main;
