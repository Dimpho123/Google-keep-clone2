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

    

const addNote = (note) => {
  setNotes((prevNotes) => {
    return [...notes, note];
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
    <Sidebar isOpen={isSidebarOpen} />
      <Form addNote={addNote} />
      <Notes 
      notes={notes} 
      deleteNote={deleteNote} 
      toggleModal={toggleModal} 
      setSelectedNote={setSelectedNote} 
       updateColor={updateColor}
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
