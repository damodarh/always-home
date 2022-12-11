import React from 'react';
import PropTypes from 'prop-types';
import './AlwaysHomeModal.scss';

const AlwaysHomeModal = (props) => {
    return (
        <div
            className='modal fade'
            id={props.id}
            data-bs-keyboard='true'
            tabIndex='-1'
            aria-labelledby={props.label}
            aria-hidden='true'
        >
            <div
                className={`${props.modalDialogClassName} modal-lg modal-dialog-centered`}
            >
                <div className={props.modalContentClassName}>
                    <div className='modal-header'>
                        <h5 className='modal-title' id={props.label}>
                            {props.modalTitle}
                        </h5>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className={props.modalBodyClassName}>
                        {props.children}
                        {props.propDetail && <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-dismiss='modal'
                            onClick={() => props.handleBooking()}
                        >Reserve</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

AlwaysHomeModal.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    modalDialogClassName: PropTypes.string,
    modalBodyClassName: PropTypes.string,
    modalContentClassName: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default AlwaysHomeModal;
