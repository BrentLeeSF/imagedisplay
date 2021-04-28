import React, { useState } from "react";
import { Button, Modal, Image, Container, Row, Col } from "react-bootstrap";
import "../App.css";


const PhotoContainer = (props: any) => {

  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const { photos } = props;

  if (photos.length > 0) {
    const displayPhotos = () => {
      return (<Container><Row className="justify-content-sm-center">{photos.map((photo: any) => {
        return (
          <div key={photo.index}>
            <Col lg={6}>
            <div className="photoDescription" style={{whiteSpace: "nowrap"}}>
              <h4>{photo.searchWord}</h4>
            </div>
            <Image
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
