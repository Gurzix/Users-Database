import React from "react"
import axios from "axios"

const ContactList = ({ users, updateUser, updateCallback }) => {

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/delete_user/${id}`);

            if (response.status === 200) {
                updateCallback();
            } else {
                console.error("Failed to delete");
            }

        } catch (error) {
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className="contact-list">
            <table>
                <thead>
                    <tr className="t_column">
                        <td className="td" >Username</td>
                        <td className="td">Email</td>
                    </tr>
                </thead>
            </table>
            {users.map((user, index) => (
                <div className="buttons_container" key={index}>
                    <div className="contact-card">
                        <span >{user.username}</span>
                        <span>{user.email}</span>
                        <button className="update_button" onClick={() => updateUser(user)}><img src='/edit-svgrepo-com.svg' /></button>
                        <button className="delete_button" onClick={() => onDelete(user.id)}><img src='/delete.svg' /></button>
                    </div>

                </div>
            ))}
        </div>
    )
};

export default ContactList;
