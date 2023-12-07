import { Row, Col } from 'react-bootstrap';
import Table from './Table';
import TableForm from './Form/Container';
import { useContext } from 'react';
import { DataContext } from '../Wrappers/Context';

const TableContainer = () => {

    const { data } = useContext(DataContext);

    const isFetched = data !== false;

    const defaultProps = { 
        clients: {
            value: 0,
            set: () => { return true }
        }, name: {
            value: '',
            set: () => { return true }
        }
    };

    if (!isFetched) return null;

    return (
        <Row>
            <Col>
                <TableForm>
                    <Table {...defaultProps} />
                </TableForm>
            </Col>
        </Row>
    )

}

export default TableContainer;