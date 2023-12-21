import { Modal, Button } from "react-bootstrap"
import { DeleteConfirmProps } from "./DeleteConfirm.type"
import { createPortal } from "react-dom"

const DeleteConfirm = (props: DeleteConfirmProps) => {

    return (
        createPortal(
            <Modal show={props.show}>
                <Modal.Header>Delete the channel</Modal.Header>
                <Modal.Body>Are you sure you want to delete this channel? This operation cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { props.callback(false) }}>Cancel</Button>
                    <Button variant="danger" onClick={() => { props.callback(true) }}>Delete</Button>
                </Modal.Footer>
            </Modal>, document.body as HTMLElement)
    )
}

export default DeleteConfirm
