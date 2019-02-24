import { handleError } from '../api';

export async function fetchMinersStat(client, filter) {
    try {
        const { data } = await client.get(`/api/v0.1/miners/stat?filter=${filter}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}
