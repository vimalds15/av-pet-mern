import React, { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProductById } from "../services/products/ProductDetailSlice";

const ProductScreen = () => {
  const [qty,setQty] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  const productDetail = useSelector((state) => state.productDetail);
  const { productInfo, loading, error } = productDetail;

  useEffect(() => {
    dispatch(getProductById(id));
    console.log("productInfo",productInfo)
    // eslint-disable-next-line
  }, [id,dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={productInfo.image} alt={productInfo.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{productInfo.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={productInfo.rating}
                  text={`${productInfo.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${productInfo.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${productInfo.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${productInfo.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {productInfo.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {productInfo.countInStock>0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                                <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                    {[...Array(productInfo.countInStock).keys()].map(x =>(
                                        <option key={x+1}>
                                            {x+1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={productInfo.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
