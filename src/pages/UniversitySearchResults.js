import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UniversitySearchResults({ results }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [favorites, setFavorites] = useState([]);
  const [updatedResults, setUpdatedResults] = useState([]);

  useEffect(() => {
    fetchFavoritesFromDatabase();
  }, []);

  useEffect(() => {
    updateCurrentResults();
  }, [results, favorites, currentPage]);

  const fetchFavoritesFromDatabase = async () => {
    try {
      const response = await axios.get('http://localhost:3001/favorites');
      const favoriteNames = response.data.map((favorite) => favorite.name);
      setFavorites(favoriteNames);
    } catch (error) {
      console.error('Error fetching favorites from database:', error);
    }
  };

  const updateCurrentResults = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResults = results.slice(indexOfFirstItem, indexOfLastItem).map((result) => ({
      ...result,
      favorite: favorites.includes(result.name)
    }));
    setUpdatedResults(currentResults);
  };

  const toggleFavorite = async (index) => {
    const university = updatedResults[index];
    const { name, ['state-province']: stateProvince, web_pages } = university;
    try {
      let response;
      if (university.favorite) {
        response = await axios.delete(`http://localhost:3001/favorites/${name}`);
      } else {
        response = await axios.post('http://localhost:3001/favorites', { name, link: web_pages[0], state: stateProvince });
      }
      console.log(response.data);

      const updatedFavorites = university.favorite ? favorites.filter(fav => fav !== name) : [...favorites, name];
      setFavorites(updatedFavorites);
      const updatedResultsCopy = [...updatedResults];
      updatedResultsCopy[index].favorite = !updatedResultsCopy[index].favorite;
      setUpdatedResults(updatedResultsCopy);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container" style={{ maxWidth: '90%', margin: '0 auto' }}>
      <div>
        <a href="/favorites">Go to Favorites</a>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>State/Province</th>
            <th>Web Pages</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {updatedResults.map((university, index) => (
            <tr key={index}>
              <td className="align-middle">{university.name || <span className="text-danger">Not Available</span>}</td>
              <td className="align-middle">{university['state-province'] || <span className="text-danger">Not Available</span>}</td>
              <td className="align-middle">{university.web_pages.length > 0 ? university.web_pages.join(', ') : <span className="text-danger">Not Available</span>}</td>
              <td className="align-middle">
                <button className={`btn ${university.favorite ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => toggleFavorite(index)}>
                  {university.favorite ? 'Remove Favorite' : 'Add Favorite'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination" style={{ maxWidth: '50%', marginLeft: 'calc(50% - 15%)' }}>
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
          </li>
          {results.length > itemsPerPage && (
            <>
              {currentPage > 2 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => paginate(1)}>1</button>
                </li>
              )}
              {currentPage > 3 && <li className="page-item disabled"><span className="page-link">...</span></li>}
              {Array.from({ length: Math.ceil(results.length / itemsPerPage) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) && (
                    <li key={i} className={`page-item ${currentPage === pageNumber && 'active'}`}>
                      <button className="page-link" onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                    </li>
                  )
                );
              })}
              {currentPage < Math.ceil(results.length / itemsPerPage) - 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
              {currentPage < Math.ceil(results.length / itemsPerPage) - 1 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => paginate(Math.ceil(results.length / itemsPerPage))}>
                    {Math.ceil(results.length / itemsPerPage)}
                  </button>
                </li>
              )}
            </>
          )}
          <li className={`page-item ${currentPage === Math.ceil(results.length / itemsPerPage) && 'disabled'}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default UniversitySearchResults;
