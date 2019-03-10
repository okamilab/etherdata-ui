import { handleError } from '../api';

export async function fetchTokensUsage(client, filter) {
    try {
        const { data } = await client.get(`/api/v0.1/tokens/usage?filter=${filter}`);
        return data || [];
    } catch (error) {
        handleError(error);
    }
}
