import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data, personData } from "../../interface";
import "immer";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<Data, { searchParam?: string; page?: number }>({
      query: ({ searchParam = "", page = 1 }) => ({
        url: `people/?search=${searchParam}&page=${page}`,
      }),
    }),
    getPersonInformation: builder.query<
      personData,
      { idOfPerson: string | undefined }
    >({
      query: ({ idOfPerson }) => ({
        url: `https://swapi.dev/api/people/${idOfPerson}`,
      }),
    }),
  }),
});
