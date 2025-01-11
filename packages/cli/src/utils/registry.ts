import fetch from 'node-fetch';

const REGISTRY_URL = 'https://raw.githubusercontent.com/abass-dev/open-react-hub/main/registry.json';

export async function getRegistry() {
  try {
    const response = await fetch(REGISTRY_URL);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch component registry');
  }
}