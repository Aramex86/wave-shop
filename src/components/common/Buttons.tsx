import React, { FC } from "react";
import { Link } from "react-router-dom";

interface ButtonIterface {
  type: string;
  title: string;
  linkTo: string;
}

const Buttons: FC<ButtonIterface> = ({ type, title, linkTo }) => {
  if (type === "default")
    return (
      <Link className="link_default" to={linkTo}>
        {title}
      </Link>
    );

  return <button className="my_link">{title}</button>;
};

export default Buttons;
