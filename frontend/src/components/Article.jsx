import { useState } from "react";
import bookmark from "../assets/img/bookmark.svg";
import bookmarked from "../assets/img/bookmarked.svg";
import { getSummary } from "../services/newsService";
import { useBookmarks } from "../contexts/BookmarkedContext";

const Article = ({ title, description, link, source, thumbnail, onRemoveBookmark }) => {
  const { bookmarks, toggleBookmark } = useBookmarks(); // ✅ use context
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const isBookmarked = bookmarks.some((b) => b.link === link); // ✅ check if already bookmarked

  const handleToggleBookmark = () => {
    toggleBookmark({ title, description, link, source, thumbnail });
  };

  const fetchSummary = async () => {
    setIsLoading(true);
    try {
      const response = await getSummary(link);
      setSummary(response || "No summary available.");
    } catch (error) {
      setSummary("Error fetching summary: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fallbackThumbnail =
    "/logos/" + source.split(" | ").pop().trim().replace(/\s+/g, "_") + ".png";

  const words = description.split(" ");
  const isTruncated = words.length > 25;
  const displayedText = showFullDescription
    ? description
    : words.slice(0, 25).join(" ") + (isTruncated ? "..." : "");

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove this bookmark?")) {
      onRemoveBookmark(link);
    }
  };

  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-sm p-2 mx-auto mb-3 hover:shadow transition flex flex-col h-full">
      <a href={link} target="_blank" rel="noopener noreferrer" className="relative block">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
            <svg
              className="animate-spin h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        )}
        <img
          src={thumbnail || fallbackThumbnail}
          alt={title}
          className={`w-full h-32 rounded-md mb-1.5 transition-opacity duration-300 ${
            imgLoading ? "opacity-0" : "opacity-100"
          } ${thumbnail ? "object-cover" : "object-contain"}`}
          onLoad={() => setImgLoading(false)}
          onError={() => setImgLoading(false)}
        />
        <h3 className="text-base font-semibold text-gray-800 leading-snug line-clamp-2">
          {title}
        </h3>
      </a>

      <p className="text-sm text-gray-700 leading-snug mt-0.5 mb-2 flex-grow">
        {displayedText}
        {isTruncated && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="ml-1 text-blue-600 hover:underline text-sm font-medium"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      <div className="flex items-center justify-between gap-1">
        <button
          onClick={fetchSummary}
          className="flex-1 text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isLoading ? "..." : "Summarize"}
        </button>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-sm text-center px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
        >
          Open
        </a>

        {onRemoveBookmark ? (
          <button
            onClick={handleRemove}
            className="p-1 bg-red-100 rounded hover:bg-red-200 transition text-red-600 font-semibold"
            title="Remove bookmark"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={handleToggleBookmark}
            className="p-1 bg-blue-100 rounded hover:bg-blue-200 transition"
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <img
              src={isBookmarked ? bookmarked : bookmark}
              alt="bookmark"
              className="w-5 h-5"
            />
          </button>
        )}
      </div>

      {summary && (
        <div className="mt-2 bg-gray-50 border rounded p-2 text-sm text-gray-700">
          <strong className="block mb-1">Summary:</strong>
          {summary}
        </div>
      )}
    </div>
  );
};

export default Article;
