export interface Data {
  count: number;
  next: string | null;
  previous: string | null;
  results: Results[];
}

export interface Results {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface AppState {
  dataOfPeople: Data;
  loading: boolean;
  errorHandler: boolean;
}

export interface personData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PeopleInfo {
  name: string;
  birthYear: string;
  gender: string;
  height: string;
}
