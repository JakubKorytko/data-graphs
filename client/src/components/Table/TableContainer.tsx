import { Row, Col } from 'react-bootstrap';
import Table from './Table';
import TableForm from './TableForm';

const TableContainer = () => {

    return (
        <Row>
            <Col>
                <TableForm>
                    <Table />
                </TableForm>
            </Col>
        </Row>
    )

}

export default TableContainer;