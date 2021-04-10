import React from "react";
import { Container } from "react-bootstrap";

function Layout(props) {
  return (
    <Container>
      <div className="thisContainer">{props.children}</div>
    </Container>
  );
}

export default Layout;
