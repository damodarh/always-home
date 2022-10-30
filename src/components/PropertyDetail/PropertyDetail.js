import React from 'react';
import './PropertyDetail.scss';

const PropertyDetail = (props) => {

    const property = { ...props.property };

    return (
        <div className='property-detail'>
            <div>
                <section className='mb-3'>
                    <h2 className='property-title'>{property.title}</h2>
                    <div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <span className='ms-1'>{property.rating.toFixed(2)}</span>
                            <span className='dot'>.</span>
                            <span><u>{property.reviews} reviews</u></span>
                        </span>
                        <span className='dot'>.</span>
                        <span><u>{property.city}, {property.state}, {property.country}</u></span>
                    </div>
                </section>
            </div>
            <div className="row">
                <div className="col-lg-6" >
                    <img src={`img/${property.images[0]}`} className='rounded title-image' alt='main' />
                </div>
                <div className="col-lg-6 ps-0">
                    <div className="row h-100">
                        {property.images.map((image, id) => {
                            return <div className="col-md-6"  key={id}>
                                <img src={`img/${image}`} className='rounded sub-image' alt='other' />
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className='prop-detail-section'>
                <section>
                    <div>
                        <h2 className='property-headings'>
                            Entire home hosted by XYZ
                        </h2>
                    </div>
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item border-0 ps-0">{`${property.bedroom} bedroom${property.bedroom > 1 ? 's' : ''}`}</li>
                        <li className="list-group-item border-0 ps-0">{`${property.beds} bed${property.beds > 1 ? 's' : ''}`}</li>
                        <li className="list-group-item border-0 ps-0">{`${property.bath} bath${property.bath > 1 ? 's' : ''}`}</li>
                    </ul>
                </section>
            </div>
            <div className='prop-detail-section'>
                <div>
                    <h2 className='property-headings mb-3'>
                        Amenities
                    </h2>
                    <ul className="card-columns">
                        {property.amenities.map((amenity, index) => <li className='amenity' key={index}>{amenity}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetail;