import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");

  const [order, setOrder] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/order/by-transaction-id/${transactionId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [transactionId]);

  return (
    <div className="mt-24 p-3">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">
          Congrats! Payment Successful For Your Order.
        </h2>

        {/* print button */}
        <button className="btn btn-warning print:hidden" onClick={() => window.print()}>
          Print
        </button>
      </div>

      <h2 className="text-xl font-medium mt-3">Your Order Summary</h2>
      <h3>Transaction ID : {order.transactionId}</h3>

      {/* table */}
      <div className="mt-5 mb-8">
        <div className="flex gap-x-20 w-full">
          <div className="space-y-4 font-medium">
            <p>Name :</p>
            <p>E-mail :</p>
            <p>Shipping Address :</p>
            <p>Service Name :</p>
            <p>Price :</p>
            <p>Paid Ammount :</p>
            <p>Payment Currency :</p>
            <p>Payment Time :</p>
          </div>

          <div className="space-y-4">
            <p>{order.customer}</p>
            <p>{order.email}</p>
            <p className="">{order.address}</p>
            <p>{order.serviceName}</p>
            <p>{order.price}</p>
            <p>{order.price}</p>
            <p>{order.currency}</p>
            <p>{order.paidAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
