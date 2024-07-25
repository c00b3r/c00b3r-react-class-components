import { LoaderFunctionArgs } from "react-router-dom";
import { starWarsApi } from "../../store/thunks/starWarsApi";
import store from "../../store/store";

export async function loader({ params }: LoaderFunctionArgs) {
  const result = await store.dispatch(
    starWarsApi.endpoints.getPersonInformation.initiate({
      idOfPerson: params.id,
    }),
  );
  return result.data;
}
