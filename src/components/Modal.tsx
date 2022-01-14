import React from 'react';
import ModalProps from './props/ModalProps';
import '../styles/Modal.scss';

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <div className="Modal">
            <div className="ModalContent">
                <div className="ModalQuestion">{props.question}</div>
                <div className="ModalButtons">
                    <button
                        className="Button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onClickConfirm();
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="Button"
                        onClick={(e) => {
                            e.preventDefault();
                            props.onClickCancel();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
