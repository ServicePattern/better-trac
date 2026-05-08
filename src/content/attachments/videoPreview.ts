import { createLayoutFromString } from "../utils/domUtils";

export function pasteVideoPreview(attachmentLinkEl: HTMLAnchorElement, attachmentUrl: string) {
    const videoEl = createLayoutFromString(
        `<video
            style="
                height: 400px;
                width: 100%;
            "
            controls
            src="${attachmentUrl}"
        />`
    )

    attachmentLinkEl.parentElement?.insertBefore(videoEl, attachmentLinkEl)
    console.log('Better trac: video added', videoEl);
}
