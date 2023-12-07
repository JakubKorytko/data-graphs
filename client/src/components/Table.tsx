import { Table as BootstrapTable, Button } from 'react-bootstrap';

const centerContent = {
    textAlign: "center" as "center",
    verticalAlign: "middle",
}

const Table = (props: any) => {

    const categories = props.categories ? props.categories.map((category: any, index: number) => {
        return <th key={index}>{category}</th>
    }) : null;


    const sum = props.rows ? props.rows.reduce((acc: any, row: any) => {
        return acc + row[props.categories[props.categories.length - 1]];
    }, 0) : 0;

    console.log(sum);

    const rows = props.rows ? props.rows.map((row: any, row_index: number) => {

        const items = Object.values(row).map((item: any, item_index: number) => {
            return <td style={centerContent} key={item_index}>{item}</td>
        })

        const buttons = [{ variant: "light", text: "Usuń", colspan: 1 }, { variant: "light", text: "Edytuj", colspan: 1 }]
        // const buttons = [{variant: "primary", text: "Edytuj"}, {variant: "success", text: "Zapisz"}, {variant: "danger", text: "Usuń"}]
        const percent = (row[props.categories[props.categories.length - 1]] / sum * 100).toFixed(2);
        const color = props.colors[row_index];

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

    return (
        <BootstrapTable striped bordered hover style={{ backgroundColor: "white" }}>
            <thead>
                <tr>
                    {categories}
                </tr>
            </thead>
            <tbody>
                {rows}
                {props.children}
            </tbody>
        </BootstrapTable>
    );
}

export default Table;