import { useState, useEffect } from 'react';
import { fillArray, shuffleAndConcat, charactersList } from '../../services/services';
import { LoginForm } from '../LoginForm/LoginForm';
import { Result } from '../Result/Result';
import { Timer } from '../Timer/Timer';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeTypeGame } from '../../redux/actions/actionGame';


export const Game = () => {

    const [openedCard, setOpenedCard] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [size, setSize] = useState(6);
    const [listOfCharacters, setListOfCharacters] = useState<{ id: number, url: string }[]>([]);
    const [show, setShow] = useState(true);
    const [userScore, setUserScore] = useState(0);
    const [resultShow, setResultShow] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [user, setUser] = useState<{ userName: string, game: string }>({ userName: '', game: '' });
    const dispatch = useDispatch();

    function flipCard(index: number) {
        setOpenedCard((opened: any) => [...opened, index]);
    }

    useEffect(() => {
        if (listOfCharacters.length === 0) {
            let chartersIds = shuffleAndConcat(fillArray(size));
            setListOfCharacters(charactersList(chartersIds));
        } else { return; }
    }, [size, listOfCharacters])

    useEffect(() => {
        if (size === matched.length) {
            setStartTimer(!startTimer);
            updateScore();
            setTimeout(() => {
                setResultShow(!resultShow);
                setUserScore(0);
                setMatched([]);
                setListOfCharacters([]);
            }, 1000);
        }
    }, [matched])

    useEffect(() => {
        if (seconds === 0 && minutes === 0) {
            updateScore();
            setTimeout(() => {
                setResultShow(!resultShow);
                setUserScore(0);
                setMatched([]);
                setListOfCharacters([]);
            }, 1000);
        }
    }, [seconds, minutes])

    useEffect(() => {
        if (openedCard.length < 2) return;

        const firstMatched = listOfCharacters[openedCard[0]];
        const secondMatched = listOfCharacters[openedCard[1]];

        if (secondMatched && firstMatched.id === secondMatched.id && matched.indexOf(firstMatched.id) === -1) {
            setUserScore(userScore + 10);
            setMatched([...matched, firstMatched.id]);
        }

        if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);

    }, [openedCard]);

    const handleClickSubmit = (show: boolean) => {
        setShow(show);
        setMinutes(1);
        setSeconds(0);
        setStartTimer(!startTimer);
    }

    const changeForm = (resultShow: boolean) => {
        setResultShow(resultShow);
        setShow(!show);
    }

    const closeForm = (resultShow: boolean) => {
        setResultShow(resultShow);
        setMinutes(1);
        setSeconds(0);
        setStartTimer(!startTimer);
    }

    const handleStart = (start: boolean) => {
        setStartTimer(start);
    }

    const changeGame = (gameType: number) => {
        setSize(gameType);
        setMatched([]);
        setListOfCharacters([]);
    }

    const createObject = (userName: string, game: string) => {
        setUser({ userName, game });
    }

    const updateScore = () => {
        axios.put(`https://starwars-memorygame-server.herokuapp.com/api/updateScore`, {
            userName: user.userName,
            score: userScore,
            game: user.game
        }).then(res => {
            dispatch(changeTypeGame(''));
            console.log(res.data);
            setTimeout(() => {
                dispatch(changeTypeGame(user.game))
            }, 1000);
        })
    }

    return (
        <div className="App">
            <LoginForm show={show} handleClick={(show: boolean) => handleClickSubmit(show)} selectGame={(game: number) => changeGame(game)} user={(userName: string, game: string) => createObject(userName, game)} />
            <Result show={resultShow} changeForm={(resultShow: boolean) => changeForm(resultShow)} closeForm={(resultShow: boolean) => closeForm(resultShow)} user={user} />
            <Timer start={startTimer} minutes={minutes} seconds={seconds} handleStart={(start: boolean) => handleStart(start)} setMinutes={(min: number) => setMinutes(min)} setSeconds={(sec: number) => setSeconds(sec)} />
            <div className="cards">
                {listOfCharacters.map((character, index) => {
                    //lets flip the card

                    let isFlipped = false;

                    if (openedCard.includes(index)) isFlipped = true;
                    if (matched.includes(character.id)) isFlipped = true;
                    return (
                        <div
                            className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
                            key={index}
                            onClick={() => flipCard(index)}
                        >
                            <div className="inner">
                                <div className="front">
                                    <img
                                        src={character.url}
                                        alt="Swar Wars Character"
                                        onError={(e: any) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; e.target.onError = null; }}
                                        width="70%"
                                    />
                                </div>
                                <div className="back"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}