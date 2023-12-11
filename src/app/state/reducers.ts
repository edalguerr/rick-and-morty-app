import { createReducer, on } from '@ngrx/store';
import { State, initialState } from './state';
import { favoriteActions } from './actions';

export const favoritesReducer = createReducer(
  initialState.favorites,
  on(favoriteActions.addCharacter, (favorites, { character }) => {
    const index = favorites.findIndex((value) => value.id === character.id);
    if (index > 0) return favorites;

    return [...favorites, character];
  }),
  on(favoriteActions.removeCharacter, (favorites, { characterId }) =>
    favorites.filter((value) => value.id !== characterId)
  ),
  on(favoriteActions.setDefault, (favorites, { characters }) => [...characters])
);
