import { Table as BootstrapTable, Button } from 'react-bootstrap';
import { DataContext } from '../Wrappers/Context';
import { TableProps } from '../../types/props';
import TableControls from './Form/Controls';
import { useContext } from 'react';
import style from '../../styles/Table.style';
import TableRow from './TableRow';

const Table = (props: TableProps) => {

    const { data } = useContext(DataContext);
    
    const categories = data ? data.columns.map((category: any, index: number) => <th key={index}>{category}</th>) : null;

    const rows = data ? data.channels.data.map((row: any, row_index: number) => <TableRow key={row_index} {...{data, row_index}} />) : null;

    return (
        <BootstrapTable striped bordered hover style={style.bg_white}>
            <thead>
                <tr>
                    {categories}
                </tr>
            </thead>
            <tbody>
                {rows}
                <TableControls {...props} />
            </tbody>
        </BootstrapTable>
    );
}

export default Table;