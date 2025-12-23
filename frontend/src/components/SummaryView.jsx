// SummaryView.jsx
import React from 'react';

const SummaryView = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className="card">
            <h3>Summary</h3>
            <p>{summary}</p>
        </div>
    );
};

export default SummaryView;
