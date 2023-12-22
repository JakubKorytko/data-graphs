import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './Chart/Chart';
import TableContainer from './Table/TableContainer';
import NotificationsWrapper from './Wrappers/NotificationsWrapper';
import style from './App.style';
import Loader from './Wrappers/Loader';

export default function App() {
  return (
    <Container className="App">
      <div style={style.background} />
      <NotificationsWrapper>
        <Loader>
          <div style={style.div}>
            <h1>Channel statistics</h1>
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
  );
}
