// pdfParser.js
import * as pdfjsLib from 'pdfjs-dist';
// You might need to configure the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

export const parsePdf = async (file) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
        fileReader.onload = async function() {
            const typedarray = new Uint8Array(this.result);
            try {
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                resolve(fullText);
            } catch (error) {
                console.error('Error parsing PDF:', error);
                reject('Could not parse PDF file.');
            }
        };

        fileReader.onerror = (error) => {
            reject(error);
        };

        fileReader.readAsArrayBuffer(file);
    });
};
