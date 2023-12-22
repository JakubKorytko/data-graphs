import React from 'react';
import Form from 'react-bootstrap/Form';
import style from 'components/Table/Table.style';
import { GroupProps } from 'components/Table/Form/Group.style';

function FormGroup(props: GroupProps) {
  const {
    enabled, value, handler, placeholder,
  } = props;

  return (
    <td style={style.center} colSpan={2}>
      <Form.Group>
        <Form.Control disabled={!enabled} type="text" required value={value} onChange={handler} placeholder={placeholder} />
      </Form.Group>
    </td>
  );
}

export default FormGroup;
