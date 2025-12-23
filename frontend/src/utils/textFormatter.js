

// textFormatter.js
export const cleanText = (text) => {
    // Replace multiple newlines/spaces with a single space
    return text.replace(/\s+/g, ' ').trim();
};