export type Archive = {
    files: string[];
    read(filePath: string): Uint8Array | undefined;
};
