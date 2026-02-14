const services = [
    {
        title: "Industry-Focused Courses",
        description:
            "Courses are designed based on current industry requirements, ensuring students learn relevant and in-demand skills.",
    },
    {
        title: "Structured Learning Paths",
        description:
            "Step-by-step learning paths from beginner to advanced levels to build strong fundamentals.",
    },
    {
        title: "Project-Based Learning",
        description:
            "Real-world projects included in every course to gain practical, hands-on experience.",
    },
    {
        title: "Expert-Created Content",
        description:
            "Courses created and reviewed by experienced professionals to maintain quality and accuracy.",
    },
    {
        title: "Lifetime Course Access",
        description:
            "Once enrolled, students get lifetime access to course content and future updates.",
    },
    {
        title: "Career & Interview Preparation",
        description:
            "Guidance for resumes, interviews, and career growth to help students get job-ready.",
    },
];

const Services = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
                    Our Services
                </h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
                    Learnify provides structured, practical, and career-oriented
                    learning experiences designed to help students grow
                    professionally.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                {service.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
