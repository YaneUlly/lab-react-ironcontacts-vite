import './App.css';
import { useState } from 'react';
import ContactsData from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(ContactsData.slice(0, 5));

  const addRandomContact = () => {
    if (contacts.length < ContactsData.length) {
      const remainingContacts = ContactsData.filter(
        contact =>
          !contacts.find(existingContact => existingContact.id === contact.id)
      );
      if (remainingContacts.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * remainingContacts.length
        );
        const randomContact = remainingContacts[randomIndex];
        setContacts(prevContacts => [...prevContacts, randomContact]);
      }
    }
  };

  const sortByName = () => {
    const sortedContacts = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContacts(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contacts].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContacts(sortedContacts);
  };

  const deleteContact = id => {
    // console.log('Contact ID to delete:', id);
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    // console.log('Updated Contacts:', updatedContacts);
    setContacts(updatedContacts);
  };

  return (
    <div className='App'>
      <h1>LAB | React IronContacts</h1>
      <div className='buttons'>
        <button onClick={addRandomContact}>Add Random Contact</button>
        <button onClick={sortByPopularity}>Sort By Popularity</button>
        <button onClick={sortByName}>Sort By Name</button>
      </div>
      <table>
        <thead>
          <tr className='tables-themes'>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id} className='tables-content'>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  style={{ width: '80px', height: '120px' }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? <p>&#127942;</p> : <p></p>}</td>
              <td>{contact.wonEmmy ? <p>&#11088;</p> : <p></p>}</td>
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
