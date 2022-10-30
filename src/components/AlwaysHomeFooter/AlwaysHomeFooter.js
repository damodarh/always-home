import React from 'react';
import './AlwaysHomeFooter.scss';

const AlwaysHomeFooter = (props) => {

    return (
        <footer id="sticky-footer" className=" bg-dark text-white-50 mt-5 sticky-bottom">
        <div className="container text-center">
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a href="#" className="nav-link p-1 text-white">Contact: <strong>+1 (123) 456-7890</strong></a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link p-1 text-white">FAQs</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link p-1 text-white">Careers</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link p-1 text-white">All rights reserved</a>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-link p-1 text-white">Terms and Conditions</a>
            </li>
        </ul>
        </div>
      </footer>
    )

}

export default AlwaysHomeFooter;