import React, {useState} from "react";



//console.log(useState(props.title));

const Note =(props) => {
const [title, setTitle] = useState(props.title);
const [text, setText] = useState(props.text);
const [isHover, setIsHover] = useState(false);

//let text = props.text;

    const noteClickHandler = () => {
    
    //setTitle("changed Title");
    //setTitle("changed Text");
   
    }; 

    const hoverOverHandler =() => {
        setIsHover(true);
    };
    const hoverOutHandler =() => {
   setIsHover(false);
};
const deleteHandler = () => props.deleteNote(props.id)
 return (
<div className="note" 
id={props.id}
onClick={noteClickHandler}
onMouseOver={hoverOverHandler}
onMouseOut={hoverOutHandler} 
  >
        { isHover && (
            <span className="material-symbols-outlined check-circle"> check_circle</span>
        )}
          <div className="title">{title}</div>
          <div className="text">{text}</div>
          
          
            <div className="note-footer" 
            style={{ visibility: isHover ?  "visible" : "hidden"}}>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">add_alert</span>
              <span className="tooltip-text">Remind me</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">person_add</span>
              <span className="tooltip-text">Collaborator</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">palette</span>
              <span className="tooltip-text">Change Color</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">image</span>
              <span className="tooltip-text">Add Image</span>
            </div>
            <div className="tooltip archive" onClick={deleteHandler}>
              <span className="material-symbols-outlined hover small-icon">archive</span>
              <span className="tooltip-text">Archive</span>
            </div>
            <div className="tooltip">
              <span className="material-symbols-outlined hover small-icon">more_vert</span>
              <span className="tooltip-text">More</span>
            </div>
          </div>
        
</div>

        
    );
};
export default Note;
