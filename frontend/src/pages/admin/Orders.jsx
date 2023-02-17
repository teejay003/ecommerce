import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { useNavigate, Link } from "react-router-dom";
import { fetchOrders } from "../../slices/AdminSlice";


function Orders() {
  const { user } = useSelector((state) => state.auth);
  const { orders, loading } = useSelector((state) => state.admin);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (!user.is_admin) {
      redirect("/");
    } else {
      dispatch(fetchOrders(user.access));
    }
  }, [dispatch, user, redirect]);


  return (
    <div className="container">
      {user.is_admin && (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div className="responsive-table">
                <table className="table table-hover table-bordered">
                  <caption>List of users</caption>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">USER</th>
                      <th scope="col"> DATE </th>
                      <th scope="col">TOTAL</th>
                      <th scope="col">PAID</th>
                      <th scope="col">DELIVERED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <tr key={order.id}>
                        <th scope="row">{i + 1}</th>
                        <td>{order.user.username}</td>
                        <td>{order.created_date}</td>
                        <td>${order.total_price}</td>
                        <td>
                          {order.is_paid ? (
                            <i className="fa fa-check  text-success"></i>
                          ) : (
                            <i className="fa fa-check  text-danger"></i>
                          )}
                        </td>
                        <td>
                          {order.is_delivered ? (
                            <i className="fa fa-check  text-success"></i>
                          ) : (
                            <i className="fa fa-check  text-danger"></i>
                          )}
                        </td>

                        <td><Link><button className="btn btn-light">Details</button></Link></td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
