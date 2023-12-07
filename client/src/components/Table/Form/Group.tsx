import Form from 'react-bootstrap/Form';
import style from '../../../styles/Table.style';

const FormGroup = (props: { name: string, value: string, handler: React.ChangeEventHandler, placeholder: string, enabled: boolean }) => {
    const { enabled, value, handler, placeholder } = props;

    return (
    <td style={style.center} colSpan={2}>
        <Form.Group>
            <Form.Control disabled={!enabled} type="text" required value={value} onChange={handler} placeholder={placeholder} />
        </Form.Group>
    </td>)
}

export default FormGroup;