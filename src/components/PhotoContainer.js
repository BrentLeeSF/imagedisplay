import React from "react";
import { Button, Modal, Image } from "react-bootstrap";
import "../App.css";

class PhotoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: null,
    };
  }

  handleModal = (event, photo) => {
    this.setState({ selectedPhoto: photo });
  };

  render() {
    if (this.props.photos.length > 0) {
      const displayPhotos = () => {
        return this.props.photos.map((photo) => {
          return (
            <div key={photo.index}>
              <div className="photoDescription">
                <h4>{photo.searchWord}</h4>
              </div>
              <Image
                index={photo.index}
                width={500}
                src={photo.image}
                alt={photo.searchWord}
                fluid
                onClick={(e) => {
                  this.handleModal(e, photo);
                }}
              />
            </div>
          );
        });
      };
      return (
        <div>
          {displayPhotos()}
          <div>
            {this.state.selectedPhoto !== null ? (
              <Modal show={true}>
                <Modal.Header>
                  <div className="photoDescription">
                    <h4>{this.state.selectedPhoto.searchWord}</h4>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <Image
                    width={350}
                    src={this.state.selectedPhoto.image}
                    alt={this.state.selectedPhoto.searchWord}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      this.handleModal(e, null);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default PhotoContainer;
