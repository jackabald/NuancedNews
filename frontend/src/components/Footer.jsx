const Footer = () => {
  return (
    <footer className="bg-white shadow-md">
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between sm-flex-col gap-3">
        <div className="text-sm text-gray-700">
          © 2024 Open Source Project. All rights reserved.
        </div>
        <ul className="flex gap-6 items-center text-sm font-medium">
          <li>
            <a
              href="https://github.com/jackabald/NuancedNews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contribute
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jackabald/NuancedNews/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Documentation
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://github.com/jackabald/NuancedNews/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contributors
            </a>
          </li>
        </ul>

      </div>
    </footer>
  );
};

export default Footer;
