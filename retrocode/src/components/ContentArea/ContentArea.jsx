import React from 'react';
import './ContentArea.css';

const ContentArea = ({ selectedFile }) => {
	return (
		<div className="content-area">
			<textarea
				placeholder={selectedFile
					? `Editing: ${selectedFile.name}`
					: "Select a file to begin editing..."}
				disabled={!selectedFile}
			/>
		</div>
	);
};

export default ContentArea;