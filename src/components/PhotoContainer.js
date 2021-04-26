import React, { useState } from "react";
import { Button, Modal, Image, Container, Row, Col } from "react-bootstrap";
import "../App.css";

const PhotoContainer = ({photos}) => {

    const [selectedPhoto, setSelectedPhoto] = useState(null);

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
                onClick={e => setSelectedPhoto(photo)}
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
            {selectedPhoto !== null ? (
              <Modal show={true}>
                <Modal.Header>
                  <div className="photoDescription">
                    <h4>{selectedPhoto.searchWord}</h4>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <Image
                    width={350}
                    src={selectedPhoto.image}
                    alt={selectedPhoto.searchWord}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    onClick={e => setSelectedPhoto(null)}
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

export default PhotoContainer;
