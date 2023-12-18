import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function FormFechaHora() {
  const [medicosList, setMedicosList] = useState([])

  useEffect(() => {
    async function fetchMedicos() {
      try {
        const response = await fetch('http://localhost:3000/api/medicos')
        const data = await response.json()
        setMedicosList(data.reverse())
      } catch (error) {
        console.error('Error fetching medicos:', error)
      }
    }
    fetchMedicos()
  }, [])

  async function sendHorariosMedicos(e) {
    e.preventDefault()

    const fields = new FormData(e.target)
    const hora = fields.get('hora_doc')
    const fecha = fields.get('fecha_doc')
    const id = fields.get('nombre_medico')

    const datos = {
      hora,
      fecha,
      id,
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/medicos/turnos-disponibles`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datos),
        }
      )
      const data = await response.json()
      console.log(data)
      Swal.fire(data.mensaje)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      id="formFechaHora"
      onSubmit={(e) => {
        sendHorariosMedicos(e)
      }}
    >
      <h3>Turnos</h3>
      <div className="campo">
        <label htmlFor="nombre_medico">Nombre Médico</label>
        <select type="text" name="nombre_medico" id="nombre_medico">
          {medicosList.map((medico) => {
            return (
              <option key={medico.MedicoID} value={medico.MedicoID}>
                {medico.Nombre}
              </option>
            )
          })}
        </select>
      </div>
      <div className="campo">
        <label htmlFor="fecha_doc">Fecha disponible</label>
        <input type="date" name="fecha_doc" id="fecha_doc" />
      </div>
      <div className="campo">
        <label htmlFor="hora_doc">Hora disponible</label>
        <input type="time" name="hora_doc" id="hora_doc" />
      </div>
      <button type="submit">Cargar turno</button>
    </form>
  )
}
