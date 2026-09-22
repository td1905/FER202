import Container from 'react-bootstrap/Container';
import { APP_NAME } from '../../data/menu';

const Footer = () => (
  <footer className="bg-light text-center py-3 mt-5 border-top">
    <Container>
      <p className="mb-0 text-muted">
        {`© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.`}
      </p>
    </Container>
  </footer>
);

export default Footer;