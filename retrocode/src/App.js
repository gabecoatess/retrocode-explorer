import { useState, useEffect } from 'react';
import './App.css';

import TopBar from './components/TopBar/TopBar';
import MainContent from './components/MainContent/MainContent';
import ExportPopup from './components/ExportPopup/ExportPopup';

function App() {
    const [showExportPopup, setShowExportPopup] = useState(false);
    const [exportData, setExportData] = useState('');
    const [fileStructure, setFileStructure] = useState(() => {
        const savedStructure = localStorage.getItem('fileStructure');
        return savedStructure ? JSON.parse(savedStructure) : [{
            id: '1',
            type: 'folder',
            name: 'root',
            isOpen: true,
            content: '',
            children: []
        }];
    });

    // Save to localStorage whenever fileStructure changes
    useEffect(() => {
        localStorage.setItem('fileStructure', JSON.stringify(fileStructure));
    }, [fileStructure]);

    const handleExport = (data) => {
        setExportData(data);
        setShowExportPopup(true);
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset the file structure? This cannot be undone.')) {
            const initialStructure = [{
                id: '1',
                type: 'folder',
                name: 'root',
                isOpen: true,
                content: '',
                children: []
            }];
            setFileStructure(initialStructure);
            localStorage.setItem('fileStructure', JSON.stringify(initialStructure));
        }
    };

    return (
        <div className="App">
            <TopBar 
                onExport={handleExport} 
                fileStructure={fileStructure}
                onReset={handleReset}
            />
            <MainContent 
                onExport={handleExport} 
                fileStructure={fileStructure} 
                setFileStructure={setFileStructure}
            />

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