import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { useHistory } from "react-router";

const Profile = ({ setAlert }) => {
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
    history.push({ pathname: "/update-property", state: { property: property } });
  };

  return (
    <div>
      <ul className='list-group list-group-horizontal'>
        {properties.map((property, index) => {
          return (
            <li
              clasName='list-group-item d-flex justify-content-between align-items-center'
              key={index}
            >
              <div>
                <span>{property.title}</span>
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
            </li>
          );
        })}
      </ul>
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
