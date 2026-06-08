import { addStyle, createLayoutFromString } from "../utils/domUtils";

export function pasteMDPreview(
    attachmentLinkEl: HTMLAnchorElement,
    attachmentUrl: string,
    openMdPreview: (markdown: string) => void | Promise<unknown>,
) {
    addStyle('better-trac-md', `
        .better-trac-md {
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

    const mdLinkEl = createLayoutFromString(`
        <div class="better-trac-md">
            Preview .MD
        </div>
    `)

    mdLinkEl.addEventListener('click', async () => {
        const res = await fetch(attachmentUrl);
        const text = await res.text();

        await openMdPreview(text);
    });

    attachmentLinkEl.parentElement?.insertBefore(mdLinkEl, attachmentLinkEl)
}
