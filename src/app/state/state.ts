export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

export interface State {
  favorites: ICharacter[];
}

export const initialState: State = {
  favorites: [],
};
