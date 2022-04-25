import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container med-container" data-aos="fade-left">
        <Helmet>
          <title>BANN - Payment Method</title>
        </Helmet>

        <div className="inmedcontainer">
          <h1 className="my-4">Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-4">
              <Form.Check
                className="formcheck"
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Form.Check
                className="formcheck"
                type="radio"
                id="COD"
                label="Cash on Delivery"
                value="Cash on Delivery"
                checked={paymentMethodName === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
