import { LoaderFunctionArgs } from "react-router-dom";
import { fetchDataOfPersonApi } from "../../service/api";

export async function loader({ params }: LoaderFunctionArgs) {
  const result = await fetchDataOfPersonApi(params.id);
  return result;
}
