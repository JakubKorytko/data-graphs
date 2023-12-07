import { Table as BootstrapTable, Button } from 'react-bootstrap';
import { DataContext } from '../Wrappers/Context';
import { TableProps } from '../../types/props';
import TableControls from './Form/Controls';
import { useContext } from 'react';
import style from '../../styles/Table.style';
import { ApiData } from '../../types/api';

const generate = (data: ApiData | false) => {

    const categories = data ? data.columns.map((category: any, index: number) => <th key={index}>{category}</th>) : null;

    const sum = data ? data.channels.data.reduce((acc: number, row: any) => acc + row[data.columns[data.columns.length - 1]], 0) : 0;

    const rows = data ? data.channels.data.map((row: any, row_index: number) => {

        const items = Object.values(row).map((item: any, item_index: number) => <td style={style.center} key={item_index}>{item}</td>)

        const buttons = [{ variant: "light", text: "Usuń", colspan: 1 }, { variant: "light", text: "Edytuj", colspan: 1 }]

        const percent = (row[data.columns[data.columns.length - 1]] / sum * 100).toFixed(2);
        
        const color = data.chartColors[row_index];

        const percents = <td style={style.button}>
            <div style={{ ...style.percents, backgroundColor: color }}>
                {percent}%
            </div>
        </td>

        const buttonsList = buttons.map((button, index) => {
            return <td key={index} colSpan={button.colspan} style={style.button}>
                <Button key={index} variant={button.variant}>{button.text}</Button>
                </td>
        })

        return <tr key={row_index}>{items}{percents}{buttonsList}</tr>
    }) : null;

    return { categories, rows };
}

const Table = (props: TableProps) => {

    const { data } = useContext(DataContext);
    const { categories, rows } = generate(data);
    
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