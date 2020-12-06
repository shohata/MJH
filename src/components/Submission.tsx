import React from 'react'
import SubmissionEditor from './SubmissionEditor'
import Modal from 'react-modal'

Modal.setAppElement('#router')

const Submission: React.FC = () => {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("Edit submission clicked");
  }

  function closeModal(){
    setIsOpen(false);
  }
    return (
              <div>
        <button className="catalog-title hover:bg-channel-sidebar-hover" onClick={openModal}>Submit Weekly Report</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Submission Modal"
        >
          <button onClick={closeModal}>close editing page</button>
          <SubmissionEditor />
        </Modal>
      </div>

    )
}
 
export default Submission