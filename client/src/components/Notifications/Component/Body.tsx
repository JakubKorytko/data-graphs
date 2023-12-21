import { NotificationBodyProps } from "./Body.type";
import { Toast } from "react-bootstrap";

const Body = (props: NotificationBodyProps) => {
    return (<Toast.Body>{props.children}</Toast.Body>);
};

export default Body;
