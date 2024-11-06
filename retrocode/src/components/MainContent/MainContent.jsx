import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContentArea from '../ContentArea/ContentArea';
import './MainContent.css';

const MainContent = ({ onExport }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	return (
		<div className="main-content">
			<Sidebar onItemSelect={setSelectedItem} selectedItem={selectedItem} onExport={onExport}/>
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