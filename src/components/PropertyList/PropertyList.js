import React from 'react';
import PropertyTile from '../PropertyTile/PropertyTile';

const PropertyList = (props) => {

    return (
        <div>
            <div className='row'>
                {props.properties.map((property, index) => (
                    <PropertyTile
                        property={property}
                        id={index}
                        key={index}
                        controlFavoritesList={props.controlFavoritesList}
                    />
                ))}
            </div>
        </div>

    )

}

export default PropertyList;