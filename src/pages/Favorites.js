import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        console.log("calling")
        const response = await axios.get('http://localhost:3001/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
        <a href="/">Go Back</a>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>State/Province</th>
            <th>Web Pages</th>
          </tr>
        </thead>
        <tbody>
          {favorites.map((favorite, index) => (
            <tr key={index}>
              <td className="align-middle">{favorite.name || <span className="text-danger">Not Available</span>}</td>
              <td className="align-middle">{favorite.state || <span className="text-danger">Not Available</span>}</td>
              <td className="align-middle">{favorite.link}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Favorites;
