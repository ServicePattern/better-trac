// BetterTrac IIFE script.
// Self-contained IIFE an admin adds to the Trac page for all users, enabling
// inline attachment previews without anyone installing the extension.
// Built separately: `yarn build:script` → dist/standalone/better-trac.js

import { startAttachmentPreviews } from "../extension/content/attachmentHandler";
import { handleAttachmentForm } from "../extension/content/formHandler";
import { addPasteListener } from "../extension/content/pasteListener";


main()

function main() {
    addPasteListener()
    handleAttachmentForm()
    startAttachmentPreviews()
}
