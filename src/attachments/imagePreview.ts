import { createLayoutFromString } from "../utils/domUtils";

export function pasteImagePreview(attachmentLinkEl: HTMLAnchorElement, attachmentUrl: string) {
    if (isInDescriptionOrComments(attachmentUrl)) {
        return
    }

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


/**
 * Dont paste preview if the image is already used in ticket description or in a comment
 * Both comment and description example https://trac.brightpattern.com/ticket/47053
*/
function isInDescriptionOrComments(attachmentUrl: string) {
    const ticketbox = document.getElementById('ticketbox')

    const isInDescription = Array.from(ticketbox?.querySelectorAll('img') || [])
        .find(img => img.src === attachmentUrl)

    if (isInDescription) {
        return false
    }

    const changelog = document.getElementById('changelog')

    const isInComments = Array.from(changelog?.querySelectorAll('img') || [])
        .find(img => img.src === attachmentUrl)

    return isInComments
}