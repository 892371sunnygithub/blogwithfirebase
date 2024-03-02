import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const ReadMoreBlogPara = ({ show, hide, paragraph, title }) => {
  return (
    <Modal show={show} onHide={hide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Continue Reading... </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {title && <h5 className="text-capitalize">{title} </h5>}
        {paragraph}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReadMoreBlogPara;
