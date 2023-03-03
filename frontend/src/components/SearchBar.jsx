import { useNavigate} from 'react-router-dom'
import { useState } from 'react';



function SearchBar() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");
  


  const hanldeFormSubmit = (e) => {
    e.preventDefault()
    if (keyword !== '') {
      navigate(`/shop/?search=${keyword}`)
    }
  }
  
  return (
    <div className="container-fluid bg-white py-3">
      <div className="row">
        <div className="col d-none d-md-flex align-items-center">
         
            <div className="dropdown">
              <h5 className="dropdown-toggle" data-target="dropdown" data-toggle="dropdown">Categories</h5>
              <ul className="dropdown-menu" id="dropdown">
                <li className="dropdown-item">Cloths</li>
                <li className="dropdown-item">Shoes</li>
                <li className="dropdown-item">Bags</li>
              </ul>
          </div>
          
        </div>
        <div className="col-sm-9 col-md-7">
          <form onSubmit={ hanldeFormSubmit }>
            <div className="input-group">
              <input
                type="search"
                name="search"
                value={keyword}
                id="search"
                className="form-control search-form"
                placeholder="Search for products"
                onChange={(e)=> setKeyword(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="input-group-text bg-transparent text-pri"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col d-flex justify-content-end my-sm-2 my-2 my-lg-0">
          <div className="d-flex align-items-center">
            <i className="fa fa-shopping-cart text-dark"></i>
            <span className="ml-1 badge text-secondary border border-secondary rounded-circle">
              0
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-center ml-2">
            <i className="fa fa-heart text-dark"></i>
            <span className="ml-1  badge text-secondary border border-secondary rounded-circle">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar