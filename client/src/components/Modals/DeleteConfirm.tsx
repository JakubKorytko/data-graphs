import { Modal, Button } from "react-bootstrap"
import { DeleteConfirmProps } from "../../types/props"
import { createPortal } from "react-dom"

const DeleteConfirm = (props: DeleteConfirmProps) => {

    return (
        createPortal(
            <Modal show={props.show}>
                <Modal.Header>Usuń kanał</Modal.Header>
                <Modal.Body>Czy na pewno chcesz usunąć ten kanał? Tej operacji nie można cofnąć.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { props.callback(false) }}>Anuluj</Button>
                    <Button variant="danger" onClick={() => { props.callback(true) }}>Usuń</Button>
                </Modal.Footer>
            </Modal>, document.body as HTMLElement)
    )
}

export default DeleteConfirm