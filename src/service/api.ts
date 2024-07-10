async function fetchDataOfPeopleApi(
  searchParam: string = "",
  page: number = 1,
) {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${searchParam}&page=${page}`,
  );
  const data = await response.json();

  return data;
}

export default fetchDataOfPeopleApi;
