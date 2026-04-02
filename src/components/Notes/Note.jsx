import React, { useState } from "react";

const Note = (props) => {
  const { toggleModal, note, setSelectedNote, deleteNote, updateColor } = props;

  const [isHover, setIsHover] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const deleteHandler = () => deleteNote(note.id);

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
    "#fdcfe8"
  ];

  return (
    <div
      className="note"
      style={{ backgroundColor: note.color }} 
      onClick={noteClickHandler}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover && (
        <span className="material-symbols-outlined check-circle">
          check_circle
        </span>
      )}

      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>

      <div
        className="note-footer"
        style={{ visibility: isHover ? "visible" : "hidden" }}
      >
        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">
            add_alert
          </span>
        </div>

        <div className="tooltip">
          <span className="material-symbols-outlined hover small-icon">
            person_add
          </span>
        </div>

        {/*  PALETTE BUTTON */}
        <div className="tooltip">
          <span
            className="material-symbols-outlined hover small-icon"
            onClick={(e) => {
    e.stopPropagation(); // prevent parent click
    setShowPalette(prev => !prev); // toggle palette
  }}
          >
            palette
          </span>
        </div>

        <div className="tooltip archive" onClick={deleteHandler}>
          <span className="material-symbols-outlined hover small-icon">
            archive
          </span>
        </div>
      </div>

      {/*  COLOR PICKER */}
      {showPalette && (
        <div
          className="color-palette"
          onClick={(e) => e.stopPropagation()} // prevent modal open
        >
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