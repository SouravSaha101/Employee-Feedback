import React from "react";
import "./Register.css";
import Header from "../Header/Header";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      role: "HR",
      password: "",
      confirmPassword: "",
    };
  }
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeRole = (e) => {
    this.setState({ role: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  onChangeConfirmPassword = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePhone = (e) => {
    this.setState({ phone: e });
  };
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  onClickSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateEmail(this.state.email)) {
      alert(`Warning!!! Email format not correct`);
      this.onClickReset();
      return;
    }
    if (this.state.confirmPassword !== this.state.password) {
      alert(`Warning!!! Passwords don't match`);
      this.onClickReset();
      return;
    }
    let data = this.state;
    const response = await fetch("/api/save-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      let res = await response.json();
      alert(`Warning!!! ${res.message}`);
      this.onClickReset();
    } else {
      let res = await response.json();
      alert(`ERROR!!! ${res.message}`);
      this.onClickReset();
    }
  };
  enableContinue = () => {
    let { email, name, password, confirmPassword } = this.state;
    if (
      email.length > 0 &&
      name.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    )
      return false;
    else {
      return true;
    }
  };
  onClickReset = () => {
    this.setState({
      name: "",
      email: "",
      phone: "",
      role: "HR",
      password: "",
      confirmPassword: "",
    });
  };
  render() {
    const onClickBack = (e) => {
      e.preventDefault();
      this.props.history.push("/");
    };
    return (
      <div id="Register">
        <Header name={"Company Registration"} />
        <section className="inner-section">
          <div className="section-wrapper">
            <div id="signup-form" className="account-form">
              <div id="signup-password">
                <h1>Enter your details</h1>
                <form id="signup" className="sign-up-container">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-field"
                    placeholder="Enter Your Name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  ></input>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-field"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  ></input>
                  <div className="role">
                    <span className="input-label">Enter Role:</span>
                    <select
                      name="role"
                      id="role"
                      className="form-field selectpicker"
                      placeholder="Enter Role"
                      value={this.state.role}
                      onChange={this.onChangeRole}
                    >
                      <option key={1}>HR</option>
                      <option key={2}>Employee</option>
                      <option key={3}>Manager</option>
                    </select>
                  </div>
                  <PhoneInput
                    className="form-field"
                    placeholder="Enter phone number"
                    value={this.state.name}
                    onChange={this.onChangePhone}
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-field"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  ></input>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-field"
                    placeholder="Conform Password"
                    value={this.state.confirmPassword}
                    onChange={this.onChangeConfirmPassword}
                  ></input>
                  <input
                    id="signup-submit"
                    type="submit"
                    className="button register-button"
                    value="Submit"
                    disabled={this.enableContinue()}
                    onClick={this.onClickSubmit}
                  ></input>
                  <div className="reset-align">
                    <a className="reset-button" onClick={this.onClickReset}>
                      Reset
                    </a>
                  </div>
                </form>
                <hr></hr>
                <button
                  id="signup-submit"
                  type="button"
                  className="button back-button"
                  value="Back"
                  onClick={onClickBack}
                >
                  <i class="fa fa-home"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(Register);
