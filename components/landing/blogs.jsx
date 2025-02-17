// components/Blogs.jsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50" id='blogs'>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
        <span className="bg-gradient-to-r from-blue-50 to-transparent text-blue-600 px-4 py-2  text-sm font-medium">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
            Latest Blogs
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;