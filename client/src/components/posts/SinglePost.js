import React from "react";
import Badge from "react-bootstrap/Badge";
import ActionButton from "./ActionButton";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SinglePost({ post: { _id, status, title, description, url } }) {
  return (
    <Card
      className="shadow"
      border={
        status === "Learned"
          ? "success"
          : status === "Learning"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === "Learned"
                    ? "success"
                    : status === "Learning"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButton url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SinglePost;
