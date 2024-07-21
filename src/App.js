import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("New Text");
  const [font, setFont] = useState("Arial");
  const [size, setSize] = useState(16);
  const [color, setColor] = useState("#FFFFFF");

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [newText, setNewText] = useState("");

  const handleTextChange = (e) => {
    setHistory([...history, text]);
    setText(e.target.value);
    setRedoStack([]);
  };

  const handleFontChange = (e) => setFont(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);

  const handleUndo = () => {
    if (history.length > 0) {
      const previousText = history[history.length - 1];
      setRedoStack([text, ...redoStack]);
      setText(previousText);
      setHistory(history.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextText = redoStack[0];
      setHistory([...history, text]);
      setText(nextText);
      setRedoStack(redoStack.slice(1));
    }
  };

  const handleAddTextChange = (e) => setNewText(e.target.value);

  const handleAddText = () => {
    setHistory([...history, text]);
    setText(text + newText);
    setRedoStack([]);
    setNewText("");
  };

  return (
    <div className="app">
      <div className="toolbar">
        <button className="toolbar-button" onClick={handleUndo}>
          UNDO
        </button>
        <button className="toolbar-button" onClick={handleRedo}>
          REDO
        </button>
      </div>
      <div className="main-content">
        <div className="editor">
          <textarea
            className="text-area"
            style={{ fontFamily: font, fontSize: `${size}px`, color: color }}
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div className="controls">
          <div className="control-group font-controls">
            <label>FONT</label>
            <select value={font} onChange={handleFontChange}>
              <option value="Arial">Arial</option>
              <option value="Courier New">Courier New</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
          <div className="control-group size-controls">
            <label>SIZE</label>
            <input type="number" value={size} onChange={handleSizeChange} />
          </div>
          <div className="control-group color-controls">
            <label>COLOR</label>
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
          <div className="control-group add-text-controls">
            <input
              type="text"
              value={newText}
              onChange={handleAddTextChange}
              placeholder="Enter text to add"
            />
            <button className="add-text-button" onClick={handleAddText}>
              ADD TEXT
            </button>
          </div>
        </div>
      </div>
      <div><h4>Made for Celebrare Internship ❤️</h4></div>
      <div><button className="github-source-btn">View Source Code</button></div>
    </div>
  );
};

export default App;
