import React from "react";
import './AlwaysHomeModal.scss';

const AlwaysHomeModal = (props) => {

    return (
        <div className="modal fade" id="detailModal" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
            <div className={`${props.modalDialogClassName} modal-lg modal-dialog-centered`}>
                <div className={props.modalContentClassName}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="detailModalLabel">{props.modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={props.modalBodyClassName}>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AlwaysHomeModal;