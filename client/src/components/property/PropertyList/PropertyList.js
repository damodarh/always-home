import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import AlwaysHomeModal from '../../AlwaysHomeModal/AlwaysHomeModal';
import PropertyDetail from '../PropertyDetail/PropertyDetail';
import PropertyTile from '../PropertyTile/PropertyTile';
import './PropertyList.scss';
import { Link } from 'react-router-dom';

const PropertyList = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get('/api/properties').then((resp) => setProperties(resp.data));
        // fetch('properties.json')
        //     .then((res) => res.json())
        //     .then((resp) => setProperties(resp));
    }, []);

    const [modalWindowProperty, setModalWindowProperty] = useState({
        title: '',
        city: '',
        state: '',
        country: '',
        zip_code: 0,
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
            properties.find((propertyModal, index) => index === id)
        );
    };

    const filter = (propertyList) => {
        return propertyList.filter((property) => {
            console.log(property)
            return (
                property.title && property.title
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase()) ||
                property.city && property.city
                    .toLowerCase()
                    .includes(props.searchText.toLowerCase())
            );
        });
    };

    const controlFavoritesList = (id, isAuthenticated) => {
        isAuthenticated && isAuthenticated
            ? setProperties(
                  properties.map((property, index) =>
                      index === id
                          ? { ...property, favorite: !property.favorite }
                          : property
                  )
              )
            : alert('Authenticate first');
    };

    if (!props.isAuthenticated) return <Link to='/login' />;

    return (
        <div className='property-list'>
            <div className='row'>
                {filter(properties).map((property, index) => (
                    <PropertyTile
                        property={property}
                        id={index}
                        key={index}
                        controlFavoritesList={controlFavoritesList}
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
