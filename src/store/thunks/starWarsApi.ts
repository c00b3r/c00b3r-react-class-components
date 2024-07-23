import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data } from "../../interface";
import "immer";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getAllPeople: builder.query<Data, void>({
      query: () => ({ url: "people/" }),
    }),
  }),
});
