import React, {useState} from "react";
import "./Form.css";
import { uid } from 'uid';
import { useEffect } from "react";

      const Form = (props) => {
      const { edit, selectedNote, toggleModal } = props;
      const [title, setTitle] = useState((edit && selectedNote.title) || "");
       const [text, setText] = useState((edit && selectedNote.text) || "");
       const [isActiveForm, setIsActiveForm] = useState(edit);
        const [color, setColor] = useState((edit && selectedNote?.color) || "#ffffff");
  
        const [showPalette, setShowPalette] = useState(false);

       const titleChangeHandler = (event) => setTitle(event.target.value);
       const textChangeHandler = (event) => {
        setText(event.target.value)
        setIsActiveForm(true);
      };
useEffect(() => {
  if (edit && selectedNote) {
    setColor(selectedNote.color || "#ffffff");
    setTitle(selectedNote.title || "");
    setText(selectedNote.text || "");
  }
}, [edit, selectedNote]);
       
      //const titleChangeHandler = (event) => setUserInput((prevState) => {
       //return {
  //...prevState, 
        //title: event.target.value,
       // };
      
      //});
      
      //const textChangeHandler = (event) => 
        //setUserInput((prevState) => {
        //return{
       //...prevState, 
        //text: event.target.value,
       // }
     // });

const submitFormHandler = (event) => {
  event.preventDefault();

  if (!edit) {
    // ✅ Creating new note
    props.addNote({
      id: uid(),
      title,
      text,
      color
    });

    setIsActiveForm(false);

  } else {
    // ✅ Editing existing note (SAFE ACCESS)
    props.editNote({
      id: selectedNote.id,
      title,
      text,
      color
    });

    toggleModal();
  }

  setTitle("");
  setText("");

  setColor("#ffffff");
};

const formClickHandler = () => {
setIsActiveForm(true);

};
      
    return (
        <div>
          
          {/* 
            
<div className="form-container inactive-form" onClick={formClickHandler}>
        <form>
          <input type="text" className="note-text" placeholder="Take a note..." />
          <div className="form-actions">
            <div className="tooltip">
              <span className="material-symbols-outlined hover">check_box</span>
              <span className="tooltip-text">New List</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">brush</span>
              <span className="tooltip-text">New Drawing</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">image</span>
              <span className="tooltip-text">New Image</span>
            </div>
          </div>
        </form>
      </div>
            ) : (
              */}
<div 
  className="form-container active-form" onClick={formClickHandler} 
  style={{ backgroundColor: color }}
>
        <form onSubmit={submitFormHandler} className={isActiveForm ? "form" : ""} >
          {
            isActiveForm && (
              <input onChange={titleChangeHandler} 
              value ={title} 
              type="text" 
              className="note-title" 
              placeholder="Title"/>
            )
          }
        
          <input onChange={textChangeHandler}  
          value ={text} 
          type="text" 
          className="note-text" 
          placeholder="Take a note..."
           />
           {
            isActiveForm ? (
<div className="form-actions">
            <div className="icons">
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">add_alert</span>
                <span className="tooltip-text">Remind me</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">person_add</span>
                <span className="tooltip-text">Collaborator</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon"  onClick={(e) => {
    e.stopPropagation(); // prevent parent click
    setShowPalette(prev => !prev); // toggle palette
  }}
                  >palette</span>
                <span className="tooltip-text">Change Color</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon"
                  >image</span>
                <span className="tooltip-text">Add Image</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon"
                  >archive</span>
                <span className="tooltip-text">Archive</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon"
                  >more_vert</span>
                <span className="tooltip-text">More</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon"
                  >undo</span>
                <span className="tooltip-text">Undo</span>
              </div>
              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon"
                  >redo</span>
                <span className="tooltip-text">Redo</span>
              </div>
            </div>
            <button type="submit" className="close-btn">close</button>
          </div>
            ) : (
              <div className="form-actions">
            <div className="tooltip">
              <span className="material-symbols-outlined hover">check_box</span>
              <span className="tooltip-text">New List</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">brush</span>
              <span className="tooltip-text">New Drawing</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover">image</span>
              <span className="tooltip-text">New Image</span>
            </div>
          </div>
            )
           }
         {showPalette && (
  <div className="color-palette" onClick={(e) => e.stopPropagation()}>
  {[
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8"
  ].map((c) => (
    <div
      key={c}
      className="color-circle"
      style={{ backgroundColor: c }}
      onClick={(e) => {
        e.stopPropagation(); // prevent parent click
        setColor(c);          // update the color for the note being created
        setShowPalette(false);
      }}
    />
  ))}
</div>
         )}
    
        </form>
      </div>
         </div>

      
    );
  };
export default Form;