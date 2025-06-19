import React from 'react';

import classes from './RelatedProudctList.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import RelatedProductItem from './RelatedProductItem';

export default function RelatedProductList(props) {

  const products = props.products;
  return (
    <Container className="pt-3" fluid>
    <div className={classes.related_title}>
      Related
    </div>
      <Row>
        {products.map((product, i) => (
          <Col xs={12} sm={6} md={3} key={product._id} >
            <RelatedProductItem key={product._id+i} item={product}  />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
