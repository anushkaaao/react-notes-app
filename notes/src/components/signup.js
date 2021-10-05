import React from "react";
import { Form, Input } from "antd";
import axios from "axios";
import Button from "@material-ui/core/Button";
import NavBar from "./navBar";
import { Link } from 'react-router-dom';
import Icon from "@material-ui/core/Icon";
//import { Link } from "@material-ui/core";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedIn: window.sessionStorage.getItem("isLoggedIn") === "true",
      name: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };

    axios.post("https://login-info.azurewebsites.net/signup", user).then((response) => {
      console.log(response);
      this.props.history.push("/login");
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <NavBar/>

        <div className="row">
          <div className="col s4">
            <form onSubmit={this.handleSubmit}>
              <Form.Item
                className="input-field col s12"
                style={{
                  left: "100%",
                  marginTop: "20%",
                }}
              >
                <i className="material-icons prefix">person</i>
                <Input
                  name="name"
                  type="text"
                  id="mail"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
                <label>Enter name</label>
              </Form.Item>

              <Form.Item
                className="input-field col s12"
                style={{
                  left: "100%",
                }}
              >
                <i className="material-icons prefix">email</i>
                <Input
                  name="email"
                  type="email"
                  id="mail"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <label>Enter email</label>
              </Form.Item>

              <Form.Item
                className="input-field col s12"
                style={{
                  left: "100%",
                }}
              >
                <i className="material-icons prefix">vpn_key</i>
                <Input
                  name="password"
                  type="password"
                  id="pw"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <label>Enter password</label>
              </Form.Item>

              <div />
              <Form.Item className="button">
                <Button
                  style={{
                    left: "110%",
                    marginTop: "30px",
                    marginLeft: "10px",
                  }}
                  variant="contained"
                  color="primary"
                  type="Submit"
                  onSubmit={this.handleSubmit}
                  endIcon={<Icon>send</Icon>}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </form>
          </div>
        </div>
        <br />
        <div style={{ marginLeft: "36%" }}>
          Already registered?
          <Link to="/login"> Login</Link>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
