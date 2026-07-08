import { createRoot } from "react-dom/client";
import { MdPreview } from "./MdPreview";
import css from "./options.css?inline";

// Renders the markdown preview into a tab opened by the caller. The tab must
// be opened synchronously in the click handler (popup blockers), so the
// caller opens it first, fetches the .md, then hands both here.
export function renderMdPreview(tab: Window, text: string) {
    tab.document.title = "MD Preview";

    const style = tab.document.createElement("style");
    style.textContent = css;
    tab.document.head.appendChild(style);

    const container = tab.document.createElement("div");
    tab.document.body.appendChild(container);

    createRoot(container).render(<MdPreview text={text} />);
}
