import React from "react"
import './App.css'
import { useState } from "react"
import axios from "axios"

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [username, setUsername] = useState(existingContact.username || "");
    const [email, setEmail] = useState(existingContact.email || "");


    const updating = Object.entries(existingContact).length !== 0

    const submit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            email,
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update/${existingContact.id}` : "create")

        try {
            const response = await axios({
                method: updating ? "patch" : "post",
                url: url,
                data: data, // axios sam ustawia Content-Type i serializuje JSON
            });

            // Jeśli request się powiedzie (status 200/201), axios wejdzie tutaj:
            updateCallback();

        } catch (error) {

            // Jeśli backend zwróci błąd (np. 400, 500), axios trafi tutaj
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Wystąpił błąd sieci");
            }
        }
    }


    return (
        <form className="form" onSubmit={submit}>
            <div>
                <label htmlFor="firstName">Username:</label>
                <input
                    type="text"
                    id="firstName"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Email:</label>
                <input
                    type="text"
                    id="lastName"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    )
};

export default ContactForm;
