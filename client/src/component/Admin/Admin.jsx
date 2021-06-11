import React from "react";
import "./Admin.css";
import Header from "../Header/Header";
import { Redirect, withRouter } from "react-router-dom";
import img from "../../assests/profile.svg";
import Employee from "../Employee/Employee";

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      employeeId: "",
      role: "",
      accessLevel: 2,
      employeeObj: {},
      employeeArr: [],
    };
  }
  onChangeSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  enableContinue = () => {
    let { subject } = this.state;
    if (subject.length > 0) return false;
    else {
      return true;
    }
  };
  componentDidMount() {
    this.getUserData();
  }
  async getUserData() {
    let token = localStorage.getItem("auth-token");
    const response = await fetch("/api/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200) {
      let res = await response.json();
      let data = res.user;
      this.setState({
        name: data.name,
        employeeId: data.employeeId,
        role: data.role,
        accessLevel: data.accessLevel,
      });
      if (this.state.accessLevel !== 2) {
        this.getEmployeRecord(token);
      }
    } else {
      let res = await response.json();
      alert(`ERROR!!! ${res.message}`);
    }
  }
  async getEmployeRecord(token) {
    const response = await fetch("/api/employee", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.status === 200) {
      let res = await response.json();
      let data = res.user;
      console.log(data);
      this.setState({
        employeeArr: data,
      });
      console.log(this.state);
    } else {
      let res = await response.json();
      alert(`ERROR!!! ${res.message}`);
    }
  }
  render() {
    const onClickBack = (e) => {
      e.preventDefault();
      localStorage.setItem("auth-token", "");
      this.props.history.push("/");
    };

    let token = localStorage.getItem("auth-token");

    if (token === "") {
      alert("Authentication Error");
      return <Redirect to="/" />;
    }
    return (
      <div id="admin">
        <Header name={"Welcome"} />
        <div className="wrapper">
          <div id="signup-form" className="account-form">
            <div id="signup-password">
              <div className="display-row">
                <img className="img-profile" src={img} alt="thankyou"></img>
                <div className="display-area">
                  <p className="label">
                    <span className="det-span"> Name:</span>
                    {this.state.name}
                  </p>
                  <p className="label">
                    <span className="det-span"> Role:</span>
                    {this.state.role}
                  </p>
                  <p className="label">
                    <span className="det-span">Employee ID:</span>
                    {this.state.employeeId}
                  </p>
                </div>
              </div>
              <hr />
              <h3 style={{ marginLeft: "11px" }}>
                Enter the ratings for the employees
              </h3>
              {this.state.employeeArr.map((data, index) => (
                <Employee
                  key={data.employeeId}
                  data={data}
                  accessLevel={this.state.accessLevel}
                />
              ))}
              <hr></hr>
              <button
                type="button"
                className="button back-button"
                value="Logout"
                onClick={onClickBack}
              >
                <i className="fa fa-sign-out"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Admin);
