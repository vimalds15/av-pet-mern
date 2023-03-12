import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../services/cart/CartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state=>state.cart)

  const {shippingAddress}= cart;
  const [address,setAddress] = useState(shippingAddress.address)
  const [city,setCity] = useState(shippingAddress.city)
  const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
  const [country,setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setShippingAddress({address,city,postalCode,country}))
    navigate("/payment")
  }

  return (
    <FormContainer>
       <CheckoutSteps step1 step2 />
       <h1>Shipping</h1> 
       <Form>
       <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
       <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
       <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="postalCode"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
       <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button onClick={submitHandler} type="submit" variant="primary">Continue</Button>
       </Form>
    </FormContainer>
  )
}

export default ShippingScreen