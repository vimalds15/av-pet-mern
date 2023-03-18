import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../services/products/ProductSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomeScreen = () => {
  let {keyword,pageNumber} = useParams()
  pageNumber=pageNumber ||1
  const productList = useSelector((state) => state.product);
  const { loading, allProducts,error,page,pages } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(keyword,pageNumber));
  }, [dispatch,keyword,pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ):error?
        <Message variant={"danger"}>{error}</Message>
       : (
        <>
        <Row>
          {allProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword:""} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
