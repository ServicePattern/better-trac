import { startAttachmentPreviews } from "./attachmentHandler.js";
import { handleAttachmentForm } from "./formHandler.js";
import { addPasteListener } from "./pasteListener.js";
import { sendMessage } from "../messaging.js";

main()

function main() {
    addPasteListener()
    handleAttachmentForm()
    startAttachmentPreviews({
        openMdPreview: (markdown) =>
            sendMessage({
                type: 'openOptionsPage',
                data: { page: '/md-preview', state: markdown },
            }),
    })
}
