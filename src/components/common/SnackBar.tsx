import React, { FC } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

interface Props {
  type: string;
  className: string;
  message: string;
}

const SnackBar: FC<Props> = ({ type, className, message }) => {
  return (
    <>
      {type === "success" ? (
        <div className={className}><BsCheckCircle className='snackbar-icon'/>{message}</div>
      ) : (
        <div className={className}><RiErrorWarningLine className='snackbar-icon'/>{message}</div>
      )}
    </>
  );
};

export default SnackBar;
