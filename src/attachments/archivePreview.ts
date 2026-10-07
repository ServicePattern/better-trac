import { addStyle, createLayoutFromString } from "../utils/domUtils";
import { getMimeByExtension } from "../utils/mime";
import type { Archive } from "../utils/archive";
import { openInBrowser } from "../utils/zip";
import { pasteVideoPreview } from "./videoPreview";

const MB_10 = 10 * 1024 * 1024;

export async function pasteArchivePreview(
    attachmentLinkEl: HTMLAnchorElement,
    attachmentUrl: string,
    contentLength: number | undefined,
    openArchive: (buffer: Uint8Array) => Promise<Archive>
) {
    addStyle('better-trac-zip', `
        .better-trac-zip {
            max-height: 400px;
            border: 1px solid #ccc;
            width: 100%;
            padding: 4px;
            overflow: auto;
            display: flex;
            flex-direction: column;
            gap: 4px;
            cursor: pointer;
        }
    `)

    // https://trac.brightpattern.com/ticket/30659
    if (contentLength === undefined || contentLength < MB_10) {
        await renderArchiveTree(attachmentLinkEl, attachmentUrl, openArchive);
        return;
    }

    const btnEl = createLayoutFromString(`
        <button class="better-trac-zip">
            Load and unzip (${(contentLength / 1024 / 1024).toFixed(1)} MB)
        </button>
    `)

    btnEl.addEventListener('click', async () => {
        btnEl.textContent = 'Loading…';
        (btnEl as HTMLButtonElement).disabled = true;
        try {
            await renderArchiveTree(attachmentLinkEl, attachmentUrl, openArchive);
            btnEl.remove();
        } catch {
            btnEl.textContent = 'Failed to load';
        }
    });

    attachmentLinkEl.parentElement?.insertBefore(btnEl, attachmentLinkEl);
}

async function renderArchiveTree(
    attachmentLinkEl: HTMLAnchorElement,
    attachmentUrl: string,
    openArchive: (buffer: Uint8Array) => Promise<Archive>
) {
    const res = await fetch(attachmentUrl);
    const buffer = new Uint8Array(await res.arrayBuffer());
    const archive = await openArchive(buffer);

    if (pasteSingleVideoPreview(attachmentLinkEl, archive)) {
        return
    }

    addStyle('better-trac-zip-file', `
        .better-trac-zip-file {
            padding: 4px;
            border-radius: 4px;
            background: #f0f0f0;
            cursor: pointer;
        }
        .better-trac-zip-file:hover {
            background: #e0e0e0;
        }
    `)

    const archiveTreeEl = createLayoutFromString(`<div class="better-trac-zip"></div>`)

    archive.files.map(filePath => {
        const fileEl = createLayoutFromString(`
            <div class="better-trac-zip-file">
                ${filePath}
            </div>
        `)

        fileEl.addEventListener('click', async () => {
            const fileContentBuffer = archive.read(filePath);

            if (!fileContentBuffer) {
                return
            }

            // we cannot know mime-type of files inside zip: https://trac.brightpattern.com/ticket/46812
            const mimeFromExtension = getMimeByExtension(filePath)
            openInBrowser(fileContentBuffer, mimeFromExtension);
        });

        archiveTreeEl.appendChild(fileEl)
    })

    attachmentLinkEl.parentElement?.insertBefore(archiveTreeEl, attachmentLinkEl)
}

/**
 * Archive with just one video inside: show the video player instead of the file list
 */
function pasteSingleVideoPreview(attachmentLinkEl: HTMLAnchorElement, archive: Archive): boolean {
    const [filePath, ...otherFiles] = archive.files
    const mime = filePath && getMimeByExtension(filePath)

    if (otherFiles.length > 0 || !mime?.startsWith('video/')) {
        return false
    }

    const data = archive.read(filePath)

    if (!data) {
        return false
    }

    const videoUrl = URL.createObjectURL(new Blob([data as BlobPart], { type: mime }))
    pasteVideoPreview(attachmentLinkEl, videoUrl)
    return true
}
