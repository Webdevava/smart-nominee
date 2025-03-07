import React from 'react';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  return (
    <section className="py-12 md:py-24 px-4 bg-white" id="about">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Left Column - Text Content */}
        <div className="space-y-6 md:space-y-8 w-full md:w-1/2 order-2 md:order-1">
          <div className="text-left">
            <span className="inline-block bg-gradient-to-r from-blue-50 to-transparent text-blue-600 px-4 py-2 text-sm font-medium ">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Why We Exist</h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-left">
          Life is unpredictable, but your legacy shouldn't be. We created this platform to ensure that your personal, financial, and nominee details are always accessible, safeguarded, and shared with the people who matter most—only when it is truly needed.
          </p>


          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
              What Makes Us Different?
            </h3>
            <ul className="text-gray-600 leading-relaxed text-left list-disc pl-6">
              <li>We Don’t Just Store Data – We Protect It Until It’s Needed.</li>
              <li>We Verify Before We Share – No Premature Disclosure.</li>
              <li>Your Privacy Is Our Priority – Hidden Transactions Stay Hidden Until You Decide Otherwise.</li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-start">
            <Button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Know More
            </Button>
          </div>
        </div>

        {/* Right Column - Platform Image */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="rounded-lg overflow-hidden">
            <img
              src="/images/about.png"
              alt="Smart Nominee Platform Dashboard"
              className="w-full scale-110 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;