import React, { useState } from 'react';

function UniversitySearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="mb-3 mt-5" style={{maxWidth: "88%" , margin: '0 auto'}}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a university..."
        />
        <button className="btn btn-primary" type="submit">Search</button>
      </div>
    </form>
    </>
  );
}

export default UniversitySearchForm;
