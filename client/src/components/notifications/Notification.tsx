import { Toast } from "react-bootstrap";
import { useState, useEffect } from "react";

const Title = (props: { children: React.ReactNode }) => {
  let launchedTime: number;

  const [time, setTime] = useState('');

  const timeToString = (timeInMs: number): string => {
    if (timeInMs < 1000) return 'less than a second ago';
    if (timeInMs < 60000) return `${Math.floor(timeInMs / 1000)} seconds ago`;
    if (timeInMs < 3600000) return `${Math.floor(timeInMs / 60000)} minutes ago`;
    if (timeInMs < 86400000) return `${Math.floor(timeInMs / 3600000)} hours ago`;
    return 'more than a day ago';
  }

  const generateTime = () => {
    const diff = Date.now() - launchedTime;
    const timeString = timeToString(diff);
    setTime(timeString);
  }

  useEffect(() => {
    const updateTime = setInterval(generateTime, 1000);
    launchedTime = Date.now();
    return () => clearInterval(updateTime);
  }, []);

  return (
    <Toast.Header>
      <strong className="me-auto">{props.children}</strong>
      <small>{time}</small>
    </Toast.Header>
  );
};

const Body = (props: { children: React.ReactNode }) => {
  return (<Toast.Body>{props.children}</Toast.Body>);
};


const Notification = (props: { children: React.ReactNode, remove: Function }) => {
  const [show, setShow] = useState(true);

  return (
    <Toast onClose={() => {props.remove(); setShow(false)}} show={show}>
      {props.children}
    </Toast>
  );
};

Notification.Body = Body;
Notification.Title = Title;

export default Notification;