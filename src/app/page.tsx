"use client";

import Topbar from '@/app/components/TopBar'; 
import Navbar from './components/NavBar';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUserMd, FaAmbulance, FaStethoscope } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import styles from './page.module.scss'; 

export default function Page() {
    return (
      <>
        <section className={styles.backgroundSection}>
          <Topbar />
          <Navbar />
        </section>
        <section className={styles.secondSection}>
          <Container>
            <Row>
              <Col md={4}>
                <Card className={styles.customCard}>
                  <Card.Body>
                    <FaUserMd className={styles.icon} /> 
                    <Card.Title>Profissionais Qualificados</Card.Title>
                    <Card.Text>texto aqui que nao sei</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={styles.customCard}>
                  <Card.Body>
                    <FaAmbulance className={styles.icon} /> 
                    <Card.Title>Atendimento 24h</Card.Title>
                    <Card.Text>texto aqui que nao sei</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className={styles.customCard}>
                  <Card.Body>
                    <FaStethoscope className={styles.icon} /> 
                    <Card.Title>Equipamentos Modernos</Card.Title>
                    <Card.Text>texto aqui que nao sei</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
}