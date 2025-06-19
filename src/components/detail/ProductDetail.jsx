import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import ProductDetailImages from "./ProductDetailImages";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailAction from "./ProductDetailAction";
import ProductDetailDesc from "./ProductDetailDesc";
import RelatedProductList from "./RelatedProductList";

export default function ProductDetail({ product, relatedProducts }) {

  

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>
          <ProductDetailImages images={product.images}/>
        </Col>
        <Col>
          <ProductDetailInfo product={product}/>
          {product.stock && product.stock > 0 ? <ProductDetailAction cartItem={product}/> : <p className="text-danger display-6">Out of stock</p>}
        </Col>
      </Row>
      <ProductDetailDesc description={product.long_desc} />
      {
        relatedProducts.length > 0 && <RelatedProductList products={relatedProducts}/>
      }

    </Container>
  );
}
