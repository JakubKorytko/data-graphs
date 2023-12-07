import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import style from '../../styles/Table.style';
import { DataContext } from '../Wrappers/Context';
import { validators } from '../../utils/formsValidator.util';

const EditRow = (props: {name: string, clients: number, id: number, setEditMode: Function, editModeCallback: Function}) => {

    const [name, setName] = useState(props.name);
    const [clients, setClients] = useState(props.clients);
    const { data } = useContext(DataContext);

    const enabled = data !== false;
    if (!enabled) return null;

    const buttons = [
        { variant: "light", text: "Anuluj", colspan: 1, onClick: () => { props.setEditMode(false); } },
        { variant: "light", text: "Zapisz", colspan: 1, onClick: () => { props.editModeCallback();  } }
    ]

    const buttonsList = buttons.map((button, index) => {
        return <td key={index} colSpan={button.colspan} onClick={button.onClick} style={style.button}>
            <Button key={index} variant={button.variant}>{button.text}</Button>
        </td>
    })

    const nameHandler = (e: any) => {
        const val = validators.name(data.columns_properties, e.target.value);
        if (val === false) return;
        setName(val);
    };

    const clientsHandler = (e: any) => {
        const val = validators.clients(data.columns_properties, e.target.value);
        if (val === false) return;
        setClients(val);
    };

    return (
        <tr className="blink">
            <td style={style.center}>{props.id}</td>
            <td style={style.center} colSpan={2}><Form.Control disabled={!enabled} type="text" required value={name} onChange={nameHandler} /></td>
            <td style={style.center}><Form.Control disabled={!enabled} type="text" required value={clients} onChange={clientsHandler} /></td>
            {buttonsList}
        </tr>
    )
}

export default EditRow;