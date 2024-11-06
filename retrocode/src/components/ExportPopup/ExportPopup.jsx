import React, { useRef } from 'react';
import { FaDownload, FaCopy } from 'react-icons/fa';
import './ExportPopup.css';

const ExportPopup = ({ exportData, onClose }) => {
	const textAreaRef = useRef(null);

	const handleCopyToClipboard = () => {
		if (textAreaRef.current) {
			textAreaRef.current.select();
			navigator.clipboard.writeText(textAreaRef.current.value);
		}
	};

	const handleDownload = () => {
		const blob = new Blob([exportData], { type: 'text/plain' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'file-hierarchy-export.txt';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	return (
		<div className="export-popup-overlay" onClick={onClose}>
			<div className="export-popup-content" onClick={e => e.stopPropagation()}>
				<textarea
					ref={textAreaRef}
					value={exportData}
					readOnly
					className="export-textarea"
				/>
				<div className="export-actions">
					<button
						className="export-button"
						onClick={handleDownload}
					>
						<FaDownload />
						Download
					</button>

					<button
						className="export-button"
						onClick={handleCopyToClipboard}
					>
						<FaCopy />
						Copy to Clipboard
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExportPopup;