import React from "react";
import { connect, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../../actions/auth";
import Spinner from "./Spinner";
import Error from "./Error";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
    axios
      .get(`/api/properties/favorites/${props.user.favorites.join(",")}`)
      .then((res) => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.error("No favorite properties yet!");
        }
        setError(true);
        setLoading(false);
      });
  }, []);

  const removeFromFav = (id) => {
    axios.put(`/api/users/favorites/remove/${id}`).then((res) => {
      setFavorites(favorites.filter((fav) => fav._id !== id));
      dispatch(loadUser());
    });
  };

  return (
    <div>
      <h2 className='large text-primary mt-3'>Favorites</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error
          message={"No favorites added to the list yet!"}
          status={404}
          statusMessage={"Data not found."}
          showHome={true}
          showOops={true}
        />
      ) : (
        <ul className='list-group'>
          {favorites.length === 0 ? (
            <Error
              message={"No favorites added to the list yet!"}
              status={404}
              statusMessage={"Data not found."}
            />
          ) : (
            favorites.map((favorite) => {
              return (
                <li className='list-group-item border-0' style={{background: 'transparent'}}>
                  <div className='mt-5 w-25'>
                    <div className='float-start display-6'>
                      <i>{favorite.title}</i>
                    </div>
                    <button
                      className='btn btn-danger float-end'
                      onClick={() => removeFromFav(favorite._id)}
                    >
                      X
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Favorites);
