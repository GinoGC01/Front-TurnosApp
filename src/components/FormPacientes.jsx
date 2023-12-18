import React from 'react'
import Swal from 'sweetalert2'

export default function FormPacientes() {
  async function handleSubmit(e) {
    e.preventDefault()

    const fields = new FormData(e.target)
    const name = fields.get('name_pac')
    const lastName = fields.get('lastname_pac')
    const email = fields.get('email_pac')
    const phone = fields.get('phone_pac')

    const datos = {
      nombre: name,
      apellido: lastName,
      email: email,
      telefono: phone,
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/registrar-usuarios',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos),
        }
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      Swal.fire(data.mensaje)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      id="formPacientes"
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <h3>Paciente</h3>
      <div className="campo">
        <label htmlFor="name_pac">Nombre paciente</label>
        <input type="text" name="name_pac" id="name_pac" />
      </div>
      <div className="campo">
        <label htmlFor="lastname_pac">Apellido paciente</label>
        <input type="text" name="lastname_pac" id="lastname_pac" />
      </div>
      <div className="campo">
        <label htmlFor="email_pac">Email paciente</label>
        <input type="email" name="email_pac" id="email_pac" />
      </div>
      <div className="campo">
        <label htmlFor="phone_pac">Teléfono paciente</label>
        <input type="tel" name="phone_pac" id="phone_pac" />
      </div>
      <button type="submit">Cargar Paciente</button>
    </form>
  )
}
