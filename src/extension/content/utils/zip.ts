import { Unzip } from "fflate";

/**
 * Lists all files in a ZIP archive
 */
export async function listZip(buffer: Uint8Array): Promise<string[]> {
    return new Promise(resolve => {
        const names: string[] = [];
        const unzip = new Unzip();

        unzip.onfile = (file) => {
            const isDirectory = file.name.endsWith("/")
            if (isDirectory) {
                return
            }
            names.push(file.name);
        };

        unzip.push(buffer, true);
        resolve(names);
    });
}

/**
 * Opens data in a new browser tab
 */
export function openInBrowser(data: Uint8Array, mime = "text/plain") {
    const blob = new Blob([data as any], { type: mime });
    const url = URL.createObjectURL(blob);

    if (mime.startsWith("audio/")) {
        const html = `<!DOCTYPE html><html><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh"><audio controls autoplay src="${url}"></audio></body></html>`;
        const htmlBlob = new Blob([html], { type: "text/html" });
        window.open(URL.createObjectURL(htmlBlob), "_blank");
        return;
    }

    window.open(url, "_blank");
}