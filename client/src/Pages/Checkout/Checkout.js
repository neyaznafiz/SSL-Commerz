import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { _id, title, price, img } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const address = form.address.value;
    const postcode = form.postcode.value;
    const currency = form.currency.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      address,
      postcode,
      currency
    };

    // if(phone.length > 10){
    //     alert('Phone number should be 10 characters or longer')
    // }
    // else{

    // }

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("genius-token")}`,
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
          form.reset();
        }
      })
      .catch((er) => console.error(er));
  };

  return (
    <div className="mb-10 mt-16">
      <form
        onSubmit={handlePlaceOrder}
        className="flex justify-between items-center gap-x-10"
      >
        <div>
          <h2 className="text-2xl">You are about to order: {title}</h2>
          <h4 className="text-xl">Price: {price}</h4>
          <img src={img} alt="" className="h-80" />
        </div>

        <div className="w-7/12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="input input-ghost w-full  input-bordered"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="input input-ghost w-full  input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Your Phone"
              className="input input-ghost w-full  input-bordered"
              required
            />
            <input
              name="email"
              type="text"
              placeholder="Your email"
              defaultValue={user?.email}
              className="input input-ghost w-full  input-bordered"
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <select
              name="currency"
              defaultValue="BDT"
              className="select select-bordered w-full mt-3 outline-none"
            >
              <option value="BDT" className="my-2 text-lg">
                BDT
              </option>
              <option value="USD" className="my-2 text-lg">
                USD
              </option>
            </select>

            <input
              name="postcode"
              type="text"
              placeholder="Your Postcode"
              className="input input-ghost w-full  input-bordered mt-3"
              readOnly
            />
          </div>

          <textarea
            name="address"
            className="textarea textarea-bordered h-16 w-full my-3"
            placeholder="Address"
            required
          ></textarea>

          <input className="btn" type="submit" value="Place Your Order" />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
