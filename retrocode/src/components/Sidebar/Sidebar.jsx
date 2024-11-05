import React, { useState } from 'react';
import { FaFolder, FaFile, FaFolderOpen } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onFileSelect }) => {
	const [fileStructure, setFileStructure] = useState([
		{
			id: '1',
			type: 'folder',
			name: 'Project 1',
			isOpen: false,
			children: [
				{ id: '1-1', type: 'file', name: 'main.txt' },
				{ id: '1-2', type: 'file', name: 'component.txt' }
			]
		},
		{
			id: '2',
			type: 'folder',
			name: 'Project 2',
			isOpen: false,
			children: [
				{ id: '2-1', type: 'file', name: 'design.txt' }
			]
		}
	]);

	const toggleFolder = (id) => {
		setFileStructure(prevStructure => {
			return prevStructure.map(item => {
				if (item.id === id) {
					return { ...item, isOpen: !item.isOpen };
				}
				
				return item;
			});
		});
	};

	const handleNewDirectory = () => {
		const newFolder = {
			id: `folder-${Date.now()}`,
			type: 'folder',
			name: 'New Folder',
			isOpen: false,
			children: []
		};

		setFileStructure(prev => [...prev, newFolder]);
	};

	const handleNewFile = () => {
		const newFile = {
			id: `file-${Date.now()}`,
			type: 'file',
			name: 'new-file.txt'
		};

		setFileStructure(prev => [...prev, newFile]);
	};

	const renderItem = (item) => {
		if (item.type === 'folder') {
			return (
				<div key={item.id} className="folder-item">
					<div
						className="item"
						onClick={() => toggleFolder(item.id)}
					>
						<span className="icon">
							{item.isOpen ? <FaFolderOpen /> : <FaFolder />}
						</span>
						<span className="item-name">{item.name}</span>
					</div>
					{item.isOpen && item.children && (
						<div className="directory">
							{item.children.map(child => renderItem(child))}
						</div>
					)}
				</div>
			);
		} else {
			return (
				<div
					key={item.id}
					className="item"
					onClick={() => onFileSelect(item)}
				>
					<span className="icon"><FaFile /></span>
					<span className="item-name">{item.name}</span>
				</div>
			);
		}
	};

	return (
		<div className="sidebar">
			<div className="button-container">
				<button onClick={handleNewDirectory}>New Directory</button>
				<button onClick={handleNewFile}>New File</button>
			</div>
			<div className="file-explorer">
				{fileStructure.map(item => renderItem(item))}
			</div>
		</div>
	);
};

export default Sidebar;