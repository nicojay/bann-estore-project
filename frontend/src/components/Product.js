import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import data from '../data';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error('Sorry. Product is out of Stock.');
      return;
    } else {
      toast.success('Item Added to your Cart.');
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });

      return;
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Card data-aos="fade-up">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>₱{product.price}</Card.Text>
        <Row>
          <Col>
            {product.countInStock === 0 ? (
              <Button variant="light" disabled>
                Out of Stock
              </Button>
            ) : (
              <Button onClick={() => addToCartHandler(product)}>
                Add to Cart
              </Button>
            )}
          </Col>
          <Col>
            {product.discount === 0 ? (
              <p></p>
            ) : (
              <Button variant="primary" disabled>
                Less ₱{product.discount}
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Product;
