import React, { useState, useEffect } from 'react';
import './ContentArea.css';
import { ReactComponent as FaintIcon } from './faint-icon.svg'; // Pae40

const ContentArea = ({ selectedItem, onContentChange }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(selectedItem?.content || '');
    }, [selectedItem]);

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
		
		if (selectedItem) {
			onContentChange(selectedItem.id, newContent);
		}
    };

    return (
        <div className="content-area">
            <div className="content-wrapper">
                <FaintIcon className="svg-icon" />
                <textarea
                    value={content}
                    onChange={handleChange}
                    placeholder={selectedItem
                        ? `Editing: ${selectedItem.name}`
                        : "Select a file or folder to begin editing..."}
                    disabled={!selectedItem}
                />
            </div>
        </div>
    );
};

export default ContentArea;