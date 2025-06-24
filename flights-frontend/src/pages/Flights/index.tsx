import { useState } from 'react'

import './styles.css'

// TODO: buscador de voos
// buscar por origem
// buscar por destino
// buscar por data de partida
// buscar por data de retorno

// [X] - criar estrutura HTML
// [X] - estilizar com CSS
// [X] - coletar dados do formulário
// [ ] - validar dados do formulário

export const Flights = () => {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(origin, destination, departureDate, arrivalDate)

    if (!origin || !destination || !departureDate || !arrivalDate) {
      alert('Por favor, preencha todos os campos')
      return
    }

    // TODO: buscar voos no backend
  }

  return (
    <div className="flights-container">
      {/* Search */}
      <div className="search-container">
        <form className="search-form" onSubmit={handleSubmit}>
          <div>
            <div className="search-content-flex">
              <div className="origin-container">
                <label htmlFor="origin" className="input-label">
                  Origem
                </label>
                <input
                  value={origin}
                  type="text"
                  placeholder="Origem"
                  className="input-content"
                  onChange={(e) => setOrigin(e.target.value)}
                />
              </div>

              <div className="destination-container">
                <label htmlFor="destination" className="input-label">
                  Destino
                </label>
                <input
                  value={destination}
                  type="text"
                  placeholder="Destino"
                  className="input-content"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>

            <div className="search-content-flex">
              <div className="departure-date-container">
                <label htmlFor="departure-date" className="input-label">
                  Data de partida
                </label>
                <input
                  value={departureDate}
                  type="date"
                  placeholder="Data de partida"
                  className="input-date"
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>

              <div className="arrival-date-container">
                <label htmlFor="arrival-date" className="input-label">
                  Data de retorno
                </label>
                <input
                  value={arrivalDate}
                  type="date"
                  placeholder="Data de retorno"
                  className="input-date"
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="search-button">
            Buscar voos
          </button>
        </form>
      </div>
    </div>
  )
}
