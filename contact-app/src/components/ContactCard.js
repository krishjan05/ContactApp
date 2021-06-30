import React from "react";
import { Link } from "react-router-dom";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <div className="content">
        <Link
          to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link
          to={{ pathname: `/edit`, state: { contact: props.contact } }}
        >
      <i
        className="edit alternate outline icon"        
      ></i>
      </Link>
    </div>
  );
};

export default ContactCard;
