import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';

const TypeAheadComponent = ({ list }) => {
  const [userVal, setUserVal] = useState("");
  const [userColor, setUserColor] = useState([]);
  const [showList, setShowList] = useState(true);
  const inputRef = useRef(null);

  //hide list on clickng outer area of content
  document.onclick = function (event) {
    if (event === undefined) event = window.event;
    var target = "target" in event ? event.target : event.srcElement;

    if (target.tagName === "HTML") {
      setShowList(false);
      inputRef.current.focus();

    }
  };
  const autoComplete = (val) => {
    return val && val.length
      ? list.filter((color) => color.toLowerCase().includes(val.toLowerCase()))
      : [];
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setShowList(true);
    setUserVal(value);
    setUserColor(autoComplete(value));
  };

  const handleColorClick = (e) => {
    const { innerHTML } = e.currentTarget;
    setUserVal(innerHTML);
    setShowList(false);
  };

  const handleEnter = (e) => {
    const { innerHTML } = e.currentTarget;
    if (e.which === 13) {
      setUserVal(innerHTML);
      setShowList(false);
    }
  };

  const handleEsc = (e) => {
    if (e.which === 17) {
      setShowList(false);
    }
  };

  const colorListRender = (list) => {
    const boldMatchingLetters = (word) => {
      const wordLeng = word.length;
      const boldLetts = word.substr(0, 2);
      const nonBoldLetts = word.substr(2, wordLeng);

      return boldLetts.toLowerCase() === userVal.substr(0, 2).toLowerCase() &&
        userVal.length === 2 ? (
        <>
          <b>{boldLetts}</b>
          {nonBoldLetts}
        </>
      ) : (
        word
      );
    };
    return list.map((c, i) => (
      <div
        tabIndex={0}
        className="cell cell-list"
        key={`${c}-${i}`}
        onClick={(c) => handleColorClick(c)}
        onKeyDown={handleEnter}
      >
        {boldMatchingLetters(c)}
      </div>
    ));
  };

  return (
    <>
      <div className="cell">
        <div className="cell center">
          <label htmlFor="typeahead">Search Typeahead</label>
        </div>
        <div className="cell">
          <input
            placeholder="Type to start searching"
            onChange={handleChange}
            onKeyDown={handleEsc}
            type="text"
            value={userVal}
            id="typeahead"
            name="typeahead"
            ref={inputRef}
            style={{ fontWeight: "normal" }}
          ></input>
        </div>
      </div>
      <div className="cell">{showList && colorListRender(userColor)}</div>
    </>
  );
};

TypeAheadComponent.propTypes = {
  list: PropTypes.array,
  userVal: PropTypes.string,
  showList: PropTypes.bool,
  numberProp: PropTypes.number
};


export default TypeAheadComponent;