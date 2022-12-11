import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const BookingHandler = (props) => {
  const [property, setProperty] = useState({});

  const location = useLocation();

  useEffect(() => {
    const property = location.state.property;
    setProperty(property);
  }, []);
  return (
    <div class="container">
  <div class="row">
    <div class="col">
        <h3>Request to Book</h3>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Good price.</h5>
                <p class="card-text">Your dates are $48 less than the avg. nightly rate over the last 3 months.</p>
            </div>
        </div>
        <h4>Your Trip</h4>
        <hr></hr>
        <div class="container">
            <div class="row">
                <div class="col-10">
                    <h4>Dates</h4>
                    <p>Apr 9-14, 2023</p>
                </div>
                <div class="col">
                    <p>Edit</p>
                </div>
                <div class="col-10">
                    <h4>Guests</h4>
                    <p>1 guest</p>
                </div>
                <div class="col">
                    <p>Edit</p>
                </div>
            </div>
        </div>
        <hr></hr>
        <h4>Travel Insurance</h4>
        <div className='form-check'>
            <div className='mb-3'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    id='hostCheckBox'
                    />
                    <label className='form-check-label' for='hostCheckBox'>
                        <strong>Make your travel safe with travel Insurance for $97.97</strong>
                        <p>Get reimbursed if you need to cancel due to illness, flight delays, and more.</p>
                    </label>
            </div>
        </div>
        <hr></hr>
        <h4>Choose how you pay</h4>
        <div class="box">
            <div class="box-half">
                <input
                    type='radio'
                    className='form-check-input'
                    id='hostCheckBox'
                    />
                    <label for="my-radio-button-1" class="box-button">
                        <strong>Pay in full</strong>
                        <p>Pay the total now of $1567.54 and you're all set.</p>
                    </label>
            </div>
            <div class="box-half">
                <input
                    type='radio'
                    className='form-check-input'
                    id='hostCheckBox'
                    />
                    <label for="my-radio-button-1" class="box-button">
                        <strong>Pay part now, part later</strong>
                        <p>Pay $313.51 now, and the rest by Mar 27, 2023.</p>
                    </label>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <div class="card-body">
                Your booking is protected by <strong>air cover</strong>
                <hr></hr>
                <h4>Price details</h4>
                <div class="container">
                    <div class="row">
                        <div class="col-10">
                            <p>$249.00 x 5 Nights</p>
                        </div>
                        <div class="col">
                            <p>$1,245.00</p>
                        </div>
                        <div class="col-10">
                            <p>Cleaning fee</p>
                        </div>
                        <div class="col">
                            <p>$60.00</p>
                        </div>
                        <div class="col-10">
                            <p>Service fee</p>
                        </div>
                        <div class="col">
                            <p>$184.24</p>
                        </div>
                        <div class="col-10">
                            <p>Taxes</p>
                        </div>
                        <div class="col">
                            <p>$78.30</p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div class="container">
                    <div class="row">
                        <div class="col-10">
                            <p>Total</p>
                        </div>
                        <div class="col">
                            <p>$1567.54</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  </div>
</div>

  )
};

export default BookingHandler;
