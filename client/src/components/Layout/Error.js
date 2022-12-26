import React from "react";
import { Link } from "react-router-dom";

const Error = (props) => {
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>{props.status}</h1>
        <p className='fs-3'>
          {" "}
          {props.showOops && <span className='text-danger'>Oops!</span>} {props.statusMessage}
        </p>
        <p className='lead'>{props.message}</p>
        {props.showHome && (
          <Link to='/properties' className='btn btn-primary'>
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default Error;
