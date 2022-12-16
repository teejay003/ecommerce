import {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Rating } from '../components/Product';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper';
import ProductContext from '../context/productContext';


import 'swiper/swiper.min.css'
import Spinner from '../components/Spinner';
import CartContext from '../context/CartContext';



function ProductDetail() {
  const {addToCart } = useContext(CartContext)

  const { product, getProduct, loading } = useContext(ProductContext)
  const [quantity, setQuatity] = useState(1);
 const [enable, setEnable] = useState(false);

  const params = useParams()
  const navigate = useNavigate()
  

  
  // ====== Fetch product by ID on load ======
  useEffect(() => {
    getProduct(params.id);
    // eslint-disable-next-line
  },[])
  // ====================================
  

  // When form is submited
  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Add product to cart
    addToCart(params.id, quantity)

    // Go to cart page on submit
    navigate( `/product/cart/`);
  }
  
    if (loading) return <Spinner />
    
    
    return (
    <div className="row mt-4">
      <div className="col-md-5 mb-4">
        <div className="bg-white">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay
            speed={400}
          >
            <SwiperSlide>
              <img src={product.image} alt="" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={product.image} alt="" className="img-fluid" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="col-md-6">
        <h2 className=''>{product.name}</h2>
        <hr />
        <Rating value={ product.rating } />
        <h3>${ product.price }</h3>
          <h5 className='mt-3 mb-0'>Description</h5>
        <p className='lead'>{product.description}</p>
          <div className="d-flex align-items-start">
        <ProductQuantiy product={product} quantity={quantity} setQuatity={setQuatity} setEnable= {setEnable} />
          <button type="button" className="btn bg-pri btn-sm ml-3" disabled={enable} onClick={handleFormSubmit}>
          Add To Cart
        </button>
          </div>
      </div>
    </div>
  );
}

export default ProductDetail




export function ProductQuantiy({ product, quantity, setQuatity, setEnable }) {
  

  // ==== Validate correct value on quantity Chosen ====
    const handleQuantity = (e) => {
    let value = Number(e.target.value)

    // === if value is not a number, don't populate input ===
    if (!isNaN(value)) {
      setQuatity(value);
      setEnable(false)
  
    } 

    // === If value is > total number in stock, send alert message ===
    if (value > product.count_in_stock) {
      setQuatity(product.count_in_stock)
    }

    // === If value = 0, disable button ===
    if (value === 0) setEnable(true)
    
  }


  return (
    <div className="">
      
        <div
          className="input-group quantity mx-auto"
          style={{ width: "100px" }}
        >
          <div className="input-group-btn">
            <button
              className="btn btn-sm bg-pri btn-minus"
              onClick={() => {
                if (quantity > 1) {
                  setQuatity((prev) => prev - 1);
                  setEnable(false);
                }
              }}
            >
              <i className="fa fa-minus"></i>
            </button>
          </div>
          <input
            type="text"
            className="form-control form-control-sm  border-0 text-center"
            name="number_of_product"
            id="number_of_product"
            onChange={handleQuantity}
            value={quantity}
          />
          <div className="input-group-btn">
            <button
              className="btn btn-sm bg-pri btn-plus"
              onClick={() => {
                if (quantity < product.count_in_stock) {
                  setQuatity((prev) => prev + 1);
                  setEnable(false);
                }
              }}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
        </div>
    </div>
  );
}