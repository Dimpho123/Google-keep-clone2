import React, {useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modal/Modal";
import './App.css';

 const NOTES = [
    //{
      //id: "a123",
     // title: "a different tittle",
     // text: "Some text1"
    //},
    // {
     // id: "a123",
      //title: "a different tittle2",
     // text: "Some text1"
   // }, 
     //{
     // id: "a123",
     // title: "a different tittle",
      //text: "Some text1"
    //},
     //{
      //id: "a123",
      //title: "a different tittle2",
     // text: "Some text1"
    //}
    ];
  
 const App =() => { 

  const [notes, setNotes] = useState(NOTES)
    

const addNote = (note) => {
  setNotes((prevNotes) => {
    return [...notes, note];
  });

};

const deleteNote = (id) => {
  setNotes((prevNotes) => {
    return prevNotes.filter(note => id !== note.id)
  });
};
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Form addNote={addNote} />
      <Notes notes={notes} deleteNote={deleteNote} />
      <Modal/>
    </div>

  );
};

export default App;
