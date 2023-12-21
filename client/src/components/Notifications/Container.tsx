import { useContext } from 'react';
import Notification from './Component/Notification';
import { Row, Col, ToastContainer } from 'react-bootstrap';
import { NotificationsContext } from '../Wrappers/Context';
import { generate } from '../../utils/notification.util';

const Notifications = () => {

    const { list, remove } = useContext(NotificationsContext);

    return (
        <ToastContainer position="top-end" id="toaster">
            {list.map((notification) => {

                const notificationObject = generate(notification.code, notification.message);

                return (<Notification remove={remove.bind(null, notification.code)} key={notificationObject.code}>
                    <Notification.Title>{notificationObject.title}</Notification.Title>
                    <Notification.Body>{notificationObject.body}</Notification.Body>
                </Notification>)
            })}
        </ToastContainer>
    )

}

export default Notifications;
