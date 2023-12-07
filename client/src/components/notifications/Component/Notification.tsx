import { Toast } from "react-bootstrap";
import { useState, useContext } from "react";
import { NotificationProps } from "../../../types/props";
import { NotificationsContext } from '../../Wrappers/Context';
import Title from './Title';
import Body from './Body';

const Notification = (props: NotificationProps) => {
  
  const { remove } = useContext(NotificationsContext);
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => { remove(); setShow(false) }} show={show}>
      {props.children}
    </Toast>
  );
};

Notification.Body = Body;
Notification.Title = Title;

export default Notification;