import { handleAttachmentPreviews as handleAttachmentPreviews } from "./attachmentHandler.js";
import { handleAttachmentForm } from "./formHandler.js";
import { addPasteListener } from "./pasteListener.js";

main()

function main() {
    const tick = () => {
        addPasteListener()
        handleAttachmentForm()

        handleAttachmentPreviews()
        // when user change fields of "Modify Ticket" the page does soft reload
        setInterval(() => {
            handleAttachmentPreviews()
        }, 1000)
    }

    tick()
}
