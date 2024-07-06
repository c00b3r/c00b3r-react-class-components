export interface Data {
  count: number;
  next: string;
  previous: string | null;
  results: Results[];
}

export interface Results {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: [];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface AppState {
  dataOfPeople: Data;
  loading: boolean;
  errorHandler: boolean;
}
