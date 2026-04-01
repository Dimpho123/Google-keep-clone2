import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
const { notes, deleteNote} = props;


return (
<div className="notes">
    {notes.length === 0 ? (
    <p>Notes you add appear here.</p> 
) : (
notes.map((note, index) => (
<Note key={index} id= {note.id} title={note.title} text={note.text} deleteNote={deleteNote} />
    ))
)}
</div>    
    );
};
export default Notes;
