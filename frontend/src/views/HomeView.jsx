import React, { useMemo, useState } from 'react'

export default function HomeView({ inventario, bitacoras, onGoForm, onUpsertInventario }) {
  const [searchId, setSearchId] = useState('')
  const [areaFilter, setAreaFilter] = useState('')

  const recent = useMemo(() => inventario.slice(0, 5), [inventario])

  const found = useMemo(() => {
    const q = searchId.trim()
    if (!q) return null
    return inventario.find((i) => String(i.numero_inventario || i.inv || i.id || '') === q) || null
  }, [inventario, searchId])

  return (
    <section className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Inicio</h2>
          <div className="muted">Usa el número de inventario para buscar, editar o crear un registro rápidamente.</div>
        </div>
        <div className="kpi">
          <div className="box chip">Inventarios: <span>{inventario.length}</span></div>
          <div className="box chip">Bitácoras: <span>{bitacoras.length}</span></div>
        </div>
      </div>

      <hr style={{ margin: '14px 0', border: 'none', borderTop: '1px solid var(--border)' }} />

      <div className="grid grid-2">
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <label htmlFor="searchId">Buscar por número de inventario</label>
            <div className="search-row">
              <input
                type="text"
                id="searchId"
                placeholder="Ej: 192571"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <button
                className="btn"
                onClick={() => {
                  if (!searchId.trim()) alert('Ingresa un número de inventario')
                }}
              >
                Buscar
              </button>
              <button className="nav-btn" onClick={() => setSearchId('')}>Limpiar</button>
            </div>

            <div style={{ marginTop: 12 }}>
              {!searchId.trim() ? null : found ? (
                <div className="card">
                  <strong>{found.nombre || found.equipo || 'Equipo'}</strong>
                  <div className="small muted">
                    Marca: {found.marca || '—'} · Área: {found.area || '—'}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button className="btn" onClick={() => onUpsertInventario(found)}>Editar</button>
                  </div>
                </div>
              ) : (
                <div className="card">
                  <div className="small muted">
                    No existe un registro con número <strong>{searchId.trim()}</strong>.
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button className="btn" onClick={() => onUpsertInventario({ numero_inventario: searchId.trim() })}>
                      Crear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginTop: 0 }}>Acciones rápidas</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="btn" onClick={() => onUpsertInventario(null)}>Agregar inventario</button>
              <button className="btn" onClick={() => alert('En React: agrega desde la vista Bitácora (demo).')}>Agregar bitácora</button>
              <button className="nav-btn" onClick={onGoForm}>Crear orden de servicio</button>
            </div>
          </div>
        </div>

        <aside>
          <div className="card">
            <h4 style={{ margin: '0 0 8px 0' }}>Filtrar por área</h4>
            <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
              <option value="">— Todas —</option>
              <option>Neonatología</option>
              <option>Medicina interna</option>
              <option>Diálisis</option>
              <option>Cirugía</option>
              <option>Quirófano</option>
              <option>Pediatría</option>
              <option>Urgencias adulto</option>
              <option>Terapia intensiva adulto</option>
              <option>Imagenología</option>
              <option>Consulta externa</option>
            </select>
            <div style={{ marginTop: 12 }}>
              <h5 className="small">Últimos inventarios agregados</h5>
              <div className="small muted" style={{ marginTop: 6 }}>
                {(areaFilter ? inventario.filter(i => (i.area||'')===areaFilter) : recent)
                  .slice(0,5)
                  .map((i) => `${i.numero_inventario || i.inv || i.id} · ${i.nombre || i.equipo || ''}`)
                  .join('\n') || '—'}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
