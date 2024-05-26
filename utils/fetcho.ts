import { FetchoParams } from "../types";

const fetcho = async ({
  url,
  method = "GET",
  body,
  isCors = false,
}: FetchoParams): Promise<Record<string, unknown> | false> => {
  try {
    const config: any = {
      method,
      credentials: "include",
      cors: isCors ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (response.status === 500) {
      console.log(response);
      throw new Error(
        `La respuesta no es correcta, el status es ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      `Ocurrió un error realizando un fetch, donde la url era ${url} y el error fue ${error.message}`
    );
    return false;
  }
};

export default fetcho;
