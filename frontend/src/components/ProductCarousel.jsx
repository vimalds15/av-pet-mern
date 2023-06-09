import React,{useEffect,} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import {Carousel,Image} from "react-bootstrap"
import { getTopProducts } from '../services/products/ProductTopSlice'
import Loader from "./Loader"
import Message from "./Message"

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTop = useSelector(state=>state.productTop)
  const{products,loading,error}=productTop

  useEffect(()=>{
    dispatch(getTopProducts())
  },[dispatch,products.length])

  return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>:(
    <Carousel pause="hover" className='bg-dark'>
        {products && products?.map(product=>(
            <Carousel.Item key={product._id} >
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>

                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel