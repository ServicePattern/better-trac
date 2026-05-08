import { addStyle, createLayoutFromString } from "../utils/domUtils";
import { openInBrowser } from "../utils/zip";

export function pasteHarPreview(attachmentLinkEl: HTMLAnchorElement, attachmentUrl: string) {
    addStyle('better-trac-har', `
        .better-trac-har {
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

    const harLinkEl = createLayoutFromString(`
        <div class="better-trac-har">
            Open .HAR
        </div>
    `)

    harLinkEl.addEventListener('click', async () => {
        const res = await fetch(attachmentUrl);
        const fileContentBuffer = new Uint8Array(await res.arrayBuffer());
        openInBrowser(fileContentBuffer);
    });

    attachmentLinkEl.parentElement?.insertBefore(harLinkEl, attachmentLinkEl)
}
