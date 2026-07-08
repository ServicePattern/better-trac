import { createRoot } from "react-dom/client";
import { addStyle, createLayoutFromString } from "../utils/domUtils";
import css from "./md/options.css?inline";
import { MdPreview } from "./md/MdPreview";

export function pasteMDPreview(
    attachmentLinkEl: HTMLAnchorElement,
    attachmentUrl: string,
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
        const tab = window.open('', '_blank');
        if (!tab) return;

        const res = await fetch(attachmentUrl);
        const text = await res.text();

        tab.document.title = "MD Preview";

        const style = tab.document.createElement("style");
        style.textContent = css;
        tab.document.head.appendChild(style);

        const container = tab.document.createElement("div");
        tab.document.body.appendChild(container);

        createRoot(container).render(<MdPreview text={text} />);
    });

    attachmentLinkEl.parentElement?.insertBefore(mdLinkEl, attachmentLinkEl)
}
