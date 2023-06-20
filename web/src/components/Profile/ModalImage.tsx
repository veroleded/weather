import React from 'react';
type close = () => void;

const ModalImage = (props: { close: close }) => {
  return (
    <div id="openModal" className="modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Выбор изображения</h3>
            <span onClick={props.close} className="close">
              ×
            </span>
          </div>
          <div className="modal-body">
            <form>
              <label htmlFor="images" className="drop-container">
                <span className="drop-title">Перетащите файл</span>
                {'или'}
                <input type="file" id="images" accept="image/*" required />
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImage;
