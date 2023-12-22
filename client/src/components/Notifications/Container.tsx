import React, { useContext } from 'react';
import { ToastContainer } from 'react-bootstrap';
import generate from 'utils/notification.util';
import Notification from 'components/Notifications/Component/Notification';
import { NotificationsContext } from 'components/Wrappers/Context';

function Notifications() {
  const { list, remove } = useContext(NotificationsContext);

  const notificationList = list.map((notification) => {
    const notificationObject = generate(notification.code, notification.message);

    const removeNotification = () => {
      remove(notification.code);
    };

    return (
      <Notification remove={removeNotification} key={notificationObject.code}>
        <Notification.Title>{notificationObject.title}</Notification.Title>
        <Notification.Body>{notificationObject.body}</Notification.Body>
      </Notification>
    );
  });

  return (
    <ToastContainer position="top-end" id="toaster">
      {notificationList}
    </ToastContainer>
  );
}

export default Notifications;
