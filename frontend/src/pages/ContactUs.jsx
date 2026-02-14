const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
                <h1 className="text-4xl font-bold text-center mb-4">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    Have questions? We'd love to hear from you.
                </p>

                <form className="space-y-6">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Message
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Write your message..."
                            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-10 text-center text-gray-600">
                    <p>Email: support@learnify.com</p>
                    <p>Phone: +91 9XXXXXXXXX</p>
                    <p>Location: India</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
