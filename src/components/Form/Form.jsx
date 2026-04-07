import React, { useState, useEffect } from "react";
import "./Form.css";
import { uid } from "uid";

const Form = (props) => {
  const { edit, selectedNote, toggleModal } = props;

  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);
  const [color, setColor] = useState((edit && selectedNote?.color) || "#ffffff");
  const [showPalette, setShowPalette] = useState(false);
  const [reminder, setReminder] = useState("");
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  useEffect(() => {
    if (edit && selectedNote) {
      setColor(selectedNote.color || "#ffffff");
      setTitle(selectedNote.title || "");
      setText(selectedNote.text || "");
      setReminder(selectedNote.reminder || "");
    }
  }, [edit, selectedNote]);

  const setLaterToday = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    setReminder(now.toISOString());
    setShowReminderPicker(false);
  };

  const setTomorrowMorning = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(8, 0, 0, 0);
    setReminder(date.toISOString());
    setShowReminderPicker(false);
  };

  const setNextWeek = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    date.setHours(9, 0, 0, 0);
    setReminder(date.toISOString());
    setShowReminderPicker(false);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!edit) {
      props.addNote({
        id: uid(),
        title,
        text,
        color,
        reminder
      });
      setIsActiveForm(false);
    } else {
      props.editNote({
        id: selectedNote.id,
        title,
        text,
        color,
        reminder
      });
      toggleModal();
    }

    setTitle("");
    setText("");
    setColor("#ffffff");
    setReminder("");
    setShowReminderPicker(false);
  };

  const formClickHandler = () => setIsActiveForm(true);

  return (
    <div
      className="form-container active-form"
      onClick={formClickHandler}
      style={{ backgroundColor: color }}
    >
      <form onSubmit={submitFormHandler} className={isActiveForm ? "form" : ""}>
        {isActiveForm && (
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="note-title"
            placeholder="Title"
          />
        )}

        <input
          onChange={(e) => {
            setText(e.target.value);
            setIsActiveForm(true);
          }}
          value={text}
          type="text"
          className="note-text"
          placeholder="Take a note..."
        />

        {isActiveForm && (
          <div className="form-actions">
            {/* REMINDER POPUP */}
            {showReminderPicker && (
              <div className="reminder-popup" onClick={(e) => e.stopPropagation()}>
                <p className="reminder-title">Remind me later</p>
                <p className="reminder-sub">Your reminders are saved in Google Tasks</p>

                
                <div className="reminder-option" onClick={setLaterToday}>
                  <span>Today</span>
                  <span>16:00 PM</span>
                </div>

                <div className="reminder-option" onClick={setTomorrowMorning}>
                  <span>Tomorrow</span>
                  <span>8:00 AM</span>
                </div>

                <div className="reminder-option" onClick={setNextWeek}>
                  <span>Next week</span>
                  <span>Mon, 8:00 AM</span>
                </div>

                <div className="reminder-option">
                  <label style={{ cursor: "pointer" }}>
                    📅 Pick date & time
                    <input
                      type="datetime-local"
                      value={reminder ? reminder.slice(0, 16) : ""}
                      onChange={(e) => setReminder(e.target.value)}
                      style={{
                        display: "block",
                        marginTop: "5px",
                        width: "100%",
                        cursor: "pointer"
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* ICONS */}
            <div className="icons">
              <div className="tooltip">
                <span
                  className="material-symbols-outlined hover small-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReminderPicker((prev) => !prev);
                  }}
                >
                  add_alert
                </span>
                <span className="tooltip-text">Remind me</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">person_add</span>
                <span className="tooltip-text">Collaborator</span>
              </div>

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
                <span className="tooltip-text">Change Color</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">image</span>
                <span className="tooltip-text">Add Image</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">archive</span>
                <span className="tooltip-text">Archive</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">more_vert</span>
                <span className="tooltip-text">More</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">undo</span>
                <span className="tooltip-text">Undo</span>
              </div>

              <div className="tooltip">
                <span className="material-symbols-outlined hover small-icon">redo</span>
                <span className="tooltip-text">Redo</span>
              </div>
            </div>

            <button type="submit" className="close-btn">
              close
            </button>
          </div>
        )}

        {/* COLOR PALETTE */}
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
                  e.stopPropagation();
                  setColor(c);
                  setShowPalette(false);
                }}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;