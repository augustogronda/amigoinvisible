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
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        return successful;
    } catch (err) {
        console.error('Fallback copy strategy failed', err);
        return false;
    }
}
