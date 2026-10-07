import SevenZip from "7z-wasm/7zz.umd.js";
import type { Archive } from "./archive";

// wasm (1.6 MB) loads from CDN only when a .7z is shown
const WASM_URL = "https://cdn.jsdelivr.net/npm/7z-wasm@1.2.0/7zz.wasm";

/**
 * Lists a 7z archive without unpacking
 */
export async function open7z(buffer: Uint8Array): Promise<Archive> {
    let output: string[] = [];
    const sevenZip = await SevenZip({
        locateFile: () => WASM_URL,
        // no stdin: password-protected archives fail instead of waiting for input
        stdin: () => null as unknown as number,
        print: line => output.push(line),
        printErr: () => {},
    });

    sevenZip.FS.writeFile("/archive.7z", buffer);
    sevenZip.callMain(["l", "-slt", "/archive.7z"]);

    const entries = output.join("\n").split("\n----------\n")[1]?.split("\n\n") ?? [];
    const files = entries.flatMap(entry => {
        const path = entry.match(/^Path = (.*)$/m)?.[1];
        const isDirectory = /^Attributes = \S*D/m.test(entry);
        return path && !isDirectory ? [path] : [];
    });

    return {
        files,
        read: filePath => {
            sevenZip.callMain(["x", "/archive.7z", "-o/out", "-y", filePath]);
            const outPath = `/out/${filePath}`;
            const data = sevenZip.FS.readFile(outPath);
            sevenZip.FS.unlink(outPath);
            return data;
        },
    };
}
