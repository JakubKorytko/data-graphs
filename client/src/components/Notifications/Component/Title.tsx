import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

import { NotificationTitleProps } from 'components/Notifications/Component/Title.type';

import generateTime from 'utils/timeString.util';

function Title(props: NotificationTitleProps) {
  let launchedTime: number;

  const [time, setTime] = useState('');

  useEffect(() => {
    launchedTime = Date.now();
    const updateTime = setInterval(() => {
      setTime(generateTime(launchedTime));
    }, 1000);
    return () => clearInterval(updateTime);
  }, []);

  const { children } = props;

  return (
    <Toast.Header>
      <strong className="me-auto">{children}</strong>
      <small>{time}</small>
    </Toast.Header>
  );
}

export default Title;
