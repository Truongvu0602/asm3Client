import React from 'react'
import { Container } from 'react-bootstrap';

import  classes from './PageHeader.module.css' ;

export default function PageHeader(props) {
  const {text} = props;
  return (
    <Container fluid>
      <div className={classes.pageHeader_wrapper}>
        <h1>
          {text}
        </h1>
        <p>
          {text}
        </p>

      </div>
    </Container>
  )
}
