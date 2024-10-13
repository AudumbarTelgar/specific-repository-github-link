import React, { useState } from 'react';
import ProfileList from './components/ProfileList';
import profileData from './data/profiles.json'; // Assuming the JSON file is located here

function App() {
  const [profiles, setProfiles] = useState(profileData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const searchText = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchText) ||
      profile.description.toLowerCase().includes(searchText) ||
      profile.address.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="App">
      <h1>Profile Explorer</h1>
      <input
        type="text"
        placeholder="Search profiles..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ProfileList profiles={filteredProfiles} setProfiles={setProfiles} />
    </div>
  );
}

export default App;
