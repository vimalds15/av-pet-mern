import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {  Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, setUserDetail } from "../services/user/UserDetailSlice";
import {  setUserUpdateReset, updateUser } from "../services/user/UserUpdateSlice";


const UserEditScreen = () => {
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate()
//   const location = useLocation()
  const dispatch = useDispatch()
  const {id}=useParams()

  const userDetail = useSelector(state=>state.userDetail)
  const {loading,error,user} = userDetail

  const userUpdate = useSelector(state=>state.userUpdate)
  const {loading:loadingUpdate,error:errorUpdate, success:successUpdate} = userUpdate

//   const redirect = location.search ? location.search.split("=")[1]:"/"

  useEffect(()=>{
   if(successUpdate){
      dispatch(setUserDetail(null))
      dispatch(setUserUpdateReset())
      navigate('/admin/userlist')
   }else{
       if(!user?.name || user._id !==id){
        dispatch(getUserDetails(id))
       }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
       }
   }
  },[dispatch,user,id,successUpdate,navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id:id,name,email,isAdmin}))
  }

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3"> Go Back</Link>

    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate&&<Loader />} 
      {errorUpdate&& <Message variant="danger">{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>:(

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

        <Form.Group controlId="isadmin">
          <Form.Check
            type="checkbox"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
        </Form.Group>


        <Button type="submit" variant="primary">
            Update
        </Button>
      </Form>
        )}
    </FormContainer>
    </>
  );
};

export default UserEditScreen;
