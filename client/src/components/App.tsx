import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import Chart from 'components/Chart/Chart';

import TableContainer from 'components/Table/TableContainer';

import NotificationsWrapper from 'components/Wrappers/NotificationsWrapper';
import Loader from 'components/Wrappers/Loader';

import style from 'components/App.style';

import 'bootstrap/dist/css/bootstrap.min.css';

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
