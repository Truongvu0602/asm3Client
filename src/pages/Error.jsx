import React from "react";
import { useRouteError } from "react-router-dom";
import { Container } from "react-bootstrap";
import MainNavigation from "../components/layout/MainNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faRotateBackward } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/UI/Button";

export default function Error() {

  const error = useRouteError();

  console.log("from error")

  return (
    <Container fluid>
      <MainNavigation/>
      <h1 className="text-center">
      <span className="text-danger text-bold">
      <FontAwesomeIcon icon={faWarning}/>
      Error Code : 
      </span>
      {error.status || 'Something went wrong !'}
      </h1>
      <p className="text-center text-danger display-2 text-bold">{error.statusText || error.message || 'Something went wrong, maybe URL not exist !'}</p>
      <p className="text-center">
        <Button center isLink toLink='..' icon={faRotateBackward} text='Go Back' light/>
      </p>
    </Container>
  );
}
