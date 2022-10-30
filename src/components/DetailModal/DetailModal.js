import React from "react";
import './DetailModal.scss';

const DetailModal = (props) => {

        return (
            <div className="modal fade" id="detailModal" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailModalLabel">{props.modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
};

export default DetailModal;