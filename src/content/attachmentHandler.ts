import { fetchMimeType } from "./utils/network";
import { pasteHarPreview } from "./attachments/harPreview";
import { pasteMDPreview } from "./attachments/mdPreview";
import { pasteVideoPreview } from "./attachments/videoPreview";
import { pasteZipPreview } from "./attachments/zipPreview";
import { pasteImagePreview } from "./attachments/imagePreview";

const HANDLED_CLASS_NAME = 'better-tracced' as const

export function handleAttachments() {
    addPasteListener()
    pasteAttachmentPreviews()
}

let isListenerAdded = false
function addPasteListener() {
    if (isListenerAdded) {
        return
    }

    isListenerAdded = true

    if (window.location.href.match(/\/attachment\/ticket\/(\d+)/)) {
        return
    }

    const ticketNumber = window.location.href.match(/\/ticket\/(\d+)/)?.[1]

    if (!ticketNumber) {
        return
    }

    window.addEventListener('paste', () => {
        if (
            document.activeElement &&
            document.activeElement instanceof HTMLElement &&
            (
                document.activeElement.tagName === 'INPUT' ||
                document.activeElement.tagName === 'TEXTAREA' ||
                document.activeElement.isContentEditable
            )
        ) {
            return
        }

        const attachmentUrl = `${window.location.origin}/attachment/ticket/${ticketNumber}/?action=new`
        window.open(attachmentUrl, '_blank')
    })
}

async function pasteAttachmentPreviews() {
    const allLinkEls = document.getElementsByTagName('a');

    const unhandledAttachmentLinkEls = [...allLinkEls]
        .filter(it => it.href.includes('/raw-attachment/') && !it.classList.contains(HANDLED_CLASS_NAME))

    for (const attachmentLinkEl of unhandledAttachmentLinkEls) {
        try {
            attachmentLinkEl.classList.add(HANDLED_CLASS_NAME)

            const attachmentUrl = attachmentLinkEl.href

            if (attachmentUrl.endsWith('.har')) {
                pasteHarPreview(attachmentLinkEl, attachmentUrl)
                return
            }

            // https://trac.brightpattern.com/ticket/46620
            if (attachmentUrl.endsWith('.md')) {
                pasteMDPreview(attachmentLinkEl, attachmentUrl)
                return
            }

            const attachmentMimeType = await fetchMimeType(attachmentUrl)

            if (attachmentMimeType?.startsWith('video/')) {
                pasteVideoPreview(attachmentLinkEl, attachmentUrl)
                return
            }

            if (attachmentMimeType?.startsWith('application/zip')) {
                await pasteZipPreview(attachmentLinkEl, attachmentUrl)
                return
            }

            if (attachmentMimeType?.startsWith('image/')) {
                pasteImagePreview(attachmentLinkEl, attachmentUrl)
                return
            }

            console.log('Better trac: unhandled mime', attachmentMimeType);
        } catch (error) {
            console.warn('Better trac: failed to process attachment', attachmentLinkEl, error);
        }
    }
}
