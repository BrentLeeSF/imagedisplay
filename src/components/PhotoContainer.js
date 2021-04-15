import React from "react";
import { Button, Modal, Image, Container, Row, Col } from "react-bootstrap";
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
    const { photos}  = this.props;
    if (photos.length > 0) {
      const displayPhotos = () => {
        return (<Container><Row className="justify-content-sm-center">{photos.map((photo) => {
          return (
            <div key={photo.index}>
              <Col lg={6} flex>
              <div className="photoDescription" style={{whiteSpace: "nowrap"}}>
                <h4>{photo.searchWord}</h4>
              </div>
              <Image
                index={photo.index}
                width={300}
                src={photo.image}
                alt={photo.searchWord}
                onClick={(e) => {
                  this.handleModal(e, photo);
                }}
              />
              </Col>
            </div>
          );
        })}</Row></Container>);
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
              <div />
            )}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default PhotoContainer;
