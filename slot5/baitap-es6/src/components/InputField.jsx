import Form from 'react-bootstrap/Form';

// ES6: Tách id, label, helpText và gom phần còn lại vào ...inputProps
const InputField = ({ id, label, helpText, ...inputProps }) => (
  <Form.Group controlId={id} className="mb-3">
    {label && (
      <Form.Label>
        {label}
        {/* ES6: Nếu required là true thì in thêm dấu sao đỏ */}
        {inputProps.required && <span className="text-danger"> *</span>}
      </Form.Label>
    )}
    {/* ES6: Trải toàn bộ props (type, placeholder, onChange, ...) xuống Control */}
    <Form.Control {...inputProps} />
    {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
  </Form.Group>
);

export default InputField;