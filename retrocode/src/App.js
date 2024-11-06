import { useState } from 'react';
import './App.css';

import TopBar from './components/TopBar/TopBar';
import MainContent from './components/MainContent/MainContent';
import ExportPopup from './components/ExportPopup/ExportPopup';

function App() {
	const [showExportPopup, setShowExportPopup] = useState(false);
	const [exportData, setExportData] = useState('');
	const [fileStructure, setFileStructure] = useState([
		{
			id: '1',
			type: 'folder',
			name: 'root',
			isOpen: true,
			content: '',
			children: []
		}
	]);

	const handleExport = (data) => {
		setExportData(data);
		setShowExportPopup(true);
	};

	return (
		<div className="App">
			<TopBar onExport={handleExport} fileStructure={fileStructure}/>
			<MainContent onExport={handleExport} fileStructure={fileStructure} setFileStructure={setFileStructure}/>

			{showExportPopup && (
				<ExportPopup
					exportData={exportData}
					onClose={() => setShowExportPopup(false)}
				/>
			)}
		</div>
	);
}

export default App;
