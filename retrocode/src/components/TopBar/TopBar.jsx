import React from 'react';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import './TopBar.css';

const TopBar = ({ onExport, fileStructure, onReset }) => {
    const generateHierarchyWithDescriptionsString = (items, level = 0) => {
        let result = '';
        const indent = '\t'.repeat(level);

        items.forEach(item => {
            result += `${indent}${item.type === 'folder' ? '📁' : '📄'} ${item.name}\n`;
            if (item.content) {
                result += `${indent}\t📝 ${item.content}\n`;
            }
            if (item.children) {
                result += generateHierarchyWithDescriptionsString(item.children, level + 1);
            }
        });

        return result;
    };

    const handleExportClick = () => {
        const hierarchyWithDescriptionsString = `Project Hierarchy\n${generateHierarchyWithDescriptionsString(fileStructure)}`;
        onExport(hierarchyWithDescriptionsString);
    };

    const handleResetClick = () => {
        onReset();
    };

    return (
        <div className="header">
            <div className="header-left">
                <div className="header-info">
                    <div className="title">RetroCode Explorer</div>
                    <div className="version">Version 0.1.0</div>
                </div>
                <div className="social-links">
                    <a
                        href="https://github.com/gabecoatess"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        title="GitHub Profile"
                    >
                        <FaGithub />
                    </a>

                    <a
                        href="https://gabecoatess.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        title="Personal Website"
                    >
                        <FaGlobe />
                    </a>
                </div>
            </div>

            <div className="header-right">
                <button onClick={handleExportClick}>
                    Export All
                </button>
                <button 
                    onClick={handleResetClick}
                    className="reset-button"
                    title="Reset all data"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TopBar;