import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import ContactHeader from './ContactsHeader'

function App() {

  const [users, setUsers] = useState([{ 'username': 'Piotr', 'email': 'gibala@gmail.com' }])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  const [nr_of_users, setNr_of_users] = useState(0)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await axios.get('http://127.0.0.1:5000/users')
    setUsers(res.data.users)
    setNr_of_users(res.data.users.length)
    console.log(res.data.users)
  }



  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
    setCurrentContact({})
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onUpdate = () => {
    closeModal()
    fetchUsers()
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  return (
    <>
      <h1 className='h1Users'>USERS DATABASE</h1>
      <div className='app'>
        <ContactHeader nr_of_users={nr_of_users} />
        <ContactList users={users} updateCallback={onUpdate} updateUser={openEditModal} />
        <button className='create_new_user' onClick={openCreateModal}>Create New User</button>



        {isModalOpen && <div className='overlay'>
          <div className='modal'>
            <span className="close" onClick={closeModal}><img className='close_button' src='/close.svg' /></span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>}

      </div>
    </>
  )
}

export default App
