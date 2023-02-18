import React from "react";
import ProgessBar from "../components/ProgessBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../slices/CheckOutSlice";

function Order() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const { shipping, paymentMethod } = useSelector((state) => state.checkout);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);
  const totalPrice = cartItems[0].totalPrice;

  const handleFormSubmit = (e) => {
    dispatch(
      placeOrder({
        order: { checkout, totalPrice, cartItems },
        token: user.access,
      })
    );
  };

  return (
    <>
      {isLoggedIn && (
        <div className="container mb-4">
          <ProgessBar page={"order"} />
          <div className="card">
            <div className="card-body">
              <div className="container mb-5 mt-3">
                <div className="row d-flex align-items-baseline">
                  <div className="col-xl-9">
                    <p>
                      Invoice <strong>ID: #123-123</strong>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="container">
                  <div className="col-md-12">
                    <div className="text-center">
                      <h4 className="text-muted font-weight-bold my-5">
                        ORDER SUMMARY
                      </h4>
                    </div>
                  </div>

                  <div className="flex-wrap d-flex row justify-content-between">
                    <div className="col-sm-6">
                      <ul className="list-unstyled">
                        <li className="text-muted">
                          To: <span>{user.username.toUpperCase()}</span>
                        </li>
                        <li className="text-muted">
                          {shipping.address}, {shipping.city}
                        </li>
                        <li className="text-muted">
                          {shipping.postalCode}, {shipping.country}
                        </li>
                        <li className="text-muted">
                          <i className="fas fa-phone"></i> 123-456-789
                        </li>
                      </ul>
                    </div>
                    <div className="col-sm-6">
                      <p className="text-muted">Invoice</p>
                      <ul className="list-unstyled">
                        <li className="text-muted">
                          <i className="fas fa-circle"></i>{" "}
                          <span className="fw-bold">ID:</span>#123-456
                        </li>
                        <li className="text-muted">
                          <i className="fas fa-circle"></i>{" "}
                          <span className="fw-bold">Creation Date: </span>Jun
                          23,2021
                        </li>
                        <li className="text-muted">
                          <i className="fas fa-circle"></i>{" "}
                          <span className="me-1 fw-bold">Status:</span>
                          <span className="badge bg-warning text-black fw-bold">
                            Unpaid
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row my-2 mx-1 justify-content-center ">
                    <table className="table table-striped table-borderless">
                      <thead className="text-white bg-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, i) => (
                          <tr key={i}>
                            <th scope="row">{i+1}</th>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.price * item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-xl-8">
                      <p className="ms-3">
                        Add additional notes and payment information
                      </p>
                    </div>
                    <div className="col-xl-3">
                      <ul className="list-unstyled">
                        <li className="text-muted ms-3">
                          <span className="text-black me-4">SubTotal</span> ${totalPrice}
                        </li>
                        <li className="text-muted ms-3 mt-2">
                          <span className="text-black me-4">Tax(15%)</span>{" "}
                          ${(totalPrice * 15) / 100}
                        </li>
                      </ul>
                      <p className="text-black float-start">
                        <span className="text-black me-3"> Total Amount</span>
                        <span> ${totalPrice  + ((totalPrice * 15) / 100)}</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <h6 className="d-inline">PAYMENT METHOD:</h6> <span>{ paymentMethod }</span>
                      <p>Thank you for your purchase</p>
                    </div>
                    <div className="col-sm-6 justify-content-end al d-flex">
                      <button className="btn btn-dark" onClick={()=> redirect(-1)}>Back</button>
                      <button
                        type="button"
                        className="btn btn-warning ml-3"
                        onClick={handleFormSubmit}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;
