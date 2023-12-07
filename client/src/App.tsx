import { useState, useEffect } from 'react';
import { read } from './utils/api';
import AddChannelForm from './components/AddChannelForm';
import Table from './components/Table';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiData } from "./utils/api.d";

export default function App() {

    const [data, setData] = useState<ApiData|false>(false);

    const fetchData = () => {
        read().then((res) => {
            setData(res);
        })
    }

    useEffect(fetchData, []);

    return (
        <Container className="App">
            <h1>{JSON.stringify(data)}</h1>
            <Row>
                <Col><Table categories={data ? data.columns : false} rows={data ? data.channels.data : false}/></Col>
            </Row>
            <Row>
                <Col><AddChannelForm columns_properties={data ? data.columns_properties : false} /></Col>
            </Row>
        </Container>
    )
}