import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser } from './redux/userSlice';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      const data = await response.json();
      dispatch(setUser(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Nombre de usuario: {user.login}</p>
          <p>Seguidores: {user.followers}</p>
          <p>Repositorios públicos: {user.public_repos}</p>
          <img src={user.avatar_url} alt="Avatar" />
        </div>
      )}
    </div>
  );
};

export default App;
