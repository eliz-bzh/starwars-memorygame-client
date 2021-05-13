import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Static = () => {

    const [usersGame, setUserGame] = useState<any[]>([]);
    const gameType: string = useSelector((state: any) => state.reducerGame.game);

    const getUserOfGame = () => {
        axios.get(`https://starwars-memorygame-server.herokuapp.com/api/getAll/${gameType}`)
            .then(res => {
                const data = res.data.sort((a: any, b: any) => (a.score <= b.score) ? 1 : -1);
                setUserGame(data);
            })
    }

    useEffect(() => {
        getUserOfGame();
    }, []);

    useEffect(() => {
        getUserOfGame();
    }, [gameType]);

    return (
        <div className='static-window'>
            <b>Static players of {gameType} game</b>
            <table className='mt-2'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: '80%' }}>User name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {usersGame && usersGame.map((user, index) =>
                        <tr style={(index === 0) ? { color: 'red', fontWeight: 'bold' } : {}} key={index}>
                            <th>{index + 1}</th>
                            <td style={{ width: '80%' }}>{user.userName}</td>
                            <td>{user.score}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}