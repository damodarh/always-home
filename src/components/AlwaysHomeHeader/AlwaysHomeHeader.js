import React from 'react';
import Search from '../Search/Search';
import './AlwaysHomeHeader.css';

const AlwaysHomeHeader = (props) => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container-fluid">
                    <a className="navbar-brand" href="a"><img src="img/AH.png" className='logo-image' alt="logo" /></a>
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                        data-mdb-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarExample01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" aria-current="page" href="#"><strong>Home</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="container-fluid">
                        <ul className="nav justify-content-end menu-list">
                            <li className="nav-item">
                                <Search searchText={props.searchText} handleInputChange={props.handleInputChange}/>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active text-black" aria-current="page" href="#">
                                    <i className="fa fa-sign-out"></i> Logout</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link text-black" href="#"><svg xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor"
                                    className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg> Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-black" href="#"><i className="fa fa-star"></i> Favorites</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default AlwaysHomeHeader;