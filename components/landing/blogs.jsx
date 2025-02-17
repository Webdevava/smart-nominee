import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const Blogs = () => {
  const blogs = [
    {
      image: "/images/about.png",
      title: "Lorem Ipsum is simply dummy?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
      author: "Rohit Kumar",
      date: "17 Jan 2022",
      categories: ["Finance", "Insurance"]
    },
    {
      image: "/images/about.png",
      title: "Lorem Ipsum is simply dummy?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
      author: "Rohit Kumar",
      date: "17 Jan 2022",
      categories: ["Finance", "Insurance"]
    },
    {
      image: "/images/about.png",
      title: "Lorem Ipsum is simply dummy?",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's...",
      author: "Rohit Kumar",
      date: "17 Jan 2022",
      categories: ["Finance", "Insurance"]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );
  }, [blogs.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  }, [blogs.length]);

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
    <section className="py-24 px-4 md:px-8 bg-gray-50" id='blogs'>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="bg-gradient-to-r from-blue-50 to-transparent text-blue-600 px-4 py-2 text-sm font-medium">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Latest Blogs
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
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
              {blogs.map((blog, index) => (
                <div 
                  key={index}
                  className="absolute top-0 h-full w-full transition-transform duration-300"
                  style={{ left: `${index * 100}%` }}
                >
                  <BlogCard blog={blog} />
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
            {blogs.map((_, index) => (
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
    </section>
  );
};

// Separate BlogCard component for reusability
const BlogCard = ({ blog }) => (
  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
    {/* Image Container */}
    <div className="relative h-48 w-full overflow-hidden">
      <Image
        src={blog.image}
        alt={blog.title}
        fill
        className="object-cover"
      />
    </div>

    {/* Content */}
    <div className="p-6">
      {/* Author and Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <span>{blog.author}</span>
        <span>•</span>
        <span>{blog.date}</span>
      </div>

      {/* Title */}
      <Link 
        href="#" 
        className="group flex items-center justify-between"
      >
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>
        <ArrowUpRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      {/* Description */}
      <p className="text-gray-600 mb-4">
        {blog.description}
      </p>

      {/* Categories */}
      <div className="flex gap-2">
        {blog.categories.map((category, idx) => (
          <Link
            key={idx}
            href="#"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {category}
            {idx < blog.categories.length - 1 && 
              <span className="text-gray-400 ml-2">•</span>
            }
          </Link>
        ))}
      </div>
    </div>
  </article>
);

export default Blogs;