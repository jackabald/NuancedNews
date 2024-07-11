import React, { useState, useEffect } from 'react';
import './Article.css';
import $ from 'jquery';

const Article = ({ title, description, link }) => {
	// useEffect(() => {
	//   const handleClick = (event) => {
	//     const btn = $(event.target);
	//     btn.toggleClass("active");
	//   };

	//   $(".pp-bookmark-btn").on("click", handleClick);

	//   return () => {
	//     $(".pp-bookmark-btn").off("click", handleClick);
	//   };
	// }, []);

	const [isBookmark, setIsBookmark] = useState(false);

	const handleClick = () => {
		setIsBookmark(!isBookmark);
	};

	return (
		<div className='article-container'>
			<div className='article'>
				<h3>{title}</h3>
				<p>{description}</p>
				<div className='article-footer'>
					<a href={link} target='_blank' rel='noopener noreferrer'>
						Read more
					</a>
					<button
						type='button'
						// className="pp-bookmark-btn btn btn-default btn-lg pull-right"
						className={isBookmark ? 'red' : ''}
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
