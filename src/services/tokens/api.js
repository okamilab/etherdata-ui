import { handleError } from '../api';

export async function fetchTokensUsage(client) {
    try {
        const { data } = await client.get('/api/v0.1/tokens/usage30');
        return data;
    } catch (error) {
        handleError(error);
    }
}