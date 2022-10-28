import React from 'react';
import './AlwaysHomeFooter.scss';

const AlwaysHomeFooter = (props) => {

    return (
        <footer id="sticky-footer" class=" bg-dark text-white-50 mt-5">
        <div class="container text-center">
        <ul class="nav d-block justify-content-center">
            <li class="nav-item">
                <a href="#" class="nav-link p-1 text-white">Contact: <strong>+1 (123) 456-7890</strong></a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link p-1 text-white">FAQs</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link p-1 text-white">Careers</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link p-1 text-white">All rights reserved</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link p-1 text-white">Terms and Conditions</a>
            </li>
        </ul>
        </div>
      </footer>
    )

}

export default AlwaysHomeFooter;