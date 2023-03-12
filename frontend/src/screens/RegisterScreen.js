import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../services/user/UserSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.user)
  const {loading,error,userInfo} = userLogin

  const redirect = location.search ? location.search.split("=")[1]:"/"

  useEffect(()=>{
    if(userInfo){
        navigate(redirect)
    }
  },[navigate,redirect,userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password!==confirmPassword){
        setMessage("Password do not match")
    }else{
    dispatch(register(name,email,password))
  }}

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
            Register
        </Button>
      </Form>

      <Row className="my-3">
        <Col>
            Have an Account ? <Link to={redirect?`/login?redirect=${redirect}`:"/login"}>Login</Link>
        </Col>
      </Row>

    </FormContainer>
  );
};

export default RegisterScreen;
