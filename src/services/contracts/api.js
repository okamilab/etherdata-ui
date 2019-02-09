import { handleError } from '../api';

export async function fetchContractsObsolescence(client) {
    try {
        const { data } = await client.get('/api/v0.1/contracts/obsolescence');
        return data;
    } catch (error) {
        handleError(error);
    }
}
