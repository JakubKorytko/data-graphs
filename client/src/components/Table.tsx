import { Table as BootstrapTable } from 'react-bootstrap';

const Table = (props: any) => {

    const categories = props.categories ? props.categories.map((category: any, index: number) => {
        return <th key={index}>{category}</th>
    }) : null;

    const rows = props.rows ? props.rows.map((row: any, row_index: number) => {
        const items = Object.values(row).map((item: any, item_index: number) => {
            return <td key={item_index}>{item}</td>
        })

        return (<tr key={row_index}>{items}</tr>)
    }) : null;

    return (
        <BootstrapTable striped bordered hover>
            <thead>
                <tr>
                    {categories}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </BootstrapTable>
    );
}

export default Table;