export type AttachmentHeaders = {
    mimeType: string | undefined;
    contentLength: number | undefined;
};

export async function fetchHeaders(url: string): Promise<AttachmentHeaders> {
    try {
        const response = await fetch(url, { method: "HEAD" });
        const mimeType = response.headers.get("content-type") ?? undefined;
        const raw = response.headers.get("content-length");
        const contentLength = raw != null ? parseInt(raw, 10) : undefined;
        return { mimeType, contentLength };
    } catch {
        return { mimeType: undefined, contentLength: undefined };
    }
}
