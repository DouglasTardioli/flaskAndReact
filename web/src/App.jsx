import { useEffect, useState } from 'react'

import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <div className='w-full h-screen bg-zinc-950 text-zinc-50 gap-5 flex flex-col items-center justify-center'>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button className='bg-slate-800 w-52 rounded-md p-2' onClick={openCreateModal}>Criar novo contato</button>
      {isModalOpen && <div className='fixed z-10 left-0 top-0 w-full h-screen overflow-auto bg-zinc-900/95 flex items-center justify-center'>
        <div className=' m-[10% auto] p-7 border border-zinc-500 rounded-md bg-zinc-950 drop-shadow-lg'>
          <span className='text-red-700 float-right mr-4 text-lg font-bold cursor-pointer' onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} />
        </div>
      </div>}
    </div>
  )
}

export default App
