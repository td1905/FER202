import React, { useState } from 'react';
import { Container, Form, Row, Col, InputGroup, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  // validated defaults to true so it immediately showcases the React-Bootstrap validation state shown in teacher's screenshot
  const [validated, setValidated] = useState(true);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setSubmittedSuccess(false);
    } else {
      setSubmittedSuccess(true);
    }

    setValidated(true);
  };

  return (
    <Container className="pb-5">
      {/* Title */}
      <h2 style={{ color: '#c9302c' }} className="fw-normal mb-4">
        Contact Form
      </h2>

      {submittedSuccess && (
        <Alert variant="success" dismissible onClose={() => setSubmittedSuccess(false)} className="mb-4">
          <i className="bi bi-check-circle-fill me-2"></i>
          Thông tin liên hệ của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </Alert>
      )}

      {/* Official React-Bootstrap Form validation example as requested */}
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-2">
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="px-4 py-2">
          Submit form
        </Button>
      </Form>
    </Container>
  );
};

export default Contact;
