import "./Employee.css";

import React from "react";

function Employee(props) {
  let ar = [1, 2, 3, 4, 5];
  let lateAr = [0, -1, -2, -3, -4, -5];
  let dropdownDiable = props.accessLevel !== 1 ? true : false;
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
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Late Coming :
          <select
            name="Attendence"
            id="Attendence"
            className="dropdown-style"
            placeholder="Enter Late Coming"
            disabled={dropdownDiable}
          >
            {lateAr.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Behaviour :
          <select
            name="Attendence"
            id="Attendence"
            className="dropdown-style"
            placeholder="Enter Behaviour"
            disabled={dropdownDiable}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Behaviour :
          <select
            name="Attendence"
            id="Attendence"
            className="dropdown-style"
            placeholder="Enter Behaviour"
            disabled={dropdownDiable}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Work :
          <select
            name="Attendence"
            id="Attendence"
            className="dropdown-style"
            placeholder="Enter Work"
            disabled={dropdownDiable}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
        <div>
          Culture :
          <select
            name="Attendence"
            id="Attendence"
            className="dropdown-style"
            placeholder="Enter Culture"
            disabled={dropdownDiable}
          >
            {ar.map((data, index) => (
              <option key={index}>{data}</option>
            ))}
          </select>
        </div>
      </div>
      {props.accessLevel !== 2 && (
        <div style={{ display: "flex" }}>
          <p className="text-reason">Reason:</p>
          <textarea
            className="dropdown-style text-area"
            disabled={dropdownDiable}
          />
        </div>
      )}
    </div>
  );
}

export default Employee;
