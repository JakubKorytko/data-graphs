import { Table as BootstrapTable, Button } from 'react-bootstrap';
import { DataContext, NotificationsContext } from '../Wrappers/Context';
import { TableProps } from '../../types/props';
import TableControls from './TableControls';
import { useContext } from 'react';

const centerContent = {
    textAlign: "center" as "center",
    verticalAlign: "middle",
}

const Table = (props: TableProps) => {

    const { data, reconnect, fetchData } = useContext(DataContext);
    const { notify } = useContext(NotificationsContext);

    const categories = data ? data.columns.map((category: any, index: number) => {
        return <th key={index}>{category}</th>
    }) : null;

    const sum = data ? data.channels.data.reduce((acc: any, row: any) => {
        return acc + row[data.columns[data.columns.length - 1]];
    }, 0) : 0;

    const rows = data ? data.channels.data.map((row: any, row_index: number) => {

        const items = Object.values(row).map((item: any, item_index: number) => {
            return <td style={centerContent} key={item_index}>{item}</td>
        })

        const buttons = [{ variant: "light", text: "Usuń", colspan: 1 }, { variant: "light", text: "Edytuj", colspan: 1 }]
        const percent = (row[data.columns[data.columns.length - 1]] / sum * 100).toFixed(2);
        const color = data.chartColors[row_index];

        const percents = <td style={{ ...centerContent, width: "10%" }}>
            <div style={
                {
                    width: "100%",
                    height: "100%",
                    backgroundColor: color,
                    color: "white",
                    textAlign: "center",
                    verticalAlign: "middle"
                }}>
                {percent}%
            </div>
        </td>

        const buttonsList = buttons.map((button, index) => {
            return <td key={index} colSpan={button.colspan} style={{ ...centerContent, width: "10%" }}><Button key={index} variant={button.variant}>{button.text}</Button></td>
        })

        return (<tr key={row_index}>{items}{percents}{buttonsList}</tr>)
    }) : null;

    const controlsProps = {
        enabled: data !== false,
        columns_properties: data ? data.columns_properties : false,
        notify: notify,
        reconnect: reconnect,
        fetchData: fetchData,
        ...props
    }

    return (
        <BootstrapTable striped bordered hover style={{ backgroundColor: "white" }}>
            <thead>
                <tr>
                    {categories}
                </tr>
            </thead>
            <tbody>
                {rows}
                <TableControls {...controlsProps} />
            </tbody>
        </BootstrapTable>
    );
}

export default Table;