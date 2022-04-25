import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    let pop_status = localStorage.getItem('pop_status');
    if (!pop_status) {
      setShow(true);
      localStorage.setItem('pop_status', 1);
    }

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>BANN Assistive Tech Store</title>
      </Helmet>
      <>
        <Modal
          size="xl"
          centered
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Hi! Welcome to BANN Assistive Tech Store</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              <strong>Disclaimers for Users</strong>
            </h3>
            <h5>
              All the information on this website -
              https://bann-estore.herokuapp.com/ - is published in good faith
              and for general information purpose only. We do not make any
              warranties about the completeness, reliability and accuracy of
              this information. Any action you take upon the information you
              find on this website, is strictly at your own risk. We will not be
              liable for any losses and/or damages in connection with the use of
              our website.
            </h5>
            <h5>
              From our website, you can visit other websites by following
              hyperlinks to such external sites. While we strive to provide only
              quality links to useful and ethical websites, we have no control
              over the content and nature of these sites. These links to other
              websites do not imply a recommendation for all the content found
              on these sites. Site owners and content may change without notice
              and may occur before we have the opportunity to remove a link
              which may have gone 'bad'.
            </h5>
            <h5>
              Please be also aware that when you leave our website, other sites
              may have different privacy policies and terms which are beyond our
              control. Please be sure to check the Privacy Policies of these
              sites as well as their "Terms of Service" before engaging in any
              business or uploading any information.
            </h5>
            <h3>
              <strong>Consent</strong>
            </h3>
            <h5>
              By using our website, you hereby consent to our disclaimer and
              agree to its terms.
            </h5>
            <h3>
              <strong>Update</strong>
            </h3>
            <h5>
              Should we update, amend or make any changes to this website, those
              changes will be prominently posted here.
            </h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShow(false)}>
              Yes, I understand
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <Carousel data-aos="fade" controls={false} fade>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="./images/image1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="./images/image2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="./images/image3.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div data-aos="fade" className="fprod">
        <h1>Featured Products</h1>
      </div>
      <hr data-aos="fade"></hr>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
