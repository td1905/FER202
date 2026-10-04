import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { COURSES, SCHEDULES, STEPS, wizardReducer, initWizard } from './wizardReducer';

const formatVND = (n) => n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const CourseWizard = ({ initialCourseId = 'react' }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard);
  const { step, maxVisited, values, errors, submitted } = state;
  const course = COURSES.find((c) => c.id === values.courseId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value: type === 'checkbox' ? checked : value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: step === STEPS.length - 1 ? 'SUBMIT' : 'NEXT' });
  };

  if (submitted) {
    return (
      <Alert variant="success" style={{ maxWidth: 560 }} className="w-100 shadow-sm">
        <Alert.Heading>Đăng ký thành công!</Alert.Heading>
        <p>{`${values.fullName} đã đăng ký ${course?.name} (${values.schedule}). Học phí: ${course ? formatVND(course.fee) : ''}.`}</p>
        <Button variant="outline-success" onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}>
          Đăng ký khóa khác
        </Button>
      </Alert>
    );
  }

  const field = (name, label, type = 'text') => (
    <Form.Group className="mb-3" controlId={`wz-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={values[name]} onChange={handleChange} isInvalid={Boolean(errors[name])} />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  return (
    <Card style={{ maxWidth: 560 }} className="w-100 shadow-sm">
      <Card.Header>
        <Nav variant="pills">
          {STEPS.map((label, i) => (
            <Nav.Item key={label}>
              <Nav.Link
                active={i === step}
                disabled={i > maxVisited}
                onClick={() => dispatch({ type: 'GO_TO', payload: i })}
              >
                {`${i + 1}. ${label}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              {field('fullName', 'Họ và tên')}
              {field('email', 'Email', 'email')}
              {field('phone', 'Số điện thoại', 'tel')}
            </>
          )}

          {step === 1 && (
            <>
              <Form.Group className="mb-3" controlId="wz-courseId">
                <Form.Label>Khóa học</Form.Label>
                <Form.Select name="courseId" value={values.courseId} onChange={handleChange} isInvalid={Boolean(errors.courseId)}>
                  <option value="">-- Chọn khóa học --</option>
                  {COURSES.map(({ id, name, fee }) => (
                    <option key={id} value={id}>{`${name} – ${formatVND(fee)}`}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.courseId}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="d-block">Lịch học</Form.Label>
                {SCHEDULES.map((s, i) => (
                  <Form.Check
                    inline key={s} type="radio" id={`wz-schedule-${i}`} name="schedule" label={s} value={s}
                    checked={values.schedule === s} onChange={handleChange} isInvalid={Boolean(errors.schedule)}
                  />
                ))}
                {errors.schedule && <div className="text-danger small mt-1">{errors.schedule}</div>}
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <ListGroup className="mb-3">
                <ListGroup.Item>{`Học viên: ${values.fullName}`}</ListGroup.Item>
                <ListGroup.Item>{`Liên hệ: ${values.email} · ${values.phone}`}</ListGroup.Item>
                <ListGroup.Item>{`Khóa học: ${course?.name ?? ''} · ${values.schedule}`}</ListGroup.Item>
                <ListGroup.Item className="fw-bold">{`Học phí: ${course ? formatVND(course.fee) : ''}`}</ListGroup.Item>
              </ListGroup>
              <Form.Check
                id="wz-agree" name="agree" className="mb-3" label="Tôi xác nhận thông tin trên là chính xác"
                checked={values.agree} onChange={handleChange}
                isInvalid={Boolean(errors.agree)} feedback={errors.agree} feedbackType="invalid"
              />
            </>
          )}

          <div className="d-flex justify-content-between">
            <Button variant="outline-secondary" disabled={step === 0} onClick={() => dispatch({ type: 'BACK' })}>
              ← Quay lại
            </Button>
            <Button type="submit" variant={step === STEPS.length - 1 ? 'success' : 'primary'}>
              {step === STEPS.length - 1 ? 'Xác nhận đăng ký' : 'Tiếp tục →'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CourseWizard;