import React, { useState, useEffect } from 'react';
import './Article.css';

const Article = ({ title, description, link }) => {
	const [isBookmark, setIsBookmark] = useState(false);
	// const [isTruncated, setIsTruncated] = useState(true); // Step 1: Add state for truncation

	const handleClick = () => {
		setIsBookmark(!isBookmark);
	};

	// Truncate description if too long

	// const toggleTruncate = () => { // Step 3: Add click handler for toggling truncation
    //     setIsTruncated(!isTruncated);
    // };

	// const truncateDescription = (description, maxLength = 100) => {
    //     if (description == null) {
    //         return '';
    //     }
    //     if (isTruncated && description.length > maxLength) { // Step 2: Modify to check truncation state
    //         return (
    //             <span>
    //                 {`${description.substring(0, maxLength)}...`}
    //                 <span onClick={toggleTruncate} style={{color: 'blue', cursor: 'pointer'}}>Show More</span>
    //             </span>
    //         );
    //     }
    //     return (
    //         <span>
    //             {description}
    //             {description.length > maxLength && <span onClick={toggleTruncate} style={{color: 'blue', cursor: 'pointer'}}> Show less</span>}
    //         </span>
    //     );
    // };

	return (
		<div className='article-container'>
			<div className='article'>
				<h3>{title}</h3>
				<p>{description}</p>
				<div className='article-footer'>

					<a href={link}>Read More</a>

					<button
						type='button'
						className={`bookmark-btn ${isBookmark ? 'red' : ''}`}
						onClick={handleClick}
						data-context='investor'
						data-context-action='view'
						data-context-id='7'
					></button>
				</div>
			</div>
		</div>
	);
};

export default Article;
