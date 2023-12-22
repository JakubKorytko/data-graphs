import { Table as BootstrapTable } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Channel } from 'utils/api.util.type';
import { DataContext } from 'components/Wrappers/Context';
import { TableProps } from 'components/Table/Table.type';
import TableControls from 'components/Table/Form/Controls';
import style from 'components/Table/Table.style';
import TableRow from 'components/Table/TableRow';

function Table(props: TableProps) {
  const { data } = useContext(DataContext);

  const categories = data ? data.columns.map((category: string, index: number) => {
    const thKey = `${category}-${index}`;
    return <th key={thKey}>{category}</th>;
  }) : null;

  const rows = data ? data.channels.data.map((row: Channel, rowIndex: number) => {
    const tableRowKey = `${row.id}-${rowIndex}`;
    return <TableRow key={tableRowKey} data={data} rowIndex={rowIndex} />;
  }) : null;

  const { clients, name } = props;

  return (
    <BootstrapTable striped bordered hover style={style.bg_white}>
      <thead>
        <tr>
          {categories}
        </tr>
      </thead>
      <tbody>
        {rows}
        <TableControls clients={clients} name={name} />
      </tbody>
    </BootstrapTable>
  );
}

export default Table;
