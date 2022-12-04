import React from 'react';
import { useState, useEffect } from 'react';
import './App.scss';
import Layout from './components/Layout/Layout';
import PropertyList from './components/PropertyList/PropertyList';

function App() {

  const [properties, setProperties] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('properties.json').then(resp => resp.json()).then(data => setProperties(data));
  }, []);

  const handleInputChange = (value) => {
    setSearchText(value.trim());
  }

  const filter = (propertyList) => {
    console.log(properties, searchText)
    return propertyList.filter(property => {
      return property.title.toLowerCase().includes(searchText.toLowerCase()) || property.address.city.toLowerCase().includes(searchText.toLowerCase());
    });

  }

  const controlFavoritesList = id => {
    setProperties(properties.map((property, index) => index === id ? {...property, favorite: !property.favorite} : property));
  }

  return (
    <div className="App">
      <Layout
        searchText={searchText}
        handleInputChange={handleInputChange}
      >
          <div className='container-fluid properties'>
            <PropertyList properties={filter(properties)} controlFavoritesList={controlFavoritesList} />
          </div>
      </Layout>
    </div >
  );
}

export default App;
