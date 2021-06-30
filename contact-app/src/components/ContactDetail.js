import React from "react";
import { Link } from "react-router-dom";

const ContactDetail = (props) => {
  console.log(props);
  const { name, email } = props.location.state.contact;
  return (
    <div className="ui card centered">
      <div className="content">
        <div className="header">{name}</div>
        <div className="description">{email}</div>
      </div>
      <div className="centered-div">
        <Link to={`/`}>
          <button className="ui button blue center">Back to List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
