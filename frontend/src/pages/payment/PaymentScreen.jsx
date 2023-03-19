import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import { setPaymentMethod } from "../../services/cart/CartSlice";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [payment, setPayment] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setPaymentMethod(payment))
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        
        <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPayment(e.target.value)}
          ></Form.Check>
          {/* <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check> */}
        </Col>
        </Form.Group>
        <Button onClick={submitHandler} type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
