import { Table as BootstrapTable } from 'react-bootstrap';

const Table = (props: any) => {

    const categories = props.categories.map((category: any) => {
        return <th>{category}</th>
    })

    const rows = props.rows.map((row: any) => {
        const items = row.values().map((item: any) => {
            return <td>{item}</td>
        })

        return (<tr>{items}</tr>)
    })


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