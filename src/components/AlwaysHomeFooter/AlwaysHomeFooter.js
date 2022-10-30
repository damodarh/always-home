import React from 'react';
import './AlwaysHomeFooter.scss';

const AlwaysHomeFooter = (props) => {

    return (
        <footer id="sticky-footer" className=" bg-dark text-white-50 mt-5 sticky-bottom">
            <div className="container text-center">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a href="#" className="nav-link p-1 text-white">&copy; 2022 Always Home, Inc</a>
                    </li>
                    <span className='pl-1 pr-1'>.</span>
                    <li className="nav-item">
                        <a href="#" className="nav-link p-1 text-white">Privacy</a>
                    </li>
                    <span className='pl-1 pr-1'>.</span>
                    <li className="nav-item">
                        <a href="#" className="nav-link p-1 text-white">Terms</a>
                    </li>
                </ul>
            </div>
        </footer>
    )

}

export default AlwaysHomeFooter;