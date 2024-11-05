import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContentArea from '../ContentArea/ContentArea';
import './MainContent.css';

const MainContent = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	return (
		<div className="main-content">
			<Sidebar onFileSelect={setSelectedFile} />
			<ContentArea selectedFile={selectedFile} />
		</div>
	);
};

export default MainContent;