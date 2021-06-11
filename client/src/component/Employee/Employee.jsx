import "./Employee.css";
import React, { useState } from "react";

function Employee(props) {
  const [data, setData] = useState({});
  let ar = ["", 1, 2, 3, 4, 5];
  let lateAr = ["", 0, -1, -2, -3, -4, -5];
  let dropdownDiable = props.accessLevel !== 1 ? true : false;
  const onClickContinue = () => {
    let detailsEmp = {
      employeeId: props.data.employeeId,
      name: props.data.name,
      HRname: props.hrName,
      HREmpId: props.hrEmpID,
      Attendence: data.Attendence
        ? data.Attendence
        : props.data.Attendence
        ? props.data.Attendence
        : null,
      LateComing: data.LateComing
        ? data.LateComing
        : props.data.LateComing
        ? props.data.LateComing
        : null,
      Reason: data.Reason
        ? data.Reason
        : props.data.Reason
        ? props.data.Reason
        : null,
      Behaviour: data.Behaviour
        ? data.Behaviour
        : props.data.Behaviour
        ? props.data.Behaviour
        : null,
      Work: data.Work ? data.Work : props.data.Work ? props.data.Work : null,
      Culture: data.Culture
        ? data.Culture
        : props.data.Culture
        ? props.data.Culture
        : null,
    };
    let obj = { ...data, ...detailsEmp };
    console.log(obj);
    setRating(obj);
  };

  const setRating = async (data) => {
    data = JSON.stringify(data);
    let token = localStorage.getItem("auth-token");
    const response = await fetch("/api/set-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: data,
    });
    if (response.status === 200) {
      let res = await response.json();
      console.log(res);
      alert(`HURRAH!!! ${res.message}`);
    } else {
      let res = await response.json();
      alert(`ERROR!!! ${res.message}`);
    }
  };
  const onDropdownChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  return (
    <div className="card-employeee">
      <div className="card-div">
        <h5 className="card-name">Name: </h5>
        <h5>{props.data.name}</h5>
      </div>
      <div className="card-div">
        <p className="card-emp">Employee ID:</p> <p>{props.data.employeeId}</p>
      </div>
      <div className="category-box">
        <div>
          Attendence :
          <select
            name="Attendence"
            id="Attendence"
            className="dropdown-style"
            placeholder="Enter Attendence"
            disabled={dropdownDiable}
            onChange={onDropdownChange}
            value={data.Attendence ? data.Attendence : props.data.Attendence}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Late Coming :
          <select
            name="LateComing"
            id="LateComing"
            className="dropdown-style"
            placeholder="Enter Late Coming"
            disabled={dropdownDiable}
            onChange={onDropdownChange}
            value={data.LateComing ? data.LateComing : props.data.LateComing}
          >
            {lateAr.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Behaviour :
          <select
            name="Behaviour"
            id="Behaviour"
            className="dropdown-style"
            placeholder="Enter Behaviour"
            disabled={dropdownDiable}
            onChange={onDropdownChange}
            value={data.Behaviour ? data.Behaviour : props.data.Behaviour}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Work :
          <select
            name="Work"
            id="Work"
            className="dropdown-style"
            placeholder="Enter Work"
            disabled={dropdownDiable}
            onChange={onDropdownChange}
            value={data.Work ? data.Work : props.data.Work}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Culture :
          <select
            name="Culture"
            id="Culture"
            className="dropdown-style"
            placeholder="Enter Culture"
            disabled={dropdownDiable}
            onChange={onDropdownChange}
            value={data.Culture ? data.Culture : props.data.Culture}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
      </div>
      {props.accessLevel === 3 && (
        <div style={{ display: "flex" }}>
          <p className="text-reason">Reason:</p>
          <textarea
            className="dropdown-style text-area"
            disabled={true}
            value={data.Reason}
          />
        </div>
      )}
      {props.accessLevel === 1 && (
        <div style={{ display: "flex" }}>
          <p className="text-reason">Reason:</p>
          <textarea
            id="Reason"
            className="dropdown-style text-area"
            disabled={false}
            onChange={onDropdownChange}
            value={
              data.Reason
                ? data.Reason
                : props.data.Reason
                ? props.data.Reason
                : ""
            }
          />
          <input
            id="signup-submit"
            type="submit"
            className="button save-button"
            value="Save"
            onClick={onClickContinue}
          ></input>
        </div>
      )}
    </div>
  );
}

export default Employee;
