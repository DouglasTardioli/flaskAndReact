import { useState } from "react";


const ContactForm = ({ existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            email
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col">
            <div className="gap-4 flex mb-3">
                <label htmlFor="firstName">Nome: </label>
                <input
                    placeholder="Antonio"
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" border-green-500/20 border w-40 pl-2 text-zinc-900 rounded-md"
                />
            </div>
            <div className="gap-4 flex mb-3">
                <label htmlFor="firstName">Sobrenome: </label>
                <input
                    placeholder="Di Marco"
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className=" border-green-500/20 pl-2  w-40 text-zinc-900 border rounded-md"
                />
            </div>
            <div>
                <label htmlFor="firstName">Email: </label>
                <input
                    placeholder="email@email.com"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" border-green-500/20 pl-2 w-64 text-zinc-900 border rounded-md"
                />
            </div>

            <button className="mt-4 rounded-md bg-gray-800 p-2 hover:bg-gray-800/50" type="submit">{updating ? "Atualizar" : "Criar Contato"}</button>
        </form>
    )
}

export default ContactForm;