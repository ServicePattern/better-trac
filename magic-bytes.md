# Magic Bytes

Every binary format starts with a fixed signature at a known offset. Read those bytes, match against known signatures → get file type without relying on extension.

## How it works

File format specs mandate specific byte sequences at the start (or fixed offset) of every valid file. These are called **magic bytes** or **file signatures**.

Examples:

| Format | Offset | Bytes (hex) | ASCII |
|--------|--------|-------------|-------|
| JPEG | 0 | `FF D8 FF` | `ÿØÿ` |
| PNG | 0 | `89 50 4E 47 0D 0A 1A 0A` | `‰PNG\r\n\x1a\n` |
| GIF | 0 | `47 49 46 38` | `GIF8` |
| WebP | 8 | `57 45 42 50` | `WEBP` (after RIFF header at 0) |
| MP4 | 4 | `66 74 79 70` | `ftyp` (box type, varies by brand) |
| PDF | 0 | `25 50 44 46` | `%PDF` |

## Why offset matters

RIFF-based formats (WebP, AVI, WAV) put a generic `RIFF` header at byte 0 and the actual format identifier at byte 8. MP4/MOV use a box structure — the `ftyp` box starts at byte 4 (bytes 0–3 are the box size, variable).

## Reliability vs extension

Extensions are metadata — they can be wrong, missing, or renamed. Magic bytes are part of the file content itself. A valid JPEG is always `FF D8 FF` at offset 0 regardless of what it's named.

## In practice

```ts
function getMimeByMagicBytes(buf: Uint8Array): string | undefined {
    // JPEG: FF D8 FF
    if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return 'image/jpeg'
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return 'image/png'
    // GIF: 47 49 46 38
    if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return 'image/gif'
    // WebP: RIFF at 0, WEBP at 8
    if (buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return 'image/webp'
    // MP4/MOV: ftyp box at offset 4
    if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) return 'video/mp4'
    return undefined
}
```

Only need the first ~12 bytes — no reason to read the whole file.
