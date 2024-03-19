import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.log("Falha ao deletar")
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div >
            {contacts.length == 0 ? <h1 className="text-2xl">Ops... nenhum Contato 🌝</h1> : (
                contacts.map((contact) => (
                    <div key={contact.id} className="border border-zinc-50/50  rounded-md mb-4">
                        <div className="flex flex-row gap-6 p-4 items-center justify-between">
                            <div className="flex-row flex gap-2 ">
                                <span className="text-zinc-50/50">Nome: </span>
                                <p>{contact.firstName}</p>

                            </div>
                            <div className="flex-row flex gap-2 items-center justify-center">
                                <span className="text-zinc-50/50">Sobrenome:</span>
                                <p>{contact.lastName}</p>

                            </div>
                            <div className="flex-row flex gap-2 items-center justify-center">
                                <span className="text-zinc-50/50">Email: </span>
                                <p>{contact.email}</p>

                            </div>
                            <div className="flex items-center gap-2">
                                <button className="rounded-md bg-green-800 p-2 hover:bg-green-800/50" onClick={() => updateContact(contact)}>Atualizar</button>
                                <button className="rounded-md bg-red-800 p-2 hover:bg-red-800/50" onClick={() => onDelete(contact.id)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ContactList