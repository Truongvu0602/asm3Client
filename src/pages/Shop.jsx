import React, { useEffect, useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { Col, Container, Row } from "react-bootstrap";
import ShopNavbar from "../components/shop/ShopNavbar/ShopNavbar";
import ShopProducts from "../components/shop/ShopProducts/ShopProducts";
import axios from "axios";

export default function Shop() {
  const [category, setCategory] = useState("all");
  const [filterProds, setFilterProds] = useState([]);
  const [data, setData] = useState(null);

  const SERVER_URL = import.meta.env.VITE_SERVER;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/product/all`);
      const data = await response.data;

      if (data.products) {
        setData(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilterProds(data);
  }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     const filteredByCate = data.products.filter(
  //       (prod) => prod.category === category
  //     );
  //     setFilterProds(filteredByCate);
  //     console.log(filteredByCate);
  //   } else {
  //     // If no category is selected, reset to all products
  //     setFilterProds(data.products);
  //   }
  // }, [category, data]);

  const changeCategoryHandler = (cate) => {
    const filteredByCate = data.filter((prod) => prod.category === cate);
    cate === "all" ? setFilterProds(data) : setFilterProds(filteredByCate);
    setCategory(cate);
  };

  return (
    <div>
      <PageHeader text="SHOP" />
      <Container fluid>
        <Row>
          <Col md={3}>
            <ShopNavbar
              category={category}
              onChangeCate={changeCategoryHandler}
            />
          </Col>
          <Col md={9}>
            <ShopProducts products={filterProds} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

//

//
