import React, { useContext, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { NotificationProps } from 'components/Notifications/Component/Notification.type';
import Title from 'components/Notifications/Component/Title';
import Body from 'components/Notifications/Component/Body';
import { NotificationsContext } from 'components/Wrappers/Context';

function Notification(props: NotificationProps) {
  const { remove } = useContext(NotificationsContext);
  const [show, setShow] = useState(true);

  const { children } = props;

  return (
    <Toast onClose={() => { remove(); setShow(false); }} show={show}>
      {children}
    </Toast>
  );
}

Notification.Body = Body;
Notification.Title = Title;

export default Notification;
