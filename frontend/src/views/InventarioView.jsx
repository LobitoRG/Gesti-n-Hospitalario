import React, { useMemo, useState } from 'react'

export default function InventarioView({ inventario, onOpenDetail, onDownload, onUpsert }) {
  const [filterText, setFilterText] = useState('')
  const [filterArea, setFilterArea] = useState('')

  const list = useMemo(() => {
    const t = filterText.toLowerCase().trim()
    return inventario.filter((it) => {
      const hayArea = !filterArea || (it.area || '') === filterArea
      const hayText =
        !t ||
        (`${it.nombre || ''} ${it.marca || ''} ${it.numero_inventario || it.inv || ''}`.toLowerCase().includes(t))
      return hayArea && hayText
    })
  }, [inventario, filterText, filterArea])

  return (
    <section className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Inventario</h2>
        <div>
          <button className="btn" onClick={() => onUpsert(null)}>Agregar</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }} className="card">
        <label>Buscar / filtrar</label>
        <div className="row">
          <input value={filterText} onChange={(e) => setFilterText(e.target.value)} placeholder="Nombre, marca o número de inventario" />
          <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)}>
            <option value="">Área (todas)</option>
            <option>Neonatología</option>
            <option>Medicina interna</option>
            <option>Diálisis</option>
            <option>Cirugía</option>
            <option>Imagenología</option>
            <option>Consulta externa</option>
            <option>Urgencias adulto</option>
            <option>Terapia intensiva adulto</option>
          </select>
          <button className="btn" onClick={() => { /* filtros en vivo */ }}>Aplicar</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }} className="card">
        <table>
          <thead>
            <tr><th>Inv</th><th>Equipo</th><th>Marca</th><th>Área</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {list.length ? list.map((it) => (
              <tr key={it.id_equipo || it.id || it.inv || it.numero_inventario}>
                <td>{it.numero_inventario || it.inv || it.id}</td>
                <td>{it.nombre || it.equipo}</td>
                <td>{it.marca || '—'}</td>
                <td>{it.area || '—'}</td>
                <td>{it.estatus || it.estado || '—'}</td>
                <td style={{ textAlign: 'right', display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  <button className="nav-btn" onClick={() => onOpenDetail(it)}>Abrir</button>
                  <button className="nav-btn" onClick={() => onDownload(it)}>Descargar</button>
                  <button className="btn ghost" onClick={() => onUpsert(it)}>Editar</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="small muted">No hay resultados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
