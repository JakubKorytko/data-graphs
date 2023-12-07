import { Button } from 'react-bootstrap';
import style from '../../styles/Table.style';
import { ApiData, CustomResponse, CustomMessage, Channel } from '../../types/api.d';
import { update, remove } from '../../utils/api.util';
import DeleteConfirm from '../Modals/DeleteConfirm';
import { useState, Fragment, useContext } from "react";
import EditRow from './EditRow';

import { DataContext, NotificationsContext } from '../Wrappers/Context';


const TableRow = (props: { data: ApiData | false, row_index: number }) => {

    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { fetchData, reconnect } = useContext(DataContext);

    const { data, row_index } = props;
    if (!data) return null;

    const id = data.channels.data[row_index].id;

    const deleteCallback = (del: boolean) => {
        setShowModal(false);
        if (!del) return;

        return new Promise((resolve, reject) => {
            remove(id).then((res) => {
                if (res.type === "success") {
                    fetchData().then(() => {
                        resolve("success");
                    });
                } else if (res.type === "failure") {

                    const status = (res as CustomResponse).response.status;

                    const response = (res as CustomResponse).response;
                    const info = { code: status, message: response.statusText };
                    if (status === 500) reconnect(info);
                    resolve("failure");
                } else {
                    const err = (res as CustomMessage);
                    reconnect({ code: err.code, message: err.message});
                    resolve("error");
                }
            });
        })
    }

    const editModeCallback = (name: string, clients: number) => {
        return new Promise((resolve, reject) => {
            update(id, { name, clients }).then((res) => {
                if (res.type === "success") {
                    fetchData().then(() => {
                        setEditMode(false);
                        resolve("success");
                    });
                } else if (res.type === "failure") {

                    const status = (res as CustomResponse).response.status;

                    const response = (res as CustomResponse).response;
                    const info = { code: status, message: response.statusText };
                    if (status === 500) reconnect(info);
                    resolve("failure");
                } else {
                    const err = (res as CustomMessage);
                    reconnect({ code: err.code, message: err.message});
                    resolve("error");
                }
            });
        });
    }

    const index = data.columns[data.columns.length - 1] as keyof Channel;

    const row = data.channels.data[row_index];
    const sum = data.channels.data.reduce((acc: number, row: Channel) => acc + Number(row[index]), 0);

    const items = Object.values(row).map((item: string, item_index: number) => <td style={style.center} key={item_index}>{item}</td>)

    const buttons = [
        { variant: "light", text: "Usuń", colspan: 1, onClick: () => { setShowModal(true) } },
        { variant: "light", text: "Edytuj", colspan: 1, onClick: () => { setEditMode(true); } }
    ]

    const percent = (Number(row[index]) / (sum != 0 ? sum : 1) * 100).toFixed(2);

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