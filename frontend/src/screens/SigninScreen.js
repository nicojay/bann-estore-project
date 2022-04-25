import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container>
      <Helmet>
        <title>BANN - User Sign In</title>
      </Helmet>
      <Row>
        <Col xs={12} md={6}>
          <img
            data-aos="fade"
            className="img-large"
            src="../images/signin.jpg"
            alt="logo"
          ></img>
        </Col>
        <Col data-aos="fade-left" className="small-container" xs={12} md={6}>
          <div className="incontainer">
            <img
              className="user-image"
              src="../images/user.png"
              alt="logo"
            ></img>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="forminput"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="forminput"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="mb-3">
                <p>
                  By continuing, you agree to BANN Assistive Tech Store's{' '}
                  <a href="/">Conditions of Use</a> and
                  <a href="/"> Privacy Notice</a>.
                </p>
              </div>
              <div className="mb-3">
                <Button type="submit" className="button">
                  Sign In
                </Button>
              </div>
              <div className="mb-3">
                New customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>
                  Create your account
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
