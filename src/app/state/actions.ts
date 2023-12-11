import { createActionGroup, props } from '@ngrx/store';
import { ICharacter } from './state';

export const favoriteActions = createActionGroup({
  source: 'favorite',
  events: {
    addCharacter: props<{ character: ICharacter }>(),
    removeCharacter: props<{ characterId: number }>(),
    setDefault: props<{ characters: ICharacter[] }>(),
  },
});
