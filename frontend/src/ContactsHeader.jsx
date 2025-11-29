import React from "react"

const ContactHeader = (props) => {
  return (
    <section className="contacts-header">
      <div>

        <p className="p-users">Total users: {props.nr_of_users}</p>
      </div>
      <div>
      </div>
    </section>
  )
};

export default ContactHeader;
