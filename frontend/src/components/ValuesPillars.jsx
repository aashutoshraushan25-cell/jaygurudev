import React from 'react';
import { Users, Sprout, Heart, Compass } from 'lucide-react';

export const ValuesPillars = () => {
  const values = [
    {
      icon: Users,
      bgColor: 'bg-[#FBBF24]', // Warm Yellow
      iconColor: 'text-white',
      title: 'सभी के लिए खुला',
      subtitle: 'जाति, धर्म, वर्ग से ऊपर',
    },
    {
      icon: Sprout,
      bgColor: 'bg-[#48BB78]', // Warm Green
      iconColor: 'text-white',
      title: 'मानवता की सेवा',
      subtitle: 'हमारा मुख्य उद्देश्य',
    },
    {
      icon: Heart,
      bgColor: 'bg-[#E53E3E]', // Warm Red
      iconColor: 'text-white',
      title: 'प्रेम और सद्भाव',
      subtitle: 'एक बेहतर समाज के लिए',
    },
    {
      icon: Users,
      bgColor: 'bg-[#3182CE]', // Warm Blue
      iconColor: 'text-white',
      title: 'सत्य का मार्ग',
      subtitle: 'आत्मिक शांति की ओर',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {values.map((v, idx) => {
        const Icon = v.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-[#EBE3DA] shadow-card flex items-center gap-3.5 transition-all hover:shadow-md"
          >
            {/* Colored Circle Icon */}
            <div
              className={`w-12 h-12 rounded-full ${v.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}
            >
              <Icon className={`w-6 h-6 ${v.iconColor}`} />
            </div>

            {/* Content */}
            <div className="flex flex-col font-devanagari">
              <h3 className="text-base font-black text-gray-900 leading-tight">
                {v.title}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {v.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};
