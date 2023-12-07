import { useState, useEffect } from 'react';
import Notification from './Notification';
import { Row, Col, ToastContainer } from 'react-bootstrap';
import { NotificationsProps } from '../../types/props';

interface NotificationInterface {
    code: number;
    title: string;
    body: string;
}


const Notifications = (props: NotificationsProps) => {

    const generate = (code: number, message: string) => {

        const notification: NotificationInterface = {
            code: code ?? 0,
            title: `${message}`,
            body: 'Nieoczekiwany błąd. Skontaktuj się z administratorem.'
        }

        if (code === 1) notification.body = 'Ponowna próba połączenia z serwerem...';
        if (code === 500) notification.body = 'Nie można połączyć się z serwerem. Spróbuj ponownie później lub skontaktuj się z administratorem. Ponowna próba połączenia nastąpi za 10 sekund.';
        if (code === 200) notification.body = 'Połączenie z serwerem zostało nawiązane.';
        if (code === 409) notification.body = "Kanał z podaną nazwą już istnieje."
        
        return notification;
    }

    return (
        <Row><Col>
            <ToastContainer position="bottom-end">
                {props.list.map((notification) => {
                    
                    const notificationObject = generate(notification.code, notification.message);

                    return (<Notification remove={props.remove.bind(null, notification.code)} key={notificationObject.code}>
                        <Notification.Title>{notificationObject.title}</Notification.Title>
                        <Notification.Body>{notificationObject.body}</Notification.Body>
                    </Notification>)
                })}
            </ToastContainer>
        </Col></Row>
    )

}

export default Notifications;