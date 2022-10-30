import React, { useState } from 'react';
import DetailModal from '../DetailModal/DetailModal';
import PropertyDetail from '../PropertyDetail/PropertyDetail';
import PropertyTile from '../PropertyTile/PropertyTile';

const PropertyList = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [modalWindowProperty, setModalWindowProperty] = useState({
        title: '',
        city: '',
        state: '',
        country: '',
        reviews: 0,
        pricePerNight: 0,
        cleaningFee: 0,
        serviceFee: 0,
        amenities: [],
        bedroom: 0,
        beds: 0,
        bath: 0,
        images: [],
        rating: 0,
        avgCost: 0,
        availability: '',
        distance: '',
        favorite: false
    });

    const toggleModal = (id) => {
        setIsOpen(!isOpen);
        setModalWindowProperty(props.properties.find((propertyModal, index) => index === id));
    }

    return (
        <div>
            <div className='row'>
                {props.properties.map((property, index) => (
                    <PropertyTile
                        property={property}
                        id={index}
                        key={index}
                        controlFavoritesList={props.controlFavoritesList}
                        toggleModal={toggleModal}
                    />
                ))}
            </div>
            {<DetailModal modalTitle={'Property Details'}><PropertyDetail property={modalWindowProperty} /></DetailModal>}
        </div>

    )

}

export default PropertyList;