import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const {
    notes,
    deleteNote,
    toggleModal,
    setSelectedNote,
    updateColor,
    archiveNote,
    restoreNote,
    unarchiveNote,
    view,
  } = props;

  return (
    <div className="notes">
      {notes.length === 0 ? (
        <p>{view === "Reminders" ? "No reminders set." : "Notes you add appear here."}</p>
      ) : (
        notes.map((note, index) => (
          <Note
            key={index}
            note={note}
            deleteNote={deleteNote}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
            updateColor={updateColor}
            archiveNote={archiveNote}
            unarchiveNote={unarchiveNote}
            restoreNote={restoreNote}
            view={view}
          />
        ))
      )}
    </div>
  );
};

export default Notes;