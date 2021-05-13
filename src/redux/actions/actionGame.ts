import { ActionTypes as CONSTANTS } from './actionsType';

export interface Action {
    type: CONSTANTS;
    payload: string;
}

export const changeTypeGame = (game: string) => ({
    type: CONSTANTS.changeTypeGame,
    payload: game
});