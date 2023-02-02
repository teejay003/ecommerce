import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom';

// Redux
import { removCartItems, changeQuantity } from '../slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    const { loading, cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const redirect = useNavigate()
    
    
    if (loading) return <Spinner />

  
    
    const handleQuantityChange = (e) => {
        dispatch(changeQuantity({id: +e.target.id, quantity: +e.target.value}))
     
    }


  return (
    <div className="container">
      <div className=" my-4">
        <div className="row ">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="align-middle my-2">
                      <img src={item.image} alt="" style={{ width: "50px" }} />{" "}
                      {item.name}
                    </td>
                    <td className="align-middle">${item.price}</td>
                    <td className="align-middle p-0">
                      <div
                        className="input-group quantity mx-auto mt-3"
                        style={{ width: "100px" }}
                      >
                        <div className="form-group">
                          <select
                            id={item.id}
                            value={item.quantity}
                            className="form-control"
                            onChange={handleQuantityChange}
                          >
                            {[...Array(item.count_in_stock).keys()].map(
                              (value, i) => (
                                <option key={i}> {value + 1}</option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => dispatch(removCartItems(item.id))}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4 mt-4">
            <h4 className="position-relative text-uppercase  mb-3">
              <span className=" pr-3">Cart Summary</span>
            </h4>
            <div className="bg-white p-4 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                    Items
                  </h6>
                  <h6>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )
                      .toFixed(2)}
                  </h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total</h5>
                  <h5>
                    $
                    {Number(
                      cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)
                    ) + Number(10)}
                  </h5>
                </div>
                <button
                  className="btn btn-block bg-pri font-weight-bold my-3 py-3"
                  disabled={cartItems.length === 0} onClick={()=> redirect('/checkout/shipping/') }
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart