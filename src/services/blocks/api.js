import { handleError } from '../api';

export async function fetchBlocksStat(client) {
    try {
        const { data } = await client.get('/api/v0.1/blocks/stat30');
        return data;
    } catch (error) {
        handleError(error);
    }
}
