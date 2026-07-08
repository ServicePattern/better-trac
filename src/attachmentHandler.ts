import { fetchHeaders } from "./utils/network";
import { pasteHarPreview } from "./attachments/harPreview";
import { pasteMDPreview } from "./attachments/mdPreview";
import { pasteVideoPreview } from "./attachments/videoPreview";
import { pasteZipPreview } from "./attachments/zipPreview";
import { pasteImagePreview } from "./attachments/imagePreview";

const PROCESSED_CLASSNAME = 'better-traced'

// Run previews once, then re-run on a timer: changing "Modify Ticket" fields
// soft-reloads the page, dropping previously injected previews.
export function startAttachmentPreviews() {
    handleAttachmentPreviews()
    setInterval(() => {
        handleAttachmentPreviews()
    }, 1000)
}

export async function handleAttachmentPreviews() {
    const allLinkEls = document.getElementsByTagName('a');

    const attachmentLinkEls = [...allLinkEls].filter(it => {
        return it.href.includes('/raw-attachment/') && !it.classList.contains(PROCESSED_CLASSNAME)
    })

    attachmentLinkEls.forEach(async (attachmentLinkEl) => {
        try {
            attachmentLinkEl.classList.add(PROCESSED_CLASSNAME)

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

            const { mimeType, contentLength } = await fetchHeaders(attachmentUrl)

            // https://trac.brightpattern.com/ticket/44083
            if (mimeType?.startsWith('video/')) {
                pasteVideoPreview(attachmentLinkEl, attachmentUrl)
                return
            }

            if (mimeType?.startsWith('application/zip')) {
                pasteZipPreview(attachmentLinkEl, attachmentUrl, contentLength)
                return
            }

            if (mimeType?.startsWith('image/')) {
                pasteImagePreview(attachmentLinkEl, attachmentUrl)
                return
            }

            console.log('Better trac: unhandled mime', mimeType);
        } catch (error) {
            console.warn('Better trac: failed to process attachment', attachmentLinkEl, error);
        }
    })
}
