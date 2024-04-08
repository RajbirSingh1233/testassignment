import React, { useState, useEffect } from 'react';
import UniversitySearchForm from './UniversitySearchForm';
import UniversitySearchResults from './UniversitySearchResults';

function UniversitySearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    handleSearchFirst();
  }, []);

  const handleSearchFirst = async (searchTerm) => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?country=India`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?country=India&name=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <UniversitySearchForm onSearch={handleSearch} />
      <UniversitySearchResults results={searchResults} />
    </div>
  );
}

export default UniversitySearchPage;
