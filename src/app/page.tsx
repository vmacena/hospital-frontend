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
                <div className={styles.sloganContainer}>
                    <div className={styles.sloganText}>
                        <h2 className={styles.slogan}>Cuidando de VOCÊ, a cada passo do SEU caminho</h2>
                        <p className={styles.sloganDescription}>Com paixão e dedicação!</p>
                    </div>
                    <div className={styles.sloganImage}>
                        <img src="doctor.png" alt="Hospital" />
                    </div>
                </div>
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