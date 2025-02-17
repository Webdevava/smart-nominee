// components/PricingSection.jsx
import { Zap, Layers, Database } from 'lucide-react';
import Link from 'next/link';

const PricingSection = () => {
  const plans = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      name: "Basic plan",
      price: "₹ 100",
      period: "/mth",
      billing: "Billed annually.",
      features: [
        "Access to all basic features",
        "Basic reporting and analytics",
        "Up to 10 individual users",
        "20GB individual data each user",
        "Basic chat and email support"
      ],
      isPopular: false
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      name: "Standard plan",
      price: "₹ 200",
      period: "/mth",
      billing: "Billed annually.",
      features: [
        "200+ integrations",
        "Advanced reporting and analytics",
        "Up to 20 individual users",
        "40GB individual data each user",
        "Priority chat and email support"
      ],
      isPopular: true
    },
    {
      icon: <Database className="w-6 h-6 text-blue-600" />,
      name: "Enterprise plan",
      price: "₹ 500",
      period: "/mth",
      billing: "Billed annually.",
      features: [
        "Advanced custom fields",
        "Audit log and data history",
        "Unlimited individual users",
        "Unlimited individual data",
        "Personalised+priority service"
      ],
      isPopular: false
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50" id='pricing'>
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="bg-gradient-to-r from-blue-50  to-transparent text-blue-600 px-6 py-2  text-sm font-medium">
            Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Choose Your Right Plan!
          </h2>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-24">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.isPopular 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white'
              }`}
            >
              {/* Icon */}
    <div className=' flex items-center justify-center flex-col'>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                plan.isPopular ? 'bg-white' : 'bg-blue-50'
              }`}>
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="text-lg text-primary font-medium mb-4">
                {plan.name}
              </h3>
    </div>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-lg">{plan.period}</span>
              </div>

              {/* Billing Period */}
              <p className={`text-sm ${
                plan.isPopular ? 'text-blue-100' : 'text-gray-600'
              } mb-6`}>
                {plan.billing}
              </p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-3 ${
                        plan.isPopular ? 'text-blue-200' : 'text-blue-600'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={`${
                      plan.isPopular ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="#"
                className={`block w-full py-3 px-6 text-center rounded-lg font-medium transition-colors ${
                  plan.isPopular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;