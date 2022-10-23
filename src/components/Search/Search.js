import React from "react";
import './Search.scss';

const Search = (props) => {
    return (
        <div className="input-group">
            <input
                className="form-control border-end-0 border rounded-pill"
                type="search"
                placeholder="Search..."
                value={props.searchText}
                onChange={event => props.handleInputChange(event.target.value)}
                id="example-search-input"
            />
            <span className="input-group-append">
                <button className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5">
                    <i className="fa fa-search"></i>
                </button>
            </span>
        </div>
    )
}

export default Search;