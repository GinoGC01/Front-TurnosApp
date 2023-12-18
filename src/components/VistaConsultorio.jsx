import React from 'react'
import { useState, useEffect } from 'react'

export default function VistaConsultorio() {
  const [pacientesList, setPacientesList] = useState([])
  const [medicosList, setMedicosList] = useState([])
  const [turnosList, setTurnosList] = useState([])

  useEffect(() => {
    async function fetchPacientes() {
      try {
        const response = await fetch('http://localhost:3000/api/usuarios')
        const data = await response.json()
        setPacientesList(data.reverse())
      } catch (error) {
        console.error('Error fetching pacientes:', error)
      }
    }
    async function fetchMedicos() {
      try {
        const response = await fetch('http://localhost:3000/api/medicos')
        const data = await response.json()
        setMedicosList(data.reverse())
      } catch (error) {
        console.error('Error fetching medicos:', error)
      }
    }

    async function fetchTurnos() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/medicos/turnos-disponibles'
        )
        const data = await response.json()
        setTurnosList(data.reverse())
      } catch (error) {
        console.error('Error fetching turnos:', error)
      }
    }
    fetchPacientes()
    fetchMedicos()
    fetchTurnos()
  }, [])

  async function deletePaciente(id) {
    const response = await fetch(
      `http://localhost:3000/api/eliminar-usuarios?id=${id}`,
      {
        method: 'DELETE',
      }
    )
    const data = await response.json()
    if (data.mensaje === 'Usuario no encontrado') {
      // Tratar el escenario de eliminación de usuario que no existe como normal
      console.log(
        'Usuario no encontrado, pero la operación se realizó correctamente.'
      )
    } else {
      // Otras acciones en caso de éxito
      console.log('Usuario eliminado correctamente.')
    }
  }

  async function deleteMedico(id) {
    const response = await fetch(
      `http://localhost:3000/api/eliminar-medicos?id=${id}`,
      {
        method: 'DELETE',
      }
    )
    const data = await response.json()
    if (data.mensaje === 'Medico no encontrado') {
      // Tratar el escenario de eliminación de usuario que no existe como normal
      console.log(
        'Medico no encontrado, pero la operación se realizó correctamente.'
      )
    } else {
      // Otras acciones en caso de éxito
      console.log('Usuario eliminado correctamente.')
    }
  }

  async function deleteTurno(id) {
    const response = await fetch(
      `http://localhost:3000/api/medicos/turnos-disponibles?id=${id}`,
      {
        method: 'DELETE',
      }
    )
    const data = await response.json()
    if (data.mensaje === 'Turno no encontrado') {
      // Tratar el escenario de eliminación de usuario que no existe como normal
      console.log(
        'Turno no encontrado, pero la operación se realizó correctamente.'
      )
    } else {
      // Otras acciones en caso de éxito
      console.log('turno eliminado correctamente.')
    }
  }

  return (
    <section id="vistaConsultorio">
      <div>
        <h3>Pacientes</h3>
        <ul id="pacientes-column">
          {pacientesList.map((paciente) => {
            return (
              <li key={paciente.UsuarioID} className="usuarios-li">
                <p>
                  Paciente: {paciente.Nombre} {paciente.Apellido}
                </p>
                <p>Email del paciente: {paciente.Email}</p>
                <p>Telefono del paciente: {paciente.Telefono}</p>
                <button
                  className="deletepaciente-button"
                  onClick={() => {
                    deletePaciente(paciente.UsuarioID)
                  }}
                >
                  Eliminar Paciente
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h3>Médicos</h3>
        <ul id="medicos-column">
          {medicosList.map((medico) => {
            return (
              <li key={medico.MedicoID} className="usuarios-li">
                <p>
                  Médico: {medico.Nombre} {medico.Apellido}
                </p>
                <p>Medico ID: {medico.MedicoID}</p>
                <p>Especialidad: {medico.Especialidad}</p>
                <p>Email del médico: {medico.Email}</p>
                <p>Telefono del médico: {medico.Telefono}</p>

                <button
                  className="deletepaciente-button"
                  onClick={() => {
                    deleteMedico(medico.MedicoID)
                  }}
                >
                  Eliminar médico
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h3>Turnos</h3>
        <ul id="turnos-colum">
          {turnosList.map((turno) => {
            // Supongamos que recibes la fecha desde el servidor y la almacenas en una variable
            const fechaDesdeServidor = turno.Fecha

            // Crear un objeto Date con la fecha del servidor
            const fechaObj = new Date(fechaDesdeServidor)

            // Obtener día, mes y año
            const dia = fechaObj.getUTCDate()
            const mes = fechaObj.getUTCMonth() + 1 // Sumar 1 porque los meses son indexados desde 0
            const anio = fechaObj.getUTCFullYear()

            // Formatear la fecha como "dd-mm-yyyy"
            const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${
              mes < 10 ? '0' : ''
            }${mes}-${anio}`
            return (
              <li key={turno.TurnoID} className="usuarios-li">
                <p>Fecha: {fechaFormateada}</p>
                <p>Hora: {turno.Hora}</p>
                <p>ID Medico: {turno.MedicoID}</p>

                <button
                  className="deleteturno-button"
                  onClick={() => {
                    deleteTurno(turno.TurnoID)
                  }}
                >
                  Eliminar turno
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
