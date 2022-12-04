import React from 'react';
import AlwaysHomeFooter from '../AlwaysHomeFooter/AlwaysHomeFooter';
import AlwaysHomeHeader from '../AlwaysHomeHeader/AlwaysHomeHeader';

const Layout = (props) => {

    return (
        <div style={{ height: '100%' }}>
            <AlwaysHomeHeader searchText={props.searchText} handleInputChange={props.handleInputChange} />
            {props.children}
            <AlwaysHomeFooter />
        </div>
    )

}

export default Layout;