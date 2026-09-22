import Button from 'react-bootstrap/Button';

// ES6: default param variant = 'primary', thu gom props bằng ...rest
const AppButton = ({ variant = 'primary', children, ...rest }) => (
  // ES6: trải props bằng {...rest}
  <Button variant={variant} {...rest}>
    {children}
  </Button>
);

export default AppButton;