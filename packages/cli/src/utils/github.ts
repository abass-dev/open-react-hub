import fetch from 'node-fetch';
import fs from 'fs-extra';

interface DownloadOptions {
  owner: string;
  repo: string;
  path: string;
  destination: string;
}

export async function downloadFile({ owner, repo, path, destination }: DownloadOptions): Promise<void> {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const content = await response.text();
    await fs.writeFile(destination, content, 'utf8');
  } catch (error) {
    throw new Error(`Error downloading file from GitHub: ${error.message}`);
  }
}

