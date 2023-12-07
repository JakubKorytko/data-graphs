import { NotificationTitleProps } from "../../../types/props";
import { useState, useEffect } from "react";
import generateTime from '../../../utils/timeString.util';
import { Toast } from "react-bootstrap";

const Title = (props: NotificationTitleProps) => {

    let launchedTime: number;
  
    const [time, setTime] = useState('');
  
    useEffect(() => {
      launchedTime = Date.now();
      const updateTime = setInterval(() => {setTime(generateTime(launchedTime))}, 1000);
      return () => clearInterval(updateTime);
    }, []);
  
    return (
      <Toast.Header>
        <strong className="me-auto">{props.children}</strong>
        <small>{time}</small>
      </Toast.Header>
    );
  };

export default Title;