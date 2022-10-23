import React from 'react';
import { useState } from 'react';
import DetailModal from '../DetailModal/DetailModal';
import ProeprtyDetail from '../PropertyDetail/PropertyDetail';
import './PropertyTile.css';

const PropertyTile = (props) => {

    const property = { ...props.property };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="card col-4 card-add-ons" key={props.id}>
            <div id={`carouselExampleIndicators${props.id}`} className="carousel slide" data-bs-interval="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target={`#carouselExampleIndicators${props.id}`} data-bs-slide-to="0"
                        className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target={`#carouselExampleIndicators${props.id}`} data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target={`#carouselExampleIndicators${props.id}`} data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    {
                        property.images.map((img, index) => {
                            return <div className={`carousel-item ${index === 0 && 'active'}`}>
                                <div className="card-image">
                                    <img src={`img/${img}`} className="card-img-top" data-bs-toggle="modal" data-bs-target="#staticBackdrop" alt={`img-${index}`} onClick={() => setIsOpen(true)} />
                                </div>
                            </div>
                        }
                        )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${props.id}`}
                    data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${props.id}`}
                    data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0">
                        <span><b>{property.title}</b></span>
                        <span className="float-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <span>4.5</span>
                        </span>
                    </li>
                    <li className="list-group-item border-0 pt-0 pb-0">Little Elm, Texas</li>
                    <li className="list-group-item border-0 pt-0 pb-0">27 miles</li>
                    <li className="list-group-item border-0 pt-0 pb-0">Oct 18-24</li>
                    <li className="list-group-item border-0 pt-0 pb-0">{`$ ${property.avgCost} night`}</li>
                </ul>
            </div>
            {<DetailModal isOpen={isOpen} toggleModal={setIsOpen} modalTitle={'Property Details'}><ProeprtyDetail property={property} /></DetailModal>}
        </div>
    )
}

export default PropertyTile;