import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../../actions/auth";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadUser();
    axios
      .get(`/api/properties/favorites/${props.user.favorites.join(",")}`)
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromFav = (id) => {
    axios
      .put(`/api/users/favorites/remove/${id}`)
      .then((res) => setFavorites(favorites.filter((fav) => fav._id !== id)));
  };

  return (
    <div>
      <h2 className='large text-primary mt-3'>Favorites</h2>
      <ul className="list-group">
      {favorites.map((favorite) => {
        return (
          <li className="list-group-item border-0">
          <div className="mt-5 w-25">
            <div className="float-start display-6"><i>{favorite.title}</i></div>
            <button
              className='btn btn-danger float-end'
              onClick={() => removeFromFav(favorite._id)}
            >
              X
            </button>
          </div>
          </li>
        );
      })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Favorites);
