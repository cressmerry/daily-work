import { useState } from "react";

function ActionButtons({ note, onDelete, onClose }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCloseClick = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      await onClose(note.id);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="button-group">
      <button
        className="delete-button"
        onClick={() => onDelete(note.id)}
        disabled={isProcessing}
      >
        ✖
      </button>
      {note.status === "created" && (
        <button
          className="close-note-button"
          onClick={handleCloseClick}
          disabled={isProcessing}
        >
          ✔
        </button>
      )}
    </div>
  );
}

export default ActionButtons;