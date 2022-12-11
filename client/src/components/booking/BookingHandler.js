import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import { setAlert } from "../../actions/alert";
import moment from 'moment';
import { connect } from "react-redux";

const BookingHandler = (props) => {
  const [property, setProperty] = useState({});

  const location = useLocation();

  useEffect(() => {
    const property = location.state.property;
    setProperty(property);
  }, []);

  const addBooking = () => {
    console.log(property);
    let booking = {
        title: property.title,
        city: property.city,
        guestName: '',
        hostName: property.host,
        checkinDate: moment('04/19/2023').format('MM/dd/YYYY'),
        checkinDate: moment('04/23/2023').format('MM/dd/YYYY'),
        bookingStatus: 'completed'
    };
    axios.post('/api/bookings',booking).then(res => props.setAlert('Booking Confirmed!', 'success'));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h3>Request to Book</h3>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Good price.</h5>
              <p className='card-text'>
                Your dates are $48 less than the avg. nightly rate over the last
                3 months.
              </p>
            </div>
          </div>
          <h4>Your Trip</h4>
          <hr></hr>
          <div className='container'>
            <div className='row'>
              <div className='col-10'>
                <h4>Dates</h4>
                <p>Apr 9-14, 2023</p>
              </div>
              <div className='col'>
                <p>Edit</p>
              </div>
              <div className='col-10'>
                <h4>Guests</h4>
                <p>1 guest</p>
              </div>
              <div className='col'>
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
                <strong>
                  Make your travel safe with travel Insurance for $97.97
                </strong>
                <p>
                  Get reimbursed if you need to cancel due to illness, flight
                  delays, and more.
                </p>
              </label>
            </div>
          </div>
          <hr></hr>
          <h4>Choose how you pay</h4>
          <div className='box'>
            <div className='box-half'>
              <input type='radio' className='form-check-input' id='fullPay' />
              <label for='fullPay' className='box-button'>
                <strong>Pay in full</strong>
                <p>Pay the total now of $1567.54 and you're all set.</p>
              </label>
            </div>
            <div className='box-half'>
              <input type='radio' className='form-check-input' id='partPay' />
              <label for='partPay' className='box-button'>
                <strong>Pay part now, part later</strong>
                <p>Pay $313.51 now, and the rest by Mar 27, 2023.</p>
              </label>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              Your booking is protected by <strong>air cover</strong>
              <hr></hr>
              <h4>Price details</h4>
              <div className='container'>
                <div className='row'>
                  <div className='col-10'>
                    <p>{property.pricePerNight} x 5 Nights</p>
                  </div>
                  <div className='col'>
                    <p>${property.pricePerNight * 5}</p>
                  </div>
                  <div className='col-10'>
                    <p>Cleaning fee</p>
                  </div>
                  <div className='col'>
                    <p>${property.cleaningFee}</p>
                  </div>
                  <div className='col-10'>
                    <p>Service fee</p>
                  </div>
                  <div className='col'>
                    <p>${property.serviceFee}</p>
                  </div>
                  <div className='col-10'>
                    <p>Taxes</p>
                  </div>
                  <div className='col'>
                    <p>$78.30</p>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className='container'>
                <div className='row'>
                  <div className='col-10'>
                    <p>Total</p>
                  </div>
                  <div className='col'>
                    <p>
                      $
                      {property.pricePerNight * 5 +
                        property.cleaningFee +
                        property.serviceFee +
                        78.3}
                    </p>
                  </div>
                </div>
                <button
                  className='btn btn-primary align-items-center'
                  onClick={addBooking}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {setAlert})(BookingHandler);
