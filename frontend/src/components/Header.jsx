import React from 'react'
import { Link } from 'react-router-dom'
import Toggler from './Toggler';

function Header() {


  return (
    <header className="fixed-top">
      <div className="container">
        <nav className='navbar navbar-expand-lg navbar-dark'>
          <Link className="navbar-brand"><span className="text-pri">Pro</span>shop</Link>

          <Toggler />

          <div className="collapse navbar-collapse transit-1" id='navigation'>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header