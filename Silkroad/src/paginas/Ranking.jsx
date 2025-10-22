import React from 'react'; // Asegúrate de importar React
import { useChecklist } from '../data/ChecklistContext'; // Importa el hook de tu contexto
import '/src/style.css'; // Importa tus estilos generales

// Simulación del nombre de usuario (Idealmente vendría de un AuthContext)
// Basado en tu imagen mock, el nombre es "prueba"
const currentUsername = "prueba"; 

function RankingPage() {
  // 1. Obtenemos el porcentaje del usuario actual desde el contexto
  const { currentPercentage, isLoading } = useChecklist();

  // 2. Simulamos otros jugadores para el ranking
  const simulatedUsers = [
    { name: 'Hornet', score: 112.00 },
    { name: 'Zote el Todopoderoso', score: 111.99 },
    { name: 'Quirrel', score: 98.50 },
    { name: 'Cloth', score: 85.25 },
    { name: 'Cornifer', score: 50.75 },
    { name: 'Iselda', score: 25.00 },
  ];
  
  // 3. Creamos el objeto para el usuario actual
  // Usamos toFixed para asegurar que tenga dos decimales antes de ordenar
  const currentUserScore = parseFloat(currentPercentage.toFixed(2)); 
  const currentUser = { 
      name: `${currentUsername} (Tú)`, // Añadimos "(Tú)" para identificarlo
      score: currentUserScore, 
      isCurrentUser: true 
  };
  
  // 4. Combinamos y ordenamos la lista de mayor a menor score
  const allUsers = [...simulatedUsers, currentUser].sort((a, b) => b.score - a.score);

  // Muestra "Cargando" si el contexto aún no tiene el porcentaje listo
  if (isLoading) {
    return (
      <div className="container ranking-container">
        <h1>Cargando Ranking...</h1>
      </div>
    );
  }

  // Renderiza la lista del ranking
  return (
    <div className="container ranking-container">
      <h1>Ranking de Hallownest</h1>
      <p>Tu progreso comparado con otros viajeros.</p>
      
      <ul className="ranking-list">
        <li className="ranking-header"> {/* Fila de encabezado */}
            <span className="rank">#</span>
            <span className="name">Jugador</span>
            <span className="score">Progreso</span>
        </li>
        {allUsers.map((user, index) => (
          <li 
            key={user.name + index} // Clave más robusta por si hay nombres duplicados
            className={user.isCurrentUser ? 'current-user ranking-item' : 'ranking-item'}
          >
            <span className="rank">{index + 1}</span>
            <span className="name">{user.name}</span>
            <span className="score">{user.score.toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RankingPage;