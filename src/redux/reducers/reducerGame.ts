import { Action } from '../actions/actionGame';
import { ActionTypes } from '../actions/actionsType';

export interface StateInterface {
    game: string;
}

const initialState: StateInterface = {
    game: 'Easy'
}

export const reducerGame = (state = initialState, action: Action) => {
    switch (action.type) {
        case (ActionTypes.changeTypeGame): {
            return { ...state, game: action.payload }
        }
        default:
            return state;
    }
}