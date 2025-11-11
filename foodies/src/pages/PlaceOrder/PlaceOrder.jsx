import React, { useContext } from 'react';
import './PlaceOrder.css';
import {assets} from '../../assets/assets';
import {StoreContext} from '../../context/StoreContext'
import { calculateCartTotals } from '../../util/cartUtils';
const PlaceOrder = () => {
   
  const {foodList, quantities, setQuantities} = useContext(StoreContext);

    //cart items
     const cartItems = foodList.filter(food => quantities[food.id] > 0);
   //calculation
    
    const {subtotal, shipping, tax, total} = calculateCartTotals(cartItems,quantities);

  return (
    <div className='container mt-2'>
      <div className="py-5 text-center">
        <img className="d-block mx-auto" src={assets.deliveryman} alt="" width="72" height="72"/> 
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge rounded-pill bg-primary">{cartItems.length}</span>
          </h4>
          <ul className="list-group mb-3">
           {cartItems.map(item => (
             <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-muted">Qty: {quantities[item.id]}</small>
              </div>
              <span className="text-muted">&#8377;{item.price * quantities[item.id]}</span>
            </li>
           ))}
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <span className="text-muted">Shipping </span>
              </div>
              <span className="text-muted">&#8377; {subtotal === 0 ? 0.0 : shipping.toFixed(2)} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <span className="text-muted">Tax (10%)</span>
              </div>
              <span className="text-muted">&#8377; {tax.toFixed(2)} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377;{total.toFixed(2)}</strong>
            </li>
          </ul>

        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" novalidate="">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="satoru" value="" required=""/>
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="gojo" value="" required=""/>
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

             <div className="mb-3">
              <label htmlFor="email">Email <span className="text-muted"></span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="Phone">Phone number <span className="text-muted"></span></label>
              <input type="number" className="form-control" id="Phone" placeholder="1234567890" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required=""/>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100" id="country" required="">
                  <option value="">Choose...</option>
                  <option>India</option>
                </select>

              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100" id="state" required="">
                  <option value="">Choose...</option>
                  <option>Tamilnadu</option>
                </select>

              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="number" className="form-control" id="zip" placeholder="" required=""/>

              </div>
            </div>
            <hr className="mb-4"/>

            <button className="btn btn-primary btn-lg btn-block w-100 mb-4" type="submit" disabled={cartItems.length === 0}>Continue to checkout</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder;