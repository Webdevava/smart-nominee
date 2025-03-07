import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      image: "/images/about.png",
      title: "Secure Asset & Debt Storage",
      description: "Your financial footprint, safeguarded until the right moment. Store all your transactions, assets, debts—whether your family knows about them or not."
    },
    {
      image: "/images/about.png",
      title: "Nominee Management & Controlled Access",
      description: "Your loved ones should never be left in the dark. Assign nominees, define access levels, and control when they receive the information."
    },
    {
      image: "/images/about.png",
      title: "Smart Inactivity Detection & Triple Confirmation System",
      description: "Because mistakes are not an option. Before we disclose any information to your nominees, we verify your inactivity at least 3 times through multiple communication channels. If there is no response, only then do we share the data."
    },
    {
      image: "/images/about.png",
      title: "Hidden or Delayed Asset Disclosure",
      description: "Protect your family's future the way you want. Maybe you have investments you don’t want your family to know about until the right time. Maybe you fear sudden wealth will make them lazy, careless, or unmotivated. You decide when and how your financial secrets are revealed."
    },
    {
      image: "/images/about.png",
      title: "Unaccounted Transactions",
      description: "Your secrets, protected and revealed on your terms. If you have transactions or assets that you want to disclose only after your passing, you can store them here securely. No immediate reporting. No interference. Only your chosen nominee will access it—when you allow it."
    },
    {
      image: "/images/about.png",
      title: "Insights & Reports",
      description: "Your financial roadmap, always clear. Understand your total assets, liabilities, and nominee allocations with advanced analytics."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === features.length - 1 ? 0 : prevIndex + 1
    );
  }, [features.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? features.length - 1 : prevIndex - 1
    );
  }, [features.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50" id="features">
      <div className="container mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="bg-gradient-to-r from-blue-50 to-transparent text-blue-600 px-4 py-2 text-sm font-medium">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
            Our Top Key Features That Empower The Users
          </h2>
        </div>

        {/* Features Display */}
        <div className="relative">
          {/* Desktop Grid View */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden">
            <div 
              className="relative h-[500px] w-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="absolute w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="absolute top-0 h-full w-full transition-transform duration-300"
                    style={{ left: `${index * 100}%` }}
                  >
                    <FeatureCard feature={feature} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors md:block hidden"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors md:block hidden"
              onClick={nextSlide}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate FeatureCard component for reusability
const FeatureCard = ({ feature }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
    <div className="relative aspect-video w-full">
      <Image
        src={feature.image}
        alt={feature.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEkKzQ2MC4wNjAwMDYwMDA2MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA/2wBDAR0XFyAeIBsgHB8gIyIgID8zKjA/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz//wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600 text-sm">
        {feature.description}
      </p>
    </div>
  </div>
);

export default FeaturesSection;