import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import AlwaysHomeModal from "../../AlwaysHomeModal/AlwaysHomeModal";
import PropertyDetail from "../PropertyDetail/PropertyDetail";
import PropertyTile from "../PropertyTile/PropertyTile";
import "./PropertyList.scss";
import { Link, useHistory } from "react-router-dom";
import { loadUser } from "../../../actions/auth";

const PropertyList = ({ searchText, auth: { user, isAuthenticated } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/api/properties").then((resp) => setProperties(resp.data));
    // fetch('properties.json')
    //     .then((res) => res.json())
    //     .then((resp) => setProperties(resp));
  }, []);

  const [modalWindowProperty, setModalWindowProperty] = useState({
    title: "",
    city: "",
    state: "",
    country: "",
    zip_code: 0,
    host: "",
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
    available: true,
    distance: "",
    favorite: false,
  });

  const history = useHistory();

  const handleBooking = () => {
    history.push({
      pathname: "/booking",
      state: {property: modalWindowProperty}
    });
    
  };

  const toggleModal = (id) => {
    setIsOpen(!isOpen);
      setModalWindowProperty(
        properties.find((propertyModal, index) => index === id)
      );
  };

  

  const filter = (propertyList) => {
    return propertyList.filter((property) => {
      return (
        property.available &&
        ((property.title &&
          property.title.toLowerCase().includes(searchText.toLowerCase())) ||
          (property.city &&
            property.city.toLowerCase().includes(searchText.toLowerCase())))
      );
    });
  };

  const controlFavoritesList = (id, isAuthenticated) => {
    if (isAuthenticated && isAuthenticated) {
      const favProp = properties.find((property, index) => index === id);
      setProperties(
        properties.map((property, index) =>
          index === id
            ? { ...property, favorite: !property.favorite }
            : property
        )
      );
      favProp.favorite
        ? axios
            .put(`/api/users/favorites/remove/${favProp._id}`)
            .then((res) => console.log(res))
        : axios
            .put(`/api/users/favorites/${favProp._id}`)
            .then((res) => console.log(res));
      loadUser();
    } else alert("Authenticate first");
  };

  if (!isAuthenticated) return <Link to='/login' />;

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
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
      {
        <AlwaysHomeModal
          modalTitle={"Property Details"}
          modalDialogClassName='modal-dialog'
          modalContentClassName='modal-content'
          modalBodyClassName='modal-body'
          id='detailModal'
          label='detailModalLabel'
          propDetail={true}
          handleBooking={handleBooking}
        >
          <PropertyDetail
            property={modalWindowProperty}
          />
        </AlwaysHomeModal>
      }
    </div>
  );
};

PropertyList.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PropertyList);
