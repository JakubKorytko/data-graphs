import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './components/Chart/Chart';
import TableContainer from './components/Table/TableContainer';
import NotificationsWrapper from './components/Wrappers/NotificationsWrapper';
import style from './styles/App.style';
import Loader from './components/Wrappers/Loader';

export default function App() {

    return (
        <Container className="App">
            <div style={style.background}></div>
            <NotificationsWrapper>
                <Loader>
                        <div style={style.div}>
                            <h1>Statystyki kanałów</h1>
                        </div>
                        <Row style={style.row}>
                            <Col style={style.col}>
                                <Chart />
                            </Col>
                        </Row>
                        <TableContainer />
                </Loader>
            </NotificationsWrapper>
        </Container>
    )
}