import { Button } from 'react-bootstrap';
import style from '../../styles/Table.style';
import { ApiData } from '../../types/api';
import DeleteConfirm from '../Modals/DeleteConfirm';
import { useState, Fragment } from "react";
import EditRow from './EditRow';


const TableRow = (props: { data: ApiData | false, row_index: number }) => {

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { data, row_index } = props;
    if (!data) return null;

    const id = data.channels.data[row_index].id;

    const deleteCallback = (del: boolean) => {
        setShowModal(false);
        console.log(del, id);
    }

    const editModeCallback = () => {
        setEditMode(false);
        console.log(id)
    }

    const row = data.channels.data[row_index];
    const sum = data.channels.data.reduce((acc: number, row: any) => acc + row[data.columns[data.columns.length - 1]], 0);

    const items = Object.values(row).map((item: any, item_index: number) => <td style={style.center} key={item_index}>{item}</td>)

    const buttons = [
        { variant: "light", text: "Usuń", colspan: 1, onClick: () => { setShowModal(true) } },
        { variant: "light", text: "Edytuj", colspan: 1, onClick: () => { setEditMode(true); } }
    ]

    const percent = (row[data.columns[data.columns.length - 1]] / sum * 100).toFixed(2);

    const color = data.chartColors[row_index];

    const percents = <td style={style.button}>
        <div style={{ ...style.percents, backgroundColor: color }}>
            {percent}%
        </div>
    </td>

    const buttonsList = buttons.map((button, index) => {
        return <td key={index} colSpan={button.colspan} onClick={button.onClick} style={style.button}>
            <Button key={index} variant={button.variant}>{button.text}</Button>
        </td>
    })

    const editRow_props = {
        name: row.name,
        clients: row.clients,
        id: id,
        setEditMode: setEditMode,
        editModeCallback: editModeCallback
    }

    return (
        <Fragment>
            {editMode ? <EditRow {...editRow_props} /> : <tr>
                {items}
                {percents}
                {buttonsList}
            </tr>}
            <DeleteConfirm show={showModal} id={id} callback={deleteCallback} />
        </Fragment>
    );
}

export default TableRow;