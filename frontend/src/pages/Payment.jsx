import React from 'react'
import ProgessBar from '../components/ProgessBar'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { addPaymentMethod } from '../slices/CheckOutSlice';

function Payment() {
  const dispatch = useDispatch()
  
  const { isLoggedIn } = useSelector((state) => state.auth);
  const redirect = useNavigate();
  const [active, setActive] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('')

  const handlePayment = (e) => {
    setActive(false)
    setPaymentMethod(e.target.id)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(addPaymentMethod(paymentMethod))

    redirect('/checkout/order/')
  }



  return (
    <>
      {
        isLoggedIn &&
          <div className='container col-sm-7'>
            <ProgessBar page={'payment'} />
             <div className="mb-5">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="pr-3">Payment</span></h5>
                    <div className="bg-light p-30">
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="Paypal" onChange={handlePayment}/>
                                <label className="custom-control-label" htmlFor="Paypal">Paypal</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="Directcheck" onChange={handlePayment}/>
                                <label className="custom-control-label" htmlFor="Directcheck">Direct Check</label>
                            </div>
                        </div>
                        <div className="form-group mb-4">
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" name="payment" id="Banktransfer" onChange={handlePayment}/>
                                <label className="custom-control-label" htmlFor="Banktransfer">Bank Transfer</label>
                            </div>
                        </div>
                        
                        <div className="d-flex">
                          <button className="btn btn-dark font-weight-bold py-3" onClick={() => redirect('/checkout/shipping/')}>BACK</button>
                  <button className="btn btn-warning font-weight-bold ml-3 py-3" disabled={active} onClick={ handleFormSubmit }>PROCEED</button>
                        </div>
                  
                    </div>
                </div>
          </div>
      }
    </>
  )
}

export default Payment
