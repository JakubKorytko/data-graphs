import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import Table from 'components/Table/Table';
import TableForm from 'components/Table/Form/Container';
import { TableProps } from 'components/Table/Table.type';

import { DataContext } from 'components/Wrappers/Context';

function TableContainer() {
  const { data } = useContext(DataContext);

  const isFetched = data !== false;

  const defaultProps: TableProps = {
    clients: {
      value: 0,
      set: () => true,
    },
    name: {
      value: '',
      set: () => true,
    },
  };

  if (!isFetched) return null;

  return (
    <Row>
      <Col>
        <TableForm>
          <Table clients={defaultProps.clients} name={defaultProps.name} />
        </TableForm>
      </Col>
    </Row>
  );
}

export default TableContainer;
