import React, { useState } from 'react'

export default function LoginView({ onLogin }) {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [correo, setCorreo] = useState('')
  const [recuperar, setRecuperar] = useState(false)

  function handleLogin(e) {
    e.preventDefault()

    if (!usuario || !password) {
      alert('Completa usuario y contraseña')
      return
    }

    // Login DEMO
    localStorage.setItem('auth', JSON.stringify({
      usuario,
      correo: `${usuario}@hospital.com`
    }))

    onLogin()
  }

  function handleRecover(e) {
    e.preventDefault()
    if (!correo) {
      alert('Ingresa tu correo')
      return
    }
    alert(`Se envió un enlace de recuperación a ${correo}`)
    setRecuperar(false)
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '80px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Gestor Hospitalario</h2>

      {!recuperar ? (
        <form onSubmit={handleLogin}>
          <label>Usuario</label>
          <input value={usuario} onChange={e => setUsuario(e.target.value)} />

          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <button className="btn" style={{ width: '100%', marginTop: 12 }}>
            Ingresar
          </button>

          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <button type="button" className="nav-btn" onClick={() => setRecuperar(true)}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRecover}>
          <label>Correo del trabajador</label>
          <input value={correo} onChange={e => setCorreo(e.target.value)} />

          <button className="btn" style={{ width: '100%', marginTop: 12 }}>
            Recuperar cuenta
          </button>

          <button
            type="button"
            className="nav-btn"
            style={{ width: '100%', marginTop: 8 }}
            onClick={() => setRecuperar(false)}
          >
            Volver al login
          </button>
        </form>
      )}
    </div>
  )
}
