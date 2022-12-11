import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const BookingHandler = (props) => {
  const [property, setProperty] = useState({});

  const location = useLocation();

  useEffect(() => {
    const property = location.state.property;
    setProperty(property);
  }, []);
  return <div>{property.title}</div>;
};

export default BookingHandler;
