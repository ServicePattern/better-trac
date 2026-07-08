import { startAttachmentPreviews } from "./attachmentHandler";
import { handleAttachmentForm } from "./formHandler";
import { addPasteListener } from "./pasteListener";


main()

function main() {
    addPasteListener()
    handleAttachmentForm()
    startAttachmentPreviews()
}
