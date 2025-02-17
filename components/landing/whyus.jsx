// components/WhyUs.jsx
import {
  ThumbsUp,
  Target,
  Award,
  Users,
  Package,
  BarChart3,
} from "lucide-react";

const WhyUs = () => {
  const features = [
    {
      icon: <ThumbsUp className="w-8 h-8 text-blue-500" />,
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: <Package className="w-8 h-8 text-blue-500" />,
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-white" id="whyUs">
      <div className="  container mx-auto ">
        {/* Header */}
        <div className="text- mb-12">
          <span className="bg-gradient-to-r from-blue-50 to-white text-blue-600 px-4 py-2  text-sm font-medium">
            Why Choose Us?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Why Choose Smart Nominee?
          </h2>
          <p className="text-gray-600 max-w-7xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-200/15 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center w-full gap-3"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
