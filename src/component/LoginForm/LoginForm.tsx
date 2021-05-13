import React, { useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { SelectGame } from './SelectTypeGame';
import { useDispatch } from 'react-redux';
import { changeTypeGame } from '../../redux/actions/actionGame';

interface Props {
    show: boolean,
    handleClick: (value: boolean) => void,
    selectGame: (game: number) => void,
    user: (userName: string, game: string) => void
}

export const LoginForm = ({ show, handleClick, selectGame, user }: Props) => {
    const [userName, setUserName] = useState('');
    const [game, setGame] = useState(6);
    let gameName = (game === 6) ? ("Easy") : (game === 8) ? ("Medium") : ("Difficult");
    const dispatch = useDispatch();

    const update = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUserName(event.target.value);
    }

    const sendUserName = () => {
        axios.get(`https://starwars-memorygame-server.herokuapp.com/api/user/${userName}/${gameName}`)
            .then(res => {
                if (res.data.length === 0) {
                    axios.post('https://starwars-memorygame-server.herokuapp.com/api/login', {
                        userName: userName,
                        score: 0,
                        game: gameName
                    }).then(res => {
                        console.log(res.data);
                    })
                }
            })
    }

    const submit = (event: React.ChangeEvent<HTMLFormElement>): void => {
        event.preventDefault();
        sendUserName();
        handleClick(!show);
        selectGame(game);
        user(userName, gameName);
        dispatch(changeTypeGame(gameName));
        const customHistory = createBrowserHistory();
        customHistory.go(1);
    }

    const changeGame = (gameType: number) => {
        setGame(gameType);
    }

    return (
        <div>
            <Modal show={show} centered>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form onSubmit={submit}>
                                <Form.Label className='h2 mb-3 d-flex justify-content-center'>Enter your user name:</Form.Label>
                                <Form.Group>
                                    <Form.Control size='lg' name='userName' required onChange={update} placeholder="Your user name..." />
                                </Form.Group>
                                <Form.Group>
                                    <SelectGame setGame={(game: number) => changeGame(game)} />
                                </Form.Group>
                                <Form.Group>
                                    <Button className='btn-block mb-3' size='lg' variant="primary" type="submit">
                                        Play!!!
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
}