import { createLayoutFromString } from "../utils/domUtils";

export function pasteImagePreview(attachmentLinkEl: HTMLAnchorElement, attachmentUrl: string) {
    const imageEl = createLayoutFromString(
        `<img
            style="
                max-height: 400px;
                max-width: 100%;
                display: block;
            "
            src="${attachmentUrl}"
        />`
    )

    attachmentLinkEl.parentElement?.insertBefore(imageEl, attachmentLinkEl)
    console.log('Better trac: image added', imageEl);
}
