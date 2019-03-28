import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, Container, Row, Col, CardBody, Jumbotron } from 'reactstrap';
import { Link } from "react-router-dom";
import "../styles/Login.scss";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Container className=".LoginBody">
        <div className="fullscreen-bg">
          <video loop muted autoPlay poster={require("../media/images/BackgroundVidStill.png")} className="fullscreen-bg__video">
            <source src={require("../media/videos/OceanBackground.mp4")} type="video/mp4" />
            <source src={require("../media/videos/OceanBackground.ogv")} type="video/ogg" />
          </video>
        </div>
        <Col className="col-md-5 col-md-12 mt4">
          <Row>
            <img src={require("../media/images/title.png")}></img>
          </Row>
          <Row>
            <Card className="LoginCard" >
              <CardBody>
                <CardTitle className="text-center">Sign-in</CardTitle>
                <form onSubmit={this.handleSubmit}>
                  <hr className="my-2" />
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="******" />
                  </FormGroup>
                  <Link to="/"><Button color="primary">Login</Button></Link>  <Link to="/register"><Button color="primary" >Sign-up</Button></Link>
                </form>
              </CardBody>
            </Card>
          </Row>
        </Col>
      </Container>
    );
  }
}


