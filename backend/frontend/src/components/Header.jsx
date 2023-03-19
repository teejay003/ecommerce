import { Link, useNavigate } from 'react-router-dom'
import Toggler from './Toggler';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/AuthSlice';

function Header() {
  const redirect = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="fixed-top">
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark">
          <Link className="navbar-brand font-weight-bold">
            <span className="text-pri">Max</span>shop
          </Link>

          <Toggler />

          <div className="collapse navbar-collapse transit-1" id="navigation">
            <ul className="navbar-nav ml-auto">
              {user ? (
                <li className="dropdown nav-link">
                  <div
                    className=" dropdown-toggle"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </div>
                  <div
                    className="dropdown-menu "
                    aria-labelledby="dropdownMenuButton"
                  >
                    <Link className="dropdown-item" to="/user/profile">
                      Profile
                    </Link>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        redirect("/user/login/");
                        dispatch(logout());
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/user/login">
                    <i className="fa fa-user"></i> Login
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                {user && (
                  <>
                    {user.is_admin && (
                      <div className="dropdown nav-link">
                        <div
                          className=" dropdown-toggle"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                         Admin
                        </div>
                        <div
                          className="dropdown-menu "
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link className="dropdown-item" to="/admin/users/">
                            Users
                          </Link>
                          <Link className="dropdown-item" to="/admin/products/">
                            Products
                          </Link>
                          <Link className="dropdown-item" to="/admin/orders/">
                            Orders
                          </Link>
                          
                        </div>
                      </div>
                    )}
                  </>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header