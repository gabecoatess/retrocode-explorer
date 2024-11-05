import React from 'react';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import './TopBar.css';

const TopBar = () => {
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
				<button onClick={() => console.log("Export All clicked")}>
					Export All
				</button>
			</div>
		</div>
	);
};

export default TopBar;