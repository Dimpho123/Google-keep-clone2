import React, { useState } from "react";



const Note = ({
  toggleModal,
  note,
  setSelectedNote,
  deleteNote,
  updateColor,
  archiveNote,
  restoreNote,
  unarchiveNote,
  view,
  togglePin
}) => {
  const [isHover, setIsHover] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const archiveHandler = (e) => {
    e.stopPropagation();
    archiveNote(note.id);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    deleteNote(note.id);
  };

  const restoreHandler = (e) => {
    e.stopPropagation();
    restoreNote(note.id);
  };

  const unarchiveHandler = (e) => {
    e.stopPropagation();
    unarchiveNote(note.id);
  };

  const removeReminder = (e) => {
    e.stopPropagation();
    updateColor(note.id, note.color); 
    note.reminder = null; 
  };

  const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
  ];

  return (
    <div
      className="note"
      style={{ backgroundColor: note.color }}
      onClick={noteClickHandler}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
     {/*  PIN ICON (TOP RIGHT) */}
  <span
    className={`material-symbols-outlined pin-top ${
      note.pinned ? "pinned" : ""
    }`}
    onClick={(e) => {
      e.stopPropagation();
      togglePin(note.id);
    }}
  >
    push_pin
  </span>
      {isHover && <span className="material-symbols-outlined check-circle">check_circle</span>}

      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>

      {note.reminder && (
        <div className="note-reminder">
          <span className="material-symbols-outlined small-icon">
      schedule
    </span>
           {new Date(note.reminder).toLocaleString()}
          {isHover && (
            <span
              className="material-symbols-outlined remove-reminder"
              onClick={removeReminder}
              title="Remove reminder"
            >
              close
            </span>
          )}
        </div>
      )}

      <div className="note-footer" style={{ visibility: isHover ? "visible" : "hidden" }}>
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">person_add</span>
        </div>

        {/* PALETTE BUTTON */}
        <div className="tooltip">
          <span
            className="material-symbols-outlined hover small-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowPalette((prev) => !prev);
            }}
          >
            palette
          </span>
        </div>

        {/* Archive / Restore / Unarchive */}
        {view === "Trash" ? (
          <span className="material-symbols-outlined hover small-icon" onClick={restoreHandler}>
            restore_from_trash
          </span>
        ) : view === "Archive" ? (
          <span className="material-symbols-outlined hover small-icon" onClick={unarchiveHandler}>
            unarchive
          </span>
        ) : (
          <span className="material-symbols-outlined hover small-icon" onClick={archiveHandler}>
            archive
          </span>
        )}

        {/* More menu */}
        <div className="tooltip">
          <span
            className="material-symbols-outlined hover small-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
          >
            more_vert
          </span>

          {showMenu && (
            <div className="more-menu" onClick={(e) => e.stopPropagation()}>
              <div onClick={deleteHandler}>Delete note</div>
              <div>Edit labels</div>
              <div>Add drawing</div>
              <div>Make a copy</div>
              <div>Show checkboxes</div>
              <div>Copy to Google Docs</div>
              <div>Version history</div>
            </div>
          )}
        </div>
      </div>

      {/* COLOR PICKER */}
      {showPalette && (
        <div className="color-palette" onClick={(e) => e.stopPropagation()}>
          {colors.map((color) => (
            <div
              key={color}
              className="color-circle"
              style={{ backgroundColor: color }}
              onClick={() => updateColor(note.id, color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;