// components/FeaturesSection.jsx
import Image from 'next/image';

const FeaturesSection = () => {
  const features = [
    {
      image: "/images/about.png",
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      image: "/images/about.png ",
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      image: "/images/about.png ",
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      image: "/images/about.png ",
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      image: "/images/about.png ",
      title: "Lorem Ipsum is simply dummy text of the printing?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50" id='features'>
      <div className="container mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
        <span className="bg-gradient-to-r from-blue-50 to-transparent text-blue-600 px-4 py-2  text-sm font-medium">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Our Top Key Features That Empower The Users
          </h2>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Feature Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;