// BetterTrac standalone script.
// Self-contained IIFE an admin adds to the Trac page for all users, enabling
// inline attachment previews without anyone installing the extension.
// Built separately: `yarn build:script` → dist/standalone/script.js

import { startAttachmentPreviews } from "../extension/content/attachmentHandler";

startAttachmentPreviews();
