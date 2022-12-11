import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { useHistory } from "react-router";

const Profile = ({ setAlert, auth: { user } }) => {
  const [properties, setProperties] = useState([]);

  const history = useHistory();
  useEffect(() => {
    axios.get("/api/properties").then((resp) => setProperties(resp.data));
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
          <div className='w-75'>
          <h2 className='large text-primary'>My Properties</h2>
          <ul className='list-group'>
            {properties.map((property, index) => {
              return (
                <li clasName='list-group-item' key={index}>
                  <div className=''>
                    <div className=''>
                      <span className=''>{property.title}</span>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => updatePropertyDetails(property)}
                      >
                        Update property details
                      </button>
                      <button
                        className={`btn btn-sm btn-${
                          property.available ? "danger" : "primary"
                        }`}
                        onClick={() => offMarket(property)}
                      >
                        {property.available
                          ? "Take property off market"
                          : "Lease property"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
        <div className='col-xs-6 w-50'>
          <div className='justify-content-center row'>
            <div className="ms-auto panel panel-default">
            <h2 className='large text-primary'>My Info</h2>
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Account Type: {user.isHost ? "Host" : "Guest"}</div>
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
