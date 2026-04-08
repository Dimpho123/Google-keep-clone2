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
    togglePin,
  } = props;

const pinnedNotes = notes.filter(note => note.pinned);
  const otherNotes = notes.filter(note => !note.pinned);

return (
  <div className="notes">

    {/* PINNED SECTION */}
    {pinnedNotes.length > 0 && (
      <>
        <p className="section-title">PINNED</p>
        <div className="notes-grid">
          {pinnedNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              toggleModal={toggleModal}
              setSelectedNote={setSelectedNote}
              updateColor={updateColor}
              archiveNote={archiveNote}
              unarchiveNote={unarchiveNote}
              restoreNote={restoreNote}
              view={view}
              togglePin={togglePin}
            />
          ))}
        </div>
      </>
    )}

    {/* OTHERS SECTION (ALWAYS BELOW PINNED) */}
    {otherNotes.length > 0 && (
      <>
        <p className="section-title">
          {pinnedNotes.length > 0 ? "OTHERS" : ""}
        </p>
        <div className="notes-grid">
          {otherNotes.map(note => (
            <Note
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              toggleModal={toggleModal}
              setSelectedNote={setSelectedNote}
              updateColor={updateColor}
              archiveNote={archiveNote}
              unarchiveNote={unarchiveNote}
              restoreNote={restoreNote}
              view={view}
              togglePin={togglePin}
            />
          ))}
        </div>
      </>
    )}

    {/* EMPTY STATE */}
    {notes.length === 0 && (
      <p>
        {view === "Reminders"
          ? "No reminders set."
          : "Notes you add appear here."}
      </p>
    )}

  </div>
);
};

export default Notes;