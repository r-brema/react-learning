const ModalBox = ({ children, onClose }) => {
  return (
    <div className="popup-overlay" id="popupOverlay">
      <div className="popup" id="popup">
        <span className="close" id="closePopup" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalBox;
