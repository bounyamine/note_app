import React, { useState, useRef } from "react";
import './App.css';

const fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "Cursive",
];

const sizes = [1, 2, 3, 4, 5, 6, 7];

const App = () => {
  const textRef = useRef(null);
  const [formatState, setFormatState] = useState({
    fontName: "Arial",
    fontSize: 3,
    align: "",
    bold: false,
    superscript: false,
    subscript: false,
  });

  const modifyText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleLink = () => {
    const url = prompt("Enter a URL:");
    if (url) {
      modifyText("createLink", url.startsWith("http") ? url : `http://${url}`);
    }
  };

  const handleFontChange = (e) => {
    const newFontName = e.target.value;
    setFormatState((prev) => ({ ...prev, fontName: newFontName }));
    modifyText("fontName", newFontName);
  };

  const handleFontSizeChange = (e) => {
    const newFontSize = e.target.value;
    setFormatState((prev) => ({ ...prev, fontSize: newFontSize }));
    modifyText("fontSize", newFontSize);
  };

  const toggleStyle = (style) => {
    setFormatState((prev) => ({ ...prev, [style]: !prev[style] }));
    modifyText(style);
  };

  return (
    <div className="container">
      <div className="options">
        <button
          className={`option-button format ${formatState.bold ? "active" : ""}`}
          onClick={() => toggleStyle("bold")}
        >
          <i className="fa-solid fa-bold"></i>
        </button>

        <button
          className={`option-button script ${formatState.superscript ? "active" : ""}`}
          onClick={() => toggleStyle("superscript")}
        >
          <i className="fa-solid fa-superscript"></i>
        </button>

        <button
          className={`option-button script ${formatState.subscript ? "active" : ""}`}
          onClick={() => toggleStyle("subscript")}
        >
          <i className="fa-solid fa-subscript"></i>
        </button>

        <button onClick={() => modifyText("insertOrderedList")} className="option-button">
          <i className="fa-solid fa-list-ol"></i>
        </button>

        <button onClick={() => modifyText("insertUnorderedList")} className="option-button">
          <i className="fa-solid fa-list"></i>
        </button>

        <button onClick={() => modifyText("undo")} className="option-button">
          <i className="fa-solid fa-rotate-left"></i>
        </button>

        <button onClick={() => modifyText("redo")} className="option-button">
          <i className="fa-solid fa-rotate-right"></i>
        </button>

        <button onClick={handleLink} className="adv-option-button">
          <i className="fa fa-link"></i>
        </button>

        <button onClick={() => modifyText("unlink")} className="option-button">
          <i className="fa fa-unlink"></i>
        </button>

        <select onChange={handleFontChange} className="adv-option-button" value={formatState.fontName}>
          {fontList.map((font, index) => (
            <option key={index} value={font}>
              {font}
            </option>
          ))}
        </select>

        <select onChange={handleFontSizeChange} className="adv-option-button" value={formatState.fontSize}>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <div className="input-wrapper">
          <input
            type="color"
            onChange={(e) => modifyText("foreColor", e.target.value)}
            className="adv-option-button"
          />
          <label>Font Color</label>
        </div>

        <div className="input-wrapper">
          <input
            type="color"
            onChange={(e) => modifyText("backColor", e.target.value)}
            className="adv-option-button"
          />
          <label>Highlight Color</label>
        </div>
      </div>

      <div ref={textRef} id="text-input" contentEditable="true" className="text-input"></div>
    </div>
  );
};

export default App;
