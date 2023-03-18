import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {  Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProductById} from "../services/products/ProductDetailSlice";
import { setProductUpdateReset, updateProduct} from "../services/products/ProductUpdateSlice";


const ProductEditScreen = () => {
  

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate()
//   const location = useLocation()
  const dispatch = useDispatch()
  const {id:productId}=useParams()

  const productDetail = useSelector(state=>state.productDetail)
  const {loading,error,productInfo:product} = productDetail

  const productUpdate = useSelector(state=>state.productUpdate)
  const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate


//   const redirect = location.search ? location.search.split("=")[1]:"/"

  useEffect(()=>{
       if(successUpdate){
        dispatch(setProductUpdateReset())
        navigate('/admin/productlist')
       }else{
       if(!product?.name || product._id !==productId){
        dispatch(getProductById(productId))
       }else{
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
    
   }}
  },[dispatch,productId,product,navigate,successUpdate])

  const uploadFileHandler = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image',file)
    setUploading(true)
    try {
      const config = {
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }
      const {data} =await axios.post('/api/upload',formData,config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
        _id:productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
    }))
  }

  return (
    <>
        <Link to="/admin/productlist" className="btn btn-light my-3"> Go Back</Link>

    <FormContainer>
      <h1>Edit Product</h1>
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
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File id="image-file" label="Choose file" custom onChange={uploadFileHandler}></Form.File>
            {uploading && <Loader />}
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Count In Stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
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

export default ProductEditScreen;
