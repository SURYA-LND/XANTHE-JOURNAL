import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Crown, TestTube } from 'lucide-react';

const Pricing: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Lifetime Access",
      icon: Crown,
      price: "$79",
      period: "one-time",
      description: "Complete trading journal solution - pay once, use forever",
      features: [
        "Unlimited trades & journals",
        "Advanced analytics & insights",
        "Real-time market data",
        "Mobile & desktop apps",
        "Custom templates & fields",
        "Export & backup tools",
        "Priority email support",
        "Lifetime updates included",
        "30-day money-back guarantee"
      ],
      popular: true,
      gradient: "from-neon-purple to-neon-purple-light",
      buttonText: "Start 30-Day Free Trial",
    },
    {
      name: "Free Test Drive",
      icon: TestTube,
      price: "Free",
      period: "forever",
      description: "Try our trading journal with live demo data",
      features: [
        "Interactive journal demo",
        "Pre-loaded sample trades",
        "All core features available",
        "Real journal interface",
        "No credit card required",
        "No time limits",
        "Export demo data",
        "See exactly how it works"
      ],
      popular: false,
      gradient: "from-green-500 to-emerald-500",
      buttonText: "Try Journal Now",
      testCase: true,
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
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-purple-light/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Simple Pricing,
            <span className="block gradient-text">Maximum Value</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            One lifetime payment for unlimited access, or try it completely free with our interactive demo.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`relative group ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-neon-purple to-neon-purple-light text-black px-6 py-2 rounded-full text-sm font-bold">
                    Best Value
                  </span>
                </div>
              )}

              {plan.testCase && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Try It Live
                  </span>
                </div>
              )}

              <div className={`glass-effect p-8 rounded-2xl h-full hover:shadow-neon transition-all duration-500 group-hover:scale-105 ${
                plan.popular ? 'ring-2 ring-neon-purple animate-pulse-slow' : ''
              } ${plan.testCase ? 'ring-2 ring-green-500/50' : ''}`}>
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-4xl md:text-5xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/{plan.period}</span>
                  </div>

                  {plan.popular && (
                    <div className="mb-4">
                      <span className="text-green-400 font-semibold">30-Day Free Trial • No Credit Card</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                        plan.testCase ? 'text-green-400' : 'text-neon-purple'
                      }`} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-neon-purple to-neon-purple-light text-black hover:shadow-neon-strong'
                      : plan.testCase
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-green-500/50 hover:shadow-lg'
                      : 'neon-border bg-transparent text-neon-purple hover:bg-neon-purple/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass-effect p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 gradient-text">Risk-Free Guarantee</h3>
            <p className="text-gray-300 mb-4">
              Try TradeJournal Pro completely free for 30 days. If you're not satisfied, 
              get a full refund - no questions asked. Or test drive with our free demo forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-gray-400">✓ No hidden fees</div>
              <div className="text-sm text-gray-400">✓ Cancel anytime</div>
              <div className="text-sm text-gray-400">✓ Instant access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
