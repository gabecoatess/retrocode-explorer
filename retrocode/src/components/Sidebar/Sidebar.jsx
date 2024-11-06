import React, { useState, useEffect } from 'react';
import { FaFolder, FaFile, FaFolderOpen, FaEdit, FaTrash } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onItemSelect, selectedItem, onExport }) => {
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
	const [draggedItem, setDraggedItem] = useState(null);
	const [dragOverItem, setDragOverItem] = useState(null);
	const [dragOverContainer, setDragOverContainer] = useState(false);

	const [editingItem, setEditingItem] = useState(null);
	const [hoveredItem, setHoveredItem] = useState(null);

	const handleExportClick = () => {
		const exportData = 'Exported Data';
		onExport(exportData);
	};

	const toggleFolder = (id, e) => {
		e.stopPropagation();
		setFileStructure(prevStructure => {
			return prevStructure.map(item => {
				if (item.id === id) {
					return { ...item, isOpen: !item.isOpen };
				}
				return item;
			});
		});
	};

	const handleSelection = (item, e) => {
		e.stopPropagation();

		const findItem = (items, targetId) => {
			for (const item of items) {
				if (item.id === targetId) return item;
				if (item.children) {
					const found = findItem(item.children, targetId);
					if (found) return found;
				}
			}

			return null;
		};

		const foundItem = findItem(fileStructure, item.id);
		onItemSelect(foundItem);
	};

	useEffect(() => {
		if (selectedItem) {
			setFileStructure(prevStructure => {
				const updateContent = (items) => {
					return items.map(item => {
						if (item.id === selectedItem.id) {
							return { ...item, content: selectedItem.content };
						}

						if (item.children) {
							return {
								...item,
								children: updateContent(item.children)
							};
						}

						return item;
					});
				};

				return updateContent(prevStructure);
			});
		}
	}, [selectedItem]);

	const handleNewDirectory = () => {
		const newFolder = {
			id: `folder-${Date.now()}`,
			type: 'folder',
			name: 'New Folder',
			isOpen: false,
			content: '',
			children: []
		};
		setFileStructure(prev => [...prev, newFolder]);
	};

	const handleNewFile = () => {
		const newFile = {
			id: `file-${Date.now()}`,
			type: 'file',
			name: 'new-file.txt',
			content: ''
		};
		setFileStructure(prev => [...prev, newFile]);
	};

	const findAndRemoveItem = (items, itemId) => {
		for (let i = 0; i < items.length; i++) {
			if (items[i].id === itemId) {
				const [removedItem] = items.splice(i, 1);
				return removedItem;
			}
			if (items[i].children) {
				const found = findAndRemoveItem(items[i].children, itemId);
				if (found) return found;
			}
		}
		return null;
	};

	const handleDragStart = (e, item) => {
		e.stopPropagation();
		setDraggedItem(item);
		e.dataTransfer.setData('text/plain', ''); // Required for Firefox
	};

	const handleDragOver = (e, item) => {
		e.preventDefault();
		e.stopPropagation();
		if (item?.type === 'folder') {
			setDragOverItem(item);
			setDragOverContainer(false);
		}
	};

	const handleContainerDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOverItem(null);
		setDragOverContainer(true);
	}

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOverItem(null);
		setDragOverContainer(false);
	};

	const handleContainerDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOverContainer(false);

		if (!draggedItem) return;

		setFileStructure(prevStructure => {
			const newStructure = JSON.parse(JSON.stringify(prevStructure));
			const draggedItemCopy = findAndRemoveItem(newStructure, draggedItem.id);
			
			return [...newStructure, draggedItemCopy];
		});
	};

	const handleDrop = (e, targetItem) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOverItem(null);

		if (!draggedItem || draggedItem.id === targetItem.id) return;
		if (targetItem.type !== 'folder') return;

		setFileStructure(prevStructure => {
			const newStructure = JSON.parse(JSON.stringify(prevStructure));
			const draggedItemCopy = findAndRemoveItem(newStructure, draggedItem.id);

			const addToTarget = (items) => {
				return items.map(item => {
					if (item.id === targetItem.id) {
						return {
							...item,
							isOpen: true,
							children: [...(item.children || []), draggedItemCopy]
						};
					}
					if (item.children) {
						return {
							...item,
							children: addToTarget(item.children)
						};
					}
					return item;
				});
			};

			return addToTarget(newStructure);
		});
	};

	const handleEdit = (e, item) => {
		e.stopPropagation();
		setEditingItem(item);
	}

	const handleDelete = (e, itemId) => {
        e.stopPropagation();
        setFileStructure(prevStructure => {
            const deleteItem = (items) => {
                return items.filter(item => {
                    if (item.id === itemId) return false;
                    if (item.children) {
                        item.children = deleteItem(item.children);
                    }
                    return true;
                });
            };
            return deleteItem([...prevStructure]);
        });
    };

	const handleNameChange = (e, item) => {
        e.stopPropagation();
        const newName = e.target.value;
        setFileStructure(prevStructure => {
            const updateName = (items) => {
                return items.map(i => {
                    if (i.id === item.id) {
                        return { ...i, name: newName };
                    }
                    if (i.children) {
                        return { ...i, children: updateName(i.children) };
                    }
                    return i;
                });
            };
            return updateName([...prevStructure]);
        });
    };

	const handleNameBlur = () => {
        setEditingItem(null);
    };

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleNameBlur(null);
		}
	}

	const renderItem = (item) => {
		const isEditing = editingItem?.id === item.id;
		const isHovered = hoveredItem?.id === item.id;
		
		const itemContent = (
			<>
				<span className="icon">
					{item.type === 'folder'
						? (item.isOpen ? <FaFolderOpen /> : <FaFolder />)
						: <FaFile />
					}
				</span>
				{isEditing ? (
					<input
						type="text"
						value={item.name}
						onChange={(e) => handleNameChange(e, item)}
						onBlur={handleNameBlur}
						onKeyDown={handleKeyDown}
						onClick={(e) => e.stopPropagation()}
						autoFocus
					/>
				) : (
					<span className="item-name">{item.name}</span>
				)}
				{isHovered && !isEditing && (
					<div className="item-actions">
						<FaEdit
							className="action-icon"
							onClick={(e) => handleEdit(e, item)}
						/>
						<FaTrash
							className="action-icon"
							onClick={(e) => handleDelete(e, item.id)}
						/>
					</div>
				)}
			</>
		);

		if (item.type === 'folder') {
			return (
				<div
					key={item.id}
					className={`folder-item ${dragOverItem?.id === item.id ? 'drag-over' : ''}`}
					draggable={!isEditing}
					onDragStart={(e) => handleDragStart(e, item)}
					onDragOver={(e) => handleDragOver(e, item)}
					onDragLeave={handleDragLeave}
					onDrop={(e) => handleDrop(e, item)}
					onMouseEnter={() => setHoveredItem(item)}
					onMouseLeave={() => setHoveredItem(null)}
				>
					<div
						className={`item ${selectedItem?.id === item.id ? 'selected' : ''}`}
						onClick={(e) => handleSelection(item, e)}
					>
						<span className="folder-toggle" onClick={(e) => toggleFolder(item.id, e)}>
							{itemContent}
						</span>
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
					className={`item ${selectedItem?.id === item.id ? 'selected' : ''}`}
					onClick={(e) => handleSelection(item, e)}
					draggable={!isEditing}
					onDragStart={(e) => handleDragStart(e, item)}
					onMouseEnter={() => setHoveredItem(item)}
					onMouseLeave={() => setHoveredItem(null)}
				>
					{itemContent}
				</div>
			);
		}
	};

	return (
		<div className="sidebar">
			<div className="button-container">
				<button onClick={handleNewDirectory}>New Directory</button>
				<button onClick={handleNewFile}>New File</button>
				<button onClick={handleExportClick}>Export Hierarchy</button>
			</div>
			<div className={`file-explorer ${dragOverContainer ? `drag-over`: ''}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleContainerDrop}>
				{fileStructure.map(item => renderItem(item))}
			</div>
		</div>
	);
};

export default Sidebar;