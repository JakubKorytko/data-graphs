import { useContext } from 'react';
import Notification from './Component/Notification';
import { Row, Col, ToastContainer } from 'react-bootstrap';
import { NotificationsProps } from '../../types/props';
import { NotificationsContext } from '../Wrappers/Context';
import { generate } from '../../utils/notification.util';

const Notifications = (props: NotificationsProps) => {

    const { list, remove } = useContext(NotificationsContext);

    return (
        <Row><Col>
            <ToastContainer position="top-end">
                {list.map((notification) => {
                    
                    const notificationObject = generate(notification.code, notification.message);

                    return (<Notification remove={remove.bind(null, notification.code)} key={notificationObject.code}>
                        <Notification.Title>{notificationObject.title}</Notification.Title>
                        <Notification.Body>{notificationObject.body}</Notification.Body>
                    </Notification>)
                })}
            </ToastContainer>
        </Col></Row>
    )

}

export default Notifications;