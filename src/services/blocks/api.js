import { handleError } from '../api';

export async function fetchBlocksStat(client, filter) {
    try {
        const { data } = await client.get(`/api/v0.1/blocks/stat?filter=${filter}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}
