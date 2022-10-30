import React from 'react';
import './PropertyDetail.scss';

const ProeprtyDetail = (props) => {

    const property = { ...props.property };

    return (
        <div className='property-detail'>
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
            <div class="row">
                <div class="col-lg-6" >
                    <img src={`img/${property.images[0]}`} className='rounded title-image' />
                </div>
                <div class="col-lg-6 ps-0">
                    <div class="row h-100">
                        {property.images.map(image => {
                            return <div class="col-md-6">
                                <img src={`img/${image}`} className='rounded sub-image' />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProeprtyDetail;