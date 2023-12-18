import './App.css'
import FormPacientes from './components/FormPacientes'
import FormDoctores from './components/FormDoctores'
import VistaConsultorio from './components/VistaConsultorio'
import FormFechaHora from './components/FormFechaHora'
import { useState } from 'react'

function App() {
  const [pacientes, setPacientes] = useState(false)
  const [medicos, setMedicos] = useState(false)
  const [turnos, setTurnos] = useState(false)
  const [cronograma, setCronograma] = useState(false)

  function handleTurns() {
    setTurnos(true)
    setMedicos(false)
    setPacientes(false)
  }
  function handleMedicos() {
    setTurnos(false)
    setMedicos(true)
    setPacientes(false)
  }
  function handlePacientes() {
    setTurnos(false)
    setMedicos(false)
    setPacientes(true)
  }

  function handleCronograma() {
    setCronograma(!cronograma)
  }

  return (
    <>
      <section className="actions">
        <h2>Bienvenido al gestor de turnos MARIO TURNOS</h2>
        <div className="buttons">
          <button onClick={handleMedicos}>Cargar Medicos</button>
          <button onClick={handlePacientes}>Cargar Pacientes</button>
          <button onClick={handleTurns}>Cargar turnos</button>
          <button onClick={handleCronograma}>
            {cronograma ? 'ocultar' : 'ver'} cronograma
          </button>
        </div>
      </section>
      <section className="forms">
        {pacientes && <FormPacientes />}
        {medicos && <FormDoctores />}
        {turnos && <FormFechaHora />}
      </section>
      {cronograma && (
        <div>
          <VistaConsultorio />
        </div>
      )}
    </>
  )
}

export default App
