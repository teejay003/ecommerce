import { Link } from 'react-router-dom'

function Product({ product }) {

  return (
    <div className="product-item bg-white mb-4">
      <div className="product-img position-relative overflow-hidden">
        <img src={product.image} className="img-fluid" style={{objectFit:"cover"}} alt="" />
        <div className="product-action">
          <button className="btn-square">
            <i className="fa fa-shopping-cart"></i>
          </button>
          <button className="btn-square">
            <i className="far fa-heart"></i>
          </button>
          <button className='p-0 border-0 bg-transparent'>
            <Link to={`/product/${product.id}`} className="fa fa-info btn-square text-center d-flex align-items-center justify-content-center" style={{ verticalAlign: 'middle' }}> 
            </Link>
          </button>
          
        </div>
      </div>
      <div className="text-center py-4">
        <Link
          className="h6 text-dark transit-1 d-block text-decoration-none"
          to={`/product/${product.id}`}
        >
          {product.name.length > 21 ? `${product.name.substring(0,20)}...`: product.name}
        </Link>
        <div className="d-flex align-items-center justify-content-center mt-2">
          <h5>${ product.price }</h5>
        </div>
        <div className="d-flex align-items-center justify-content-center mb-1">
          <Rating value={product.rating} />
        </div>
      </div>
    </div>
  );
}

export default Product


// 
export function Rating({value}) {
  return (
    <div>
      <span>
        <i style={{color: "#f8e825"}} className={
          value > 1 
            ? 'fas fa-star'
            : value > 0.5 
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
       }></i>
      </span>
      <span>
        <i style={{color: "#f8e825"}} className={
          value > 2 
            ? 'fas fa-star'
            : value > 1.5 
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
       }></i>
      </span>
      <span>
        <i style={{color: "#f8e825"}} className={
          value > 3 
            ? 'fas fa-star'
            : value > 2.5 
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
       }></i>
      </span>
      <span>
        <i style={{color: "#f8e825"}} className={
          value > 4 
            ? 'fas fa-star'
            : value > 3.5 
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
       }></i>
      </span>
      <span>
        <i style={{color: "#f8e825"}} className={
          value > 5 
            ? 'fas fa-star'
            : value > 4.5 
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
       }></i>
      </span>
    </div>
  )
}