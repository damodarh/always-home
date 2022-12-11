import React from "react";
import { useHistory } from "react-router";
import "./PropertyDetail.scss";

const PropertyDetail = (props) => {
  const property = { ...props.property };

  const _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  return (
    <div className='property-detail'>
      <div>
        <section className='mb-3'>
          <h2 className='property-title'>{property.title}</h2>
          <div>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-star-fill'
                viewBox='0 0 16 16'
              >
                <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
              </svg>
              <span className='ms-1'>{property.rating.toFixed(2)}</span>
              <span className='dot'>.</span>
              <span>{/* <u>{property.reviews} reviews</u> */}</span>
            </span>
            <span className='dot'>.</span>
            <span>
              <u>
                {property.city}, {property.state}, {property.country}
              </u>
            </span>
          </div>
        </section>
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <img
            src={`${
              property.images[0]
                ? "data:${property.images[0].contentType};base64," +
                  btoa(
                    String.fromCharCode(
                      ...new Uint8Array(property.images[0].data.data)
                    )
                  )
                : "img/no_img.jpg"
            }`}
            className='rounded title-image'
            alt='main'
          />
        </div>
        <div className='col-lg-6 ps-0'>
          <div className='row h-100'>
            {property.images.length !== 0 ? (
              property.images.slice(1).map((image, id) => {
                return (
                  <div className='col-md-6' key={id}>
                    <img
                      src={`data:${image.contentType};base64,
              ${_arrayBufferToBase64(image.data.data)}`}
                      className='rounded sub-image'
                      alt='other'
                    />
                  </div>
                );
              })
            ) : (
              <div className={`carousel-item ${"active"}`}>
                <div className='card-image'>
                  <img
                    src={"img/no_img.jpg"}
                    className='card-img-top'
                    data-bs-toggle='modal'
                    data-bs-property={property}
                    data-bs-target='#detailModal'
                    alt={"no-image"}
                    onClick={() => props.toggleModal(props.id)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <div className='prop-detail'>
              <div className='prop-detail-section'>
                <section>
                  <div>
                    <h2 className='property-headings'>
                      {property.title} hosted by {property.host}
                    </h2>
                  </div>
                  <ul className='list-group list-group-horizontal'>
                    <li className='list-group-item border-0 ps-0'>{`${
                      property.bedroom
                    } bedroom${property.bedroom > 1 ? "s" : ""}`}</li>
                    <li className='list-group-item border-0 ps-0'>{`${
                      property.beds
                    } bed${property.beds > 1 ? "s" : ""}`}</li>
                    <li className='list-group-item border-0 ps-0'>{`${
                      property.bath
                    } bath${property.bath > 1 ? "s" : ""}`}</li>
                  </ul>
                </section>
              </div>
              <div className='prop-detail-section'>
                <div>
                  <h2 className='property-headings mb-3'>Amenities</h2>
                  <ul className='card-columns'>
                    {property.amenities.map((amenity, index) => (
                      <li className='amenity' key={index}>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div className='prop-payment'>
              <div className='payment-box'>
                <div className='price-review'>
                  <span>
                    <strong className='fs-4'>${property.pricePerNight}</strong>{" "}
                    <span className='fs-5'>night</span>
                  </span>
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    <span className='ms-1'>{property.rating.toFixed(2)}</span>
                    <span className='dot'>.</span>
                    <span className='text-muted'>
                      {/* <u>{property.reviews} reviews</u> */}
                    </span>
                  </span>
                </div>
                <div>
                  <div className='charge-label'>
                    <span className='text-muted'>
                      <u>${property.pricePerNight} X 5 nights</u>
                    </span>
                    <span>${property.pricePerNight * 5}</span>
                  </div>
                  {property.discount && (
                    <div className='charge-label'>
                      <span className='text-muted'>
                        <u>Discount</u>
                      </span>
                      <span>${property.discount}</span>
                    </div>
                  )}
                  <div className='charge-label'>
                    <span className='text-muted'>
                      <u>Cleaning Fee</u>
                    </span>
                    <span>${property.cleaningFee}</span>
                  </div>
                  <div className='charge-label'>
                    <span className='text-muted'>
                      <u>Service Fee</u>
                    </span>
                    <span>${property.serviceFee}</span>
                  </div>
                </div>
                <div className='total'>
                  <div className='charge-label'>
                    <span className='fs-5'>Total before taxes</span>
                    <span className='fs-5'>
                      $
                      {property.pricePerNight * 5 +
                        property.cleaningFee +
                        property.serviceFee}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
