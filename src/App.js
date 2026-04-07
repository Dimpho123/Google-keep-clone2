import React, {useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modal/Modal";
import './App.css';

 const NOTES = [];
  
 const App =() => { 
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const [notes, setNotes] = useState(NOTES);
const [selectedNote, setSelectedNote] = useState({});
const [isModalOpen, setIsModalOpen] = useState(false);
const [archivedNotes, setArchivedNotes] = useState([]);
const [view, setView] = useState("Notes"); 
const [trash, setTrash] = useState([]);
    

const addNote = (note) => {
  setNotes((prevNotes) => {
    return [...prevNotes, note];
  });

};
const editNote = (editedNote) => {

setNotes(prevNotes => {
const newArray =  prevNotes.map(note => {
if(editedNote.id === note.id) {
  note.title = editedNote.title
   note.text = editedNote.text
}
return note;
})
return newArray;
}) 
}
const deleteNote = (id) => {
  setNotes((prevNotes) => {
    return prevNotes.filter(note => id !== note.id)
  });
};
const archiveNote = (id) => {
  setNotes((prevNotes) => {
    const noteToArchive = prevNotes.find(note => note.id === id);

    if (noteToArchive) {
      setArchivedNotes((prev) => {
        
        const alreadyExists = prev.some(note => note.id === id);
        if (alreadyExists) return prev;

        return [...prev, noteToArchive];
      });
    }

    return prevNotes.filter(note => note.id !== id);
  });
};

const deleteToTrash = (id) => {
  setNotes((prevNotes) => {
    const noteToDelete = prevNotes.find(note => note.id === id);

    if (noteToDelete) {
      setTrash(prev => {
        const alreadyExists = prev.some(note => note.id === id);
        if (alreadyExists) return prev; 
        return [...prev, noteToDelete];
      });
    }

    return prevNotes.filter(note => note.id !== id);
  });
};
//Restoring notes
const restoreNote = (id) => {
  const noteToRestore = trash.find(note => note.id === id);

  if (!noteToRestore) return;

  setNotes(prevNotes => {
    const exists = prevNotes.some(note => note.id === id);
    if (exists) return prevNotes;
    return [...prevNotes, noteToRestore];
  });

  
  setTrash(prev => prev.filter(note => note.id !== id));
};

//Unarchiving notes
const unarchiveNote = (id) => {
  const noteToUnarchive = archivedNotes.find(note => note.id === id);

  if (!noteToUnarchive) return;

  
  setNotes(prevNotes => {
    const exists = prevNotes.some(note => note.id === id);
    if (exists) return prevNotes;
    return [...prevNotes, noteToUnarchive];
  });
 
  setArchivedNotes(prev => prev.filter(note => note.id !== id));
};

const toggleModal = () => {
  setIsModalOpen(prevState => {
    return !prevState    
  })
};
const toggleSidebar = () => {
  setIsSidebarOpen(prev => !prev);
};
const updateColor = (id, newColor) => {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id ? { ...note, color: newColor } : note
    )
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
    : []
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
      {
      isModalOpen && <Modal isModalOpen={isModalOpen} selectedNote={selectedNote}
      toggleModal={toggleModal} editNote={editNote}

      
      />
      }
      
    </div>

  );
};

export default App;
