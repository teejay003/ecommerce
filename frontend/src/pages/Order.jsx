import React from "react";
import ProgessBar from "../components/ProgessBar";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { placeOrder } from "../slices/CheckOutSlice";

function Order() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const { shipping, paymentMethod } = useSelector((state) => state.checkout);
  // const redirect = useNavigate();
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
                      <i className="fab fa-mdb fa-4x ms-0"></i>
                      <p className="pt-0">MDBootstrap.com</p>
                    </div>
                  </div>

                  <div className="flex-wrap d-flex row justify-content-between">
                    <div className="col-sm-6">
                      <ul className="list-unstyled">
                        <li className="text-muted">
                          To: <span>John Lorem</span>
                        </li>
                        <li className="text-muted">Street, City</li>
                        <li className="text-muted">State, Country</li>
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

                  <div className="row my-2 mx-1 justify-content-center">
                    <table className="table table-striped table-borderless">
                      <thead className="text-white">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Pro Package</td>
                          <td>4</td>
                          <td>$200</td>
                          <td>$800</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Web hosting</td>
                          <td>1</td>
                          <td>$10</td>
                          <td>$10</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Consulting</td>
                          <td>1 year</td>
                          <td>$300</td>
                          <td>$300</td>
                        </tr>
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
                          <span className="text-black me-4">SubTotal</span>$1110
                        </li>
                        <li className="text-muted ms-3 mt-2">
                          <span className="text-black me-4">Tax(15%)</span>$111
                        </li>
                      </ul>
                      <p className="text-black float-start">
                        <span className="text-black me-3"> Total Amount</span>
                        <span>$1221</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <p>Thank you for your purchase</p>
                    </div>
                    <div className="col-sm-6 justify-content-end d-flex">
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize "
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
