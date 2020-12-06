import React from 'react'
import SettingInput from './SettingInput'
import Modal from 'react-modal'

Modal.setAppElement('#router')

const Setting: React.FC = () => {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("clicked");
  }

  function closeModal(){
    setIsOpen(false);
  }
    return (
              <div>
        <button className="catalog-title hover:bg-channel-sidebar-hover" onClick={openModal}>Settings</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >

          <h2>Setting</h2>
          <button onClick={closeModal}>close setting</button>
          <SettingInput />
        </Modal>
      </div>

    )
}
 
export default Setting