import { useState, useRef, useEffect } from "react";

const FilenameTab = ({ onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [filename, setFilename] = useState("Brad.java");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrEnter = (e) => {
    if (e.type === "blur" || (e.type === "keydown" && e.key === "Enter")) {
      const newFilename = inputRef.current.value.trim();
      if (newFilename) {
        setFilename(newFilename);
        onRename?.(newFilename);  // Call parent callback if provided
      }
      setIsEditing(false);
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        padding: "5px 10px",
        border: "1px solid #ccc",
        borderTopRightRadius: "10px",
        display: "inline-block",
        cursor: "pointer",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
        width: "5rem",
      }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          defaultValue={filename}
          onBlur={handleBlurOrEnter}
          onKeyDown={handleBlurOrEnter}
		  className="bg-slate-600"
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      ) : (
        <span>{filename}</span>
      )}
    </div>
  );
};

export default FilenameTab
