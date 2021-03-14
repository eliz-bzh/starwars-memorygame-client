import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

interface Props {
    setGame: (game: number) => void
}

export const SelectGame = ({ setGame }: Props) => {

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState(6);
    const games = [
        { name: "Easy", value: 6 },
        { name: "Medium", value: 8 },
        { name: "Difficult", value: 12 }
    ];

    return (
        <ToggleButtonGroup className='d-flex justify-content-center align-items-center' type="radio" name="options" defaultValue={1}>
            {games.map((game, index) => (
                <ToggleButton
                    key={index}
                    name={game.name}
                    value={game.value}
                    checked={radioValue === game.value}
                    onChange={e => {
                        setRadioValue(game.value);
                        setGame(game.value);
                    }}
                >
                    {game.name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}