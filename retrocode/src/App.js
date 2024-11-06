import { useState } from 'react';
import './App.css';

import TopBar from './components/TopBar/TopBar';
import MainContent from './components/MainContent/MainContent';
import ExportPopup from './components/ExportPopup/ExportPopup';

function App() {
	const [showExportPopup, setShowExportPopup] = useState(false);
	const [exportData, setExportData] = useState('');

	const handleExport = (data) => {
		setExportData(data);
		setShowExportPopup(true);
	};

	return (
		<div className="App">
			<TopBar onExport={handleExport}/>
			<MainContent onExport={handleExport}/>

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
