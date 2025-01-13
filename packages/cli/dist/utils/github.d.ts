interface DownloadOptions {
    owner: string;
    repo: string;
    path: string;
    destination: string;
}
export declare function downloadFile({ owner, repo, path, destination }: DownloadOptions): Promise<void>;
export {};
