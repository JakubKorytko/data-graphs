import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { DeleteConfirmProps } from 'components/Modals/DeleteConfirm.type';

const DeleteConfirm = (props: DeleteConfirmProps) => (
  createPortal(
    <Modal show={props.show}>
      <Modal.Header>Delete the channel</Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this channel? This operation cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { props.callback(false); }}>Cancel</Button>
        <Button variant="danger" onClick={() => { props.callback(true); }}>Delete</Button>
      </Modal.Footer>
    </Modal>,
    document.body as HTMLElement,
  )
);

export default DeleteConfirm;
