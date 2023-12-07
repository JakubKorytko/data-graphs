import { useState, useEffect, useReducer } from 'react';
import { read } from './utils/api';
import AddChannelForm from './components/AddChannelForm';
import Table from './components/Table';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiData, CustomError } from "./utils/api.d";
import Notifications from './components/notifications/Notifications';
import { Background } from './components/Background';
import Chart from './components/Chart';

type State = { code: number, message: string }

const reducer = (notifications: State[], action: any): State[] => {
    console.log(action);
    switch (action.type) {
        case "add":
            const exists = notifications.some((notification: State) => notification.code === action.object.code);
            if (exists) return notifications;

            return [...notifications, action.object];
        case "remove":
            const filtered = notifications.filter((notification: State) => {
                return notification.code !== action.object.code
            });
            return filtered;
        case "clear":
            return [];
        default:
            return notifications;
    }
}

export default function App() {

    const [data, setData] = useState<ApiData | false>(false);
    const [notifications, dispatch] = useReducer(reducer, []);

    let removeTimeouts: number[] = [];
    let delayedTimeouts: number[] = [];
    let isFetching = false;

    const fetchData = () => {
        if (isFetching) return;

        isFetching = true;
        read().then((res) => {
            if (res.type == 'error') reconnectLoop(res as CustomError)
            else {
                const data = res as ApiData;
                setData({...data, chartColors: chartColors(data.channels.data.length)});

                notify({ code: 200, message: "Connection established" }, 5);

                isFetching = false;
            }
        });
    }

    const reconnectLoop = (error: CustomError) => {
        notify(error, 10);

        delayedTimeouts[error.code] && clearTimeout(delayedTimeouts[error.code]);
        delayedTimeouts[error.code] = setTimeout(() => {

            notify({ code: 1, message: "Connection retry" }, 5);
            isFetching = false;
            fetchData()

        }, 10000);
    }

    const random = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
    const randomColor = (alpha: number) => {
    return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, ${alpha})`;
    }

    const chartColors = (length: number) => {
        return [...Array(length).keys()].map(val => randomColor(1));
    }

    const notify = (object: { code: number, message: string }, seconds: number) => {
        if (object.code === 500 || object.code === 200) dispatch({ type: "remove", object: { code: 1 } })
        if (object.code === 200) dispatch({ type: "remove", object: { code: 500 } });

        dispatch({ type: "add", object: object });

        removeTimeouts[object.code] && clearTimeout(removeTimeouts[object.code]);
        removeTimeouts[object.code] = setTimeout(() => { dispatch({ type: "remove", object: object }) }, seconds * 1000);
    }

    useEffect(() => {
        fetchData();

        return () => {
            dispatch({ type: "clear" });
            [1, 200, 500, 409].forEach((timeout) => {
                clearTimeout(removeTimeouts[timeout]);
            })
        }
    }, []);

    const Table_props = {
        enabled: data !== false,
        categories: data ? data.columns : false,
        rows: data ? data.channels.data : false,
        colors: data ? data.chartColors : false
    }

    const full_center = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const AddChannelForm_props: {
        reconnect: any,
        notify: any,
        enabled: boolean,
        fetchData: any,
        columns_properties: false | ApiData["columns_properties"]
    } = {
        reconnect: reconnectLoop,
        notify: notify,
        enabled: data !== false,
        fetchData: fetchData,
        columns_properties: data ? data.columns_properties : false
    }

    return (
        <Container className="App">
            <Background />
            <div style={{ ...full_center, marginBottom: "15px" }}>
                <h1>Statystyki kanałów</h1>
            </div>
            <Row style={{ justifyContent: "center" }}>
                <Col style={{ ...full_center, paddingTop: "10px", width: "350px", height: "350px", marginBottom: "80px" }}>
                    <Chart data={data ? data.channels.data : false} colors={data ? data.chartColors : false} />
                </Col></Row>
            <Row>
                <Col>
                <Table {...Table_props}>
                    <AddChannelForm {...AddChannelForm_props} />
                </Table>
                </Col>
            </Row>
            <Notifications remove={(code: number) => {dispatch({type: "remove", object: { code: code }}) }} list={notifications} />
        </Container>
    )
}