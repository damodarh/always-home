import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { useHistory } from "react-router";
import Spinner from "../Layout/Spinner";

const Profile = ({ setAlert, auth: { user } }) => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  useEffect(() => {
    Promise.all([
      axios.get("/api/properties").then((resp) => setProperties(resp.data)),
      axios.get("/api/bookings").then((res) => setBookings(res.data)),
    ]).then((res) => setLoading(false));
  }, []);

  const offMarket = (property) => {
    if (property.available) {
      axios
        .delete(`/api/properties/${property._id}`)
        .then((resp) => {
          axios
            .get("/api/properties")
            .then((res) => {
              setProperties(res.data);
              setAlert(`${resp.data}`, "success");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          setAlert("Error in performing operation", "danger");
        });
    } else {
      axios
        .put(`/api/properties/available/${property._id}`)
        .then((res) => {
          axios
            .get("/api/properties")
            .then((resp) => {
              setProperties(resp.data);
              setAlert(`${res.data}`, "success");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
          setAlert("Error in performing operation", "danger");
        });
    }
  };

  const updatePropertyDetails = (property) => {
    history.push({
      pathname: "/update-property",
      state: { property: property },
    });
  };

  return (
    <div clasName='container'>
      <div className='row'>
        <div className='col-xs-6 w-50'>
          <div>
            {user && user.isHost && (
              <Fragment>
                <h2 className='large  Item_style'>MY PROPERTIES</h2>
                <ul className='list-group Item_Style'>
                  {loading ? (
                    <Spinner />
                  ) : (
                    properties.map((property, index) => {
                      return (
                        <li
                          clasName='list-group-item'
                          style={{ marginBottom: "3%" }}
                          key={index}
                        >
                          <div className='row'>
                            <span className='col-5'>{property.title}</span>
                            <button
                              className='btn btn-primary btn-sm button1 mt-0 col-2'
                              style={{ marginLeft: "0%" }}
                              onClick={() => updatePropertyDetails(property)}
                            >
                              Update property details
                            </button>
                            <button
                              className={`button1 btn btn-sm btn-${
                                property.available ? "danger" : "primary"
                              } mt-0 col-2`}
                              style={{ marginLeft: "5%" }}
                              onClick={() => offMarket(property)}
                            >
                              {property.available
                                ? "Take property off market"
                                : "Lease property"}
                            </button>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
              </Fragment>
            )}
          </div>
          <div className='w-75 mt-5 pt-5'>
            <div className='container shadow py-2'>
              <div className='container network_wrapper col-sm p-2 '>
                <div className='card'>
                  <div className='card-header'>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Fragment>
                        <h5 className='Item_style1 card-title'>MY BOOKINGS</h5>
                        <ul
                          className='nav nav-tabs card-header-tabs Item_Style'
                          data-bs-tabs='tabs'
                        >
                          <li className='nav-item '>
                            <a
                              className='nav-link active'
                              aria-current='true'
                              data-bs-toggle='tab'
                              href='#dhcp'
                            >
                              Completed
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link'
                              data-bs-toggle='tab'
                              href='#static'
                            >
                              Cancelled
                            </a>
                          </li>
                        </ul>
                      </Fragment>
                    )}
                  </div>
                  <div className='card-body tab-content List_Style'>
                    <div className='tab-pane active' id='dhcp'>
                      {bookings
                        .filter(
                          (booking) => booking.bookingStatus === "completed"
                        )
                        .map((booking) => {
                          return <div>{booking.title}</div>;
                        })}
                    </div>
                    <div className='tab-pane' id='static'>
                      {bookings
                        .filter(
                          (booking) => booking.bookingStatus === "cancelled"
                        )
                        .map((booking) => {
                          return <div>{booking.title}</div>;
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xs-6 w-50'>
          <div className='justify-content-center row'>
            <div className='ms-auto panel panel-default'>
              <h2 className='large Item_style'>MY INFO</h2>
              <div className='Item_Style'>Name: {user.name}</div>
              <div className='Item_Style'>Email: {user.email}</div>
              <div className='Item_Style'>
                Account Type: {user.isHost ? "Host" : "Guest"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Profile);
