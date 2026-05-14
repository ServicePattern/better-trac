const EXT_MIME: Record<string, string> = {
    mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
    avi: 'video/x-msvideo', mkv: 'video/x-matroska', m4v: 'video/mp4',
    png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg',
    gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml',
    bmp: 'image/bmp', tiff: 'image/tiff', tif: 'image/tiff',
    zip: 'application/zip',
}

export function getMimeByExtension(url: string): string | undefined {
    const ext = url.split('.').pop()?.toLowerCase()
    return ext ? EXT_MIME[ext] : undefined
}
