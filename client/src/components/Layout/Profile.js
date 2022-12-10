import { useEffect, useState } from "react";
import axios from "axios";

const Profile = (props) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/api/properties").then((resp) => setProperties(resp.data));
  }, []);

  console.log(properties);

  return (
    <div>
      <ul className='list-group list-group-horizontal'>
        {properties.map((property, index) => {
          return (
            <li clasName='list-group-item d-flex justify-content-between align-items-center' key={index}>
              <div>
                <span>{property.title}</span>
                <button className='btn btn-primary btn-sm'>
                  Update property details
                </button>
                <button className='btn btn-danger btn-sm'>
                  Take property off market
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Profile;
