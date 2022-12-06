import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlwaysHomeModal from '../AlwaysHomeModal/AlwaysHomeModal';
import PropertyDetail from '../PropertyDetail/PropertyDetail';
import PropertyTile from '../PropertyTile/PropertyTile';
import './PropertyList.scss';

const PropertyList = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalWindowProperty, setModalWindowProperty] = useState({
        title: '',
        address: {
            city: '',
            state: '',
            country: '',
            zip_code: 0,
        },
        host: '',
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
        favorite: false,
    });

    const toggleModal = (id) => {
        setIsOpen(!isOpen);
        setModalWindowProperty(
            props.properties.find((propertyModal, index) => index === id)
        );
    };

    return (
        <div className='property-list'>
            <div className='row'>
                {props.properties.map((property, index) => (
                    <PropertyTile
                        property={property}
                        id={index}
                        key={index}
                        controlFavoritesList={props.controlFavoritesList}
                        toggleModal={toggleModal}
                        isAuthenticated={props.isAuthenticated}
                    />
                ))}
            </div>
            {
                <AlwaysHomeModal
                    modalTitle={'Property Details'}
                    modalDialogClassName='modal-dialog'
                    modalContentClassName='modal-content'
                    modalBodyClassName='modal-body'
                    id='detailModal'
                    label='detailModalLabel'
                >
                    <PropertyDetail property={modalWindowProperty} />
                </AlwaysHomeModal>
            }
        </div>
    );
};


PropertyList.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(PropertyList);
