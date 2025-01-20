import React, { useState } from 'react';
import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: 'http://172.233.139.197',
  apiKey: 'd388d2446bccc07114debedcca01058d239ee3afd4553c93c6f1ad7bea61',
});

const App = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  const manejarBusqueda = async () => {
    try {
      setError(null);
      const index = client.index('movies');
      const response = await index.search(query);
      setResultados(response.hits);
    } catch (err) {
      console.error('Error al buscar:', err);
      setError('No se pudo realizar la búsqueda');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', color: '#333', minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#ff6347' }}>Busca tu película favorita</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Escribe el título de una película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '70%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: '#fff',
            color: '#333',
          }}
        />
        <button
          onClick={manejarBusqueda}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            backgroundColor: '#ff6347',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Buscar
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <ul style={{ marginTop: '20px', listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {resultados.map((pelicula) => (
          <li
            key={pelicula.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '15px',
              width: '250px',
              textAlign: 'center',
              color: '#333',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              border: '1px solid #ddd',
            }}
          >
            <img
              src={pelicula.poster || 'https://via.placeholder.com/200x300?text=Sin+Imagen'}
              alt={pelicula.title || 'Sin título'}
              style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '10px' }}
            />
            <strong style={{ fontSize: '18px', display: 'block', marginBottom: '5px' }}>
              {pelicula.title || 'Sin título'}
            </strong>
            <span style={{ color: '#ff6347' }}>{pelicula.genres || 'Sin género'}</span>
          </li>
        ))}
      </ul>
      <footer style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#999' }}>
        Hecho por Josmar Olivera Perez
      </footer>
    </div>
  );
};

export default App;
