import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Brain, Smartphone, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FileText,
      title: "Journal Template/Custom Database",
      description: "Customizable trading journal templates with flexible database structure to track your trades exactly how you want.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "AI Analytics",
      description: "Advanced machine learning algorithms to analyze your trading patterns and provide insights (Coming Soon).",
      gradient: "from-blue-500 to-purple-500",
      comingSoon: true,
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Native mobile apps for iOS and Android with full feature parity for trading on the go.",
      gradient: "from-yellow-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Real-time Sync",
      description: "Instant synchronization across all your devices and trading platforms for seamless experience.",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-neon-purple-light/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Core Features for
            <span className="block gradient-text">Trading Success</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Essential tools designed specifically for professional traders to journal, track, and optimize their trading performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-effect p-8 rounded-2xl h-full hover:shadow-neon transition-all duration-500 group-hover:scale-105 relative overflow-hidden">
                {feature.comingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-neon-purple to-neon-purple-light text-black px-3 py-1 rounded-full text-xs font-bold">
                      Soon
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-neon-purple transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-neon-purple/50 animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Center Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="glass-effect p-12 rounded-3xl max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-purple-light/5 rounded-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
                Join 50,000+ Professional Traders
              </h3>
              <p className="text-lg text-gray-300 mb-8">
                Trusted by traders worldwide to manage over $2.5B in trading capital
              </p>
              <motion.button
                className="bg-gradient-to-r from-neon-purple to-neon-purple-light text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-neon-strong transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Free Trial
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
