import React, { useState } from 'react';

import { uploadFile } from '../services/geminiService'; 

import Loader from './Loader';
import { parsePdf } from '../utils/pdfParser';

const FileUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError('');
    };
    
    const handlePaste = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file && !text) {
            setError('Please select a file or paste text.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            let contentToProcess = text;
            if (file) {
                 if (file.type === "application/pdf") {
                    contentToProcess = await parsePdf(file);
                } else {
                    // For .txt files
                    contentToProcess = await file.text();
                }
            }
            onUploadSuccess(contentToProcess);
        } catch (err) {
            console.error(err);
            setError('Failed to process. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container card">
            <h2>Upload Your Notes</h2>
            <p>Upload a .txt or .pdf file, or paste your notes below.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="file-upload">Choose File</label>
                    <input id="file-upload" type="file" onChange={handleFileChange} accept=".txt,.pdf" />
                </div>
                <div className="separator">OR</div>
                <div className="form-group">
                    <label htmlFor="text-paste">Paste Text</label>
                    <textarea 
                        id="text-paste"
                        rows="8" 
                        placeholder="Paste your notes here..."
                        value={text}
                        onChange={handlePaste}
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? <Loader /> : 'Generate Study Aids'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default FileUpload;
