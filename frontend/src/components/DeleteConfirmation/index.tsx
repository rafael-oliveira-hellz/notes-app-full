import { Button, Modal } from 'react-bootstrap';

type Props = {
  showModal: boolean;
  hideModal: () => void;
  confirmModal: (type: string, id: string) => void;
  id: string;
  type: string;
  message: string;
};

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  type,
  message,
}: Props) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={() => confirmModal(type, id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
