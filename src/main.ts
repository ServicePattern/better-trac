import { handleAttachmentPreviews } from "./attachmentHandler";
import { disableAutoSubmit } from "./utils/disableAutoSubmit";
import { handleAttachmentForm } from "./formHandler";
import { addPasteListener } from "./pasteListener";


main()

function main() {
    disableAutoSubmit()

    addPasteListener()
    handleAttachmentForm()
    handleAttachmentPreviews()
}
