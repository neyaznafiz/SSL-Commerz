import React from "react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="text-center text-xl my-20">
      <p>Opps! Payment failed.</p>

      <p className="text-red-700">Something wents wrong!!!</p>

      <div>
        <button className="btn btn-success my-5 tracking-wider px-20">
          <Link to="/">Go to Home</Link>
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;
