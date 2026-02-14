const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8 mt-30">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <h2 className="text-xl font-bold text-white">Learnify</h2>

                <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                    <li className="hover:text-white cursor-pointer">About</li>
                    <li className="hover:text-white cursor-pointer">Courses</li>
                    <li className="hover:text-white cursor-pointer">Contact</li>
                    <li className="hover:text-white cursor-pointer">
                        Privacy Policy
                    </li>
                </ul>

                <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()} Learnify. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
