import axios from 'axios';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';

interface Props {
    show: boolean,
    changeForm: (value: boolean) => void,
    closeForm: (value: boolean) => void,
    user: { userName: string, game: string }
}

export const Result = ({ show, changeForm, closeForm, user }: Props) => {

    const [score, setScore] = useState(0);


    useEffect(() => {
        if (show) {
            axios.get(`https://starwars-memorygame-server.herokuapp.com/api/user/${user.userName}/${user.game}`)
                .then(res => {
                    setScore(Number.parseInt(JSON.stringify(res.data[0].score)));
                })
        }
    }, [show, user])

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        closeForm(!show);
    }

    const change = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        changeForm(!show);
    }

    return (
        <div>
            <Modal show={show} centered>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Label className='h1 mb-3 d-flex justify-content-center'>The end!!!</Form.Label>
                            <Form.Label className='h2 mb-3 d-flex justify-content-center'>{user.userName} your score: {score}</Form.Label>
                            <Form.Group>
                                <Button className='btn-block mb-3' size='lg' variant="primary" onClick={handleClick}>
                                    Play Again!!!
                                </Button>
                                <Button className='btn-block mb-3' size='lg' variant="primary" onClick={change}>
                                    New user!!!
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}