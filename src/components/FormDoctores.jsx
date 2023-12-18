import React from 'react'
import Swal from 'sweetalert2'

export default function FormDoctores() {
  async function handleForm(e) {
    e.preventDefault()

    const fields = new FormData(e.target)
    const name = fields.get('name_doc')
    const lastName = fields.get('lastname_doc')
    const specialite = fields.get('especialidad')
    const email = fields.get('email_doc')
    const phone = fields.get('phone_doc')

    const datos = {
      nombre: name,
      apellido: lastName,
      especialidad: specialite,
      email: email,
      telefono: phone,
    }
    try {
      const response = await fetch(
        'http://localhost:3000/api/registrar-medicos',
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
      console.log(data)
      Swal.fire(data.mensaje)
    } catch (error) {
      console.error('Error fetching pacientes:', error)
    }
  }
  return (
    <form
      id="formMedicos"
      onSubmit={(e) => {
        handleForm(e)
      }}
    >
      <h3>Médico</h3>
      <div className="campo">
        <label htmlFor="name_doc">Nombre doctor</label>
        <input type="text" name="name_doc" id="name_doc" />
      </div>
      <div className="campo">
        <label htmlFor="lastname_doc">Apellido doctor</label>
        <input type="text" name="lastname_doc" id="lastname_doc" />
      </div>
      <div className="campo">
        <label htmlFor="especialidad">Especialidad</label>
        <select name="especialidad" id="especialidad">
          <option value="Ginecologia">Ginecólogo</option>
          <option value="Psicologia">Psicólogo</option>
          <option value="Ecografia">Ecografía</option>
          <option value="Pediatra">Pediatra</option>
          <option value="Clinico">Clínico</option>
        </select>
      </div>
      <div className="campo">
        <label htmlFor="email_doc">Email doctor</label>
        <input type="email" name="email_doc" id="email_doc" />
      </div>
      <div className="campo">
        <label htmlFor="phone_doc">Teléfono doctor</label>
        <input type="tel" name="phone_doc" id="phone_doc" />
      </div>
      <button type="submit">Cargar doctor</button>
    </form>
  )
}
