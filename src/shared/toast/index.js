import * as React from 'react';
import MaterialIcon from 'material-icons-react';
import { toast } from 'react-toastify';

export const toastOptionsSuccess = {
  closeButton: <MaterialIcon icon="close" color="rgba(255,255,255,0.5)" />,
  className: "alert--success",
  hideProgressBar: true,
}

export const toastOptionsError = {
  closeButton: <MaterialIcon icon="close" color="rgba(255,255,255,0.5)" />,
  className: "alert--error",
  hideProgressBar: true,
}

export const toastSuccess = (message) => toast.success(message, toastOptionsSuccess);
export const toastError = (message = `Oh no! Something went wrong!`) => toast.error(message, toastOptionsError);
