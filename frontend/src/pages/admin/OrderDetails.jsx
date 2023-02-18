import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { fetchOrder } from '../../slices/AdminSlice';


function OrderDetails() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const { order, loading } = useSelector((state) => state.admin);
  const params = useParams()

  useEffect(() => {
    dispatch(fetchOrder({id: params.id, token: user.access }))
    
  },[dispatch, params, user])

  const {order_items, shipping, payment_method, total_price} = order
  const tax = (total_price * 15) / 100;
 


 

  return (
    <>
      {user.is_admin && (
        <div className="container mb-4">
          { loading ? (
            <Spinner />
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="container mb-5 mt-3">
                  <div className="row d-flex align-items-baseline">
                    <div className="col-xl-9">
                      <p>
                          Invoice <strong>ID: #{ order.id}</strong>
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
                            <span className="fw-bold">ID:</span>#{order.id}
                          </li>
                          <li className="text-muted">
                            <i className="fas fa-circle"></i>{" "}
                            <span className="fw-bold">Creation Date: </span>{order.created_date}
                          </li>
                          <li className="text-muted">
                            <i className="fas fa-circle"></i>{" "}
                            <span className="me-1 fw-bold">Status:</span>
                             <span className={`badge ${order.is_paid ? 'badge-success' : 'badge-warning'} text-black fw-bold`}> 
                                 {order.is_paid ? " Paid" : " Unpaid"}
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
                          {order_items.map((item, i) => (
                            <tr key={i}>
                              <th scope="row">{i + 1}</th>
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
                            <span className="text-black me-4">SubTotal</span> $
                            {total_price}
                          </li>
                          <li className="text-muted ms-3 mt-2">
                            <span className="text-black me-4">Tax(15%)</span> $
                            {tax.toFixed(2)}
                          </li>
                        </ul>
                        <p className="text-black float-start">
                          <span className="text-black me-3"> Total Amount</span>
                          <span> ${  (Number(total_price) +  tax).toFixed(2) }</span>
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-6">
                        <h6 className="d-inline">PAYMENT METHOD:</h6>{" "}
                        <span>{payment_method}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default OrderDetails