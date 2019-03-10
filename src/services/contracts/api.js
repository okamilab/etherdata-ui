import { handleError } from '../api';

export async function fetchContractsObsolescence(client) {
    try {
        const { data } = await client.get('/api/v0.1/contracts/obsolescence');
        return data || [];
    } catch (error) {
        handleError(error);
    }
}

export async function fetchContractsDeployments(client) {
    try {
        const { data } = await client.get('/api/v0.1/contracts/deployment');
        return data || [];
    } catch (error) {
        handleError(error);
    }
}
