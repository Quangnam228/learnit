import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function About() {
  return (
    <Row className="mt-5">
      <Col className="text-center">
        <Button variant="primary" size="lg" href="https://facebook.com/">
          My facebook
        </Button>
      </Col>
    </Row>
  );
}

export default About;
