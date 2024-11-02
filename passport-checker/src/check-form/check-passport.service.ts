import { TPassportStatusResponse } from "./types";

const API_ENDPOINT = 'https://info.midpass.ru/api/request';

export async function getPassportStatus(requestCode: string): Promise<TPassportStatusResponse> {
  const response = await fetch(`${API_ENDPOINT}/${requestCode}`);
  if (!response.ok) throw Error();
  return await response.json();
}