/**
 * Copies text to the clipboard using the most reliable method available.
 * Tries the modern Clipboard API first, then falls back to document.execCommand.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
    // First, try the modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('Clipboard API failed, trying fallback strategy', err);
        }
    }

    // Fallback for non-secure contexts (e.g. HTTP on LAN) or older browsers
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Ensure the textarea is not visible but part of the DOM
        // Avoids strict visibility checks on some browsers while keeping it out of view
        textArea.setAttribute('readonly', '');
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        textArea.style.fontSize = "12pt"; // Prevent zooming on iOS
        document.body.appendChild(textArea);

        // iOS-compatible selection
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
        }

        textArea.select();
        textArea.setSelectionRange(0, 999999); // For mobile devices

        const successful = document.execCommand('copy');

        if (selection) {
            selection.removeAllRanges();
        }
        document.body.removeChild(textArea);

        return successful;
    } catch (err) {
        console.error('Fallback copy strategy failed', err);
        return false;
    }
}
