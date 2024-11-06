import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContentArea from '../ContentArea/ContentArea';
import './MainContent.css';

const MainContent = ({ onExport, fileStructure, setFileStructure }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	return (
		<div className="main-content">
			<Sidebar onItemSelect={setSelectedItem} selectedItem={selectedItem} onExport={onExport} fileStructure={fileStructure} setFileStructure={setFileStructure}/>
			<ContentArea selectedItem={selectedItem} onContentChange={(itemId, newContent) => {
				setSelectedItem(prev => ({
					...prev,
					content: newContent
				}));
			}}
			/>
		</div>
	);
};

export default MainContent;