import { handleError } from '../api';

export async function fetchPublicKey(client, query) {
  try {
    const { data } = await client.get(`/api/v0.1/publickeys/lookup?q=${query}`);
    return data || {};
  } catch (error) {
    handleError(error);
  }
}