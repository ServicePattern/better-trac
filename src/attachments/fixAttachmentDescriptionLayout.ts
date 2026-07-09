/**
 * When attachment preview is big it shrinks the description making it unreadable
 */
export function fixLayoutDescription(attachmentLinkEl: HTMLElement) {
    const currentComment = attachmentLinkEl.parentElement?.closest(`.change`)
    if (!currentComment) return

    const previewContainer = currentComment.querySelector<HTMLTableElement>('.changes')
    if (!previewContainer) return

    previewContainer.style.float = 'none'
}