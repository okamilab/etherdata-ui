import { handleError } from '../api';

export async function fetchTokensUsage(client, filter) {
    try {
        const { data } = await client.get(`/api/v0.1/tokens/usage?filter=${filter}`);
        return data || [];
    } catch (error) {
        handleError(error);
    }
}

export async function fetchErc721Stat(client) {
    try {
        const { data } = await client.get(`/api/v0.1/tokens/erc721/stat`);
        return data || [];
    } catch (error) {
        handleError(error);
    }
}

export async function fetchErc721Usage(client) {
    try {
        const { data } = await client.get(`/api/v0.1/tokens/erc721/usage`);
        return data || [];
    } catch (error) {
        handleError(error);
    }
}