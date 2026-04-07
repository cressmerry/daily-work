function DeleteModal({ onConfirmAction, onCancelAction }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure?</h3>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancelAction}>
            Cancel
          </button>
          <button className="confirm-delete-button" onClick={onConfirmAction}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
