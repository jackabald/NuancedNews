import React from "react";
import { useBookmarks } from "../contexts/BookmarkedContext.jsx";
import Article from "./Article";

const Bookmarked = () => {
    const { bookmarks } = useBookmarks();

    if (bookmarks.length === 0) {
        return (
            <div className="h-full text-center text-gray-500 mt-10">
                No bookmarked articles yet.
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="max-w-8xl pt-3 mx-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bookmarks.map((article, index) => (
                <Article key={article.link || index} {...article} />
            ))}
        </div></div>
    );
};

export default Bookmarked;
