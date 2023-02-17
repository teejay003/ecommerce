import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgessBar from '../components/ProgessBar'
import { addShipping } from '../slices/CheckOutSlice'
import { useSelector, useDispatch } from 'react-redux'

function Shipping() {
  const { isLoggedIn } = useSelector(state => state.auth)
  const redirect = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoggedIn) redirect("/user/login");
    // eslint-disable-next-line
  },[])

  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })
  
  const {address, city, country, postalCode } = shipping;

  const handleShippingField = (e) => {
    setShipping(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))

  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(addShipping(shipping))
    redirect('/checkout/payment/')
  }

  return (
    <>
      {
        isLoggedIn &&
    
        <div className='container mt-5 col-sm-7'>
          <h3 className='mb-3'>SHIPPING</h3>
          <ProgessBar page ={'shipping'} />

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" className="form-control search-form" placeholder='Enter your address' value={address} onChange={handleShippingField} required/>
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" className="form-control search-form" placeholder='Enter your city' value={city} onChange={handleShippingField}  required/>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id='country' className="form-control search-form" placeholder='Enter your country' value={country} onChange={handleShippingField}  required/>
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" id="postalCode" className="form-control search-form" placeholder='Enter Postal Code' value={postalCode} onChange={handleShippingField} required />
            </div>
            <button type="submit" className='btn btn-dark'>Proceed</button>
          </form>
        </div>
      }
      </>
  )
}

export default Shipping