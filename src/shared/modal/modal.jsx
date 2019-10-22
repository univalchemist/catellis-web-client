import React from "react";
import ReactDOM from "react-dom";

import MaterialIcon from 'material-icons-react';

import { Button } from 'shared/buttons';

import styles from 'stylesheets/settings/variables/_colors.scss'

const modalRoot = document.getElementById("modalPortalContainer");

export class ModalPortal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export const Modal = ({modal, title, body, onClose}) => {

  return (
    <ModalPortal>
      <div>
        <div
          className="modal__overlay"
          onClick={onClose}>
          <div
            className="modal__body"
            onClick={(evt) => evt.stopPropagation()}>
            <header aria-labelledby={title} className="modal__body-header">
              <div className="modal__close-action">
                <Button size="sm" buttonStyle="modal" onClick={onClose}>
                  <MaterialIcon icon="close" color={styles.blueBase} />
                </Button>
              </div>
              <h5 className="title" id={title}><strong>{title}</strong></h5>
            </header>
            <div className="modal__body-content">
              {body({onClose})}
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
