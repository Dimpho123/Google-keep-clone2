import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modal/Modal";
import './App.css';

const NOTES = [];

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notes, setNotes] = useState(NOTES);
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [view, setView] = useState("Notes");
  const [trash, setTrash] = useState([]);

  // Compute reminders based on notes
  const reminderNotes = notes.filter(note => note.reminder);

  const addNote = (note) => {
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const editNote = (editedNote) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === editedNote.id ? { ...note, ...editedNote } : note))
    );
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const archiveNote = (id) => {
    setNotes(prevNotes => {
      const noteToArchive = prevNotes.find(note => note.id === id);
      if (noteToArchive) {
        setArchivedNotes(prev => {
          if (prev.some(note => note.id === id)) return prev;
          return [...prev, noteToArchive];
        });
      }
      return prevNotes.filter(note => note.id !== id);
    });
  };

  const unarchiveNote = (id) => {
    const noteToUnarchive = archivedNotes.find(note => note.id === id);
    if (!noteToUnarchive) return;

    setNotes(prevNotes => {
      if (prevNotes.some(note => note.id === id)) return prevNotes;
      return [...prevNotes, noteToUnarchive];
    });

    setArchivedNotes(prev => prev.filter(note => note.id !== id));
  };

  const deleteToTrash = (id) => {
    setNotes(prevNotes => {
      const noteToDelete = prevNotes.find(note => note.id === id);
      if (noteToDelete) {
        setTrash(prev => {
          if (prev.some(note => note.id === id)) return prev;
          return [...prev, noteToDelete];
        });
      }
      return prevNotes.filter(note => note.id !== id);
    });
  };

  const restoreNote = (id) => {
    const noteToRestore = trash.find(note => note.id === id);
    if (!noteToRestore) return;

    setNotes(prevNotes => {
      if (prevNotes.some(note => note.id === id)) return prevNotes;
      return [...prevNotes, noteToRestore];
    });

    setTrash(prev => prev.filter(note => note.id !== id));
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const updateColor = (id, newColor) => {
    setNotes(prevNotes =>
      prevNotes.map(note => (note.id === id ? { ...note, color: newColor } : note))
    );
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} setView={setView} />
      <Form addNote={addNote} />

      <Notes
        notes={
          view === "Notes"
            ? notes
            : view === "Archive"
            ? archivedNotes
            : view === "Trash"
            ? trash
            : view === "Reminders"
            ? reminderNotes
            : notes
        }
        deleteNote={deleteToTrash}
        toggleModal={toggleModal}
        setSelectedNote={setSelectedNote}
        updateColor={updateColor}
        archiveNote={archiveNote}
        unarchiveNote={unarchiveNote}
        restoreNote={restoreNote}
        view={view}
      />

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          selectedNote={selectedNote}
          toggleModal={toggleModal}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default App;