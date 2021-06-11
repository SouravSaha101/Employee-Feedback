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
      } else {
        this.setRating(data);
      }
    } else {
      let res = await response.json();
      alert(`ERROR!!! ${res.message}`);
    }
  }
  async setRating(data) {
    this.setState({
      employeeObj: {
        Attendence: data.Attendence ? data.Attendence : null,
        LateComing: data.LateComing ? data.LateComing : null,
        Reason: data.Reason ? data.Reason : null,
        Behaviour: data.Behaviour ? data.Behaviour : null,
        Work: data.Work ? data.Work : null,
        Culture: data.Culture ? data.Culture : null,
      },
    });
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
  stars(count) {
    let ar = [];
    count = count ? Math.abs(+count) : 0;
    for (let i = 0; i < count; i++) {
      ar.push(i);
    }
    return ar;
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
                <button
                  type="button"
                  className="button back-button logout"
                  value="Logout"
                  onClick={onClickBack}
                >
                  <i className="fa fa-sign-out"></i>
                </button>
              </div>
              <hr />
              {this.state.accessLevel === 3 ? (
                <h3 style={{ marginLeft: "11px" }}>
                  View the rating of all employees
                </h3>
              ) : this.state.accessLevel === 2 ? (
                <h3 style={{ marginLeft: "11px" }}>View your rating</h3>
              ) : (
                <h3 style={{ marginLeft: "11px" }}>
                  Enter the rating of all employees.
                </h3>
              )}

              {this.state.employeeArr.map((data, index) => (
                <Employee
                  key={data.employeeId}
                  data={data}
                  accessLevel={this.state.accessLevel}
                  hrName={this.state.name}
                  hrEmpID={this.state.employeeId}
                />
              ))}
              {this.state.accessLevel === 2 ? (
                <div>
                  <hr />
                  <br />
                  <div className="rating-box">
                    <h4 className="text-rating">Attendence :</h4>
                    {this.state.employeeObj.Attendence
                      ? this.stars(this.state.employeeObj.Attendence).map(
                          (e, i) => (
                            <i key={i} className="fa fa-star star-style"></i>
                          )
                        )
                      : "~Not Given~"}
                  </div>
                  <div className="rating-box">
                    <h4 className="text-rating">Late Coming :</h4>
                    {this.state.employeeObj.LateComing
                      ? this.stars(this.state.employeeObj.LateComing).map(
                          (e, i) => (
                            <i
                              key={i}
                              className="fa fa-star star-style color-star"
                            ></i>
                          )
                        )
                      : "~Not Given~"}
                  </div>
                  <div className="rating-box">
                    <h4 className="text-rating">Behaviour :</h4>
                    {this.state.employeeObj.Behaviour
                      ? this.stars(this.state.employeeObj.Behaviour).map(
                          (e, i) => (
                            <i key={i} className="fa fa-star star-style"></i>
                          )
                        )
                      : "~Not Given~"}
                  </div>
                  <div className="rating-box">
                    <h4 className="text-rating">Work :</h4>
                    {this.state.employeeObj.Work
                      ? this.stars(this.state.employeeObj.Work).map((e, i) => (
                          <i key={i} className="fa fa-star star-style"></i>
                        ))
                      : "~Not Given~"}
                  </div>
                  <div className="rating-box">
                    <h4 className="text-rating">Culture :</h4>
                    {this.state.employeeObj.Culture
                      ? this.stars(this.state.employeeObj.Culture).map(
                          (e, i) => (
                            <i key={i} className="fa fa-star star-style"></i>
                          )
                        )
                      : "~Not Given~"}
                  </div>
                </div>
              ) : null}
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Admin);
