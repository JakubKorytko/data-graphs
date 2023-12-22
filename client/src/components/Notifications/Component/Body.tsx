import React from 'react';
import { Toast } from 'react-bootstrap';
import { NotificationBodyProps } from 'components/Notifications/Component/Body.type';

function Body(props: NotificationBodyProps) {
  const { children } = props;

  return (<Toast.Body>{children}</Toast.Body>);
}

export default Body;
