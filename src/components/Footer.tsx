import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Analytics", "Mobile App", "API Docs"]
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Contact", "Blog"]
    },
    {
      title: "Resources",
      links: ["Help Center", "Community", "Tutorials", "Webinars", "Status"]
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Security", "Compliance"]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Github, href: "#", name: "GitHub" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Mail, href: "#", name: "Email" }
  ];

  return (
    <footer className="relative bg-background border-t border-primary/20">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <img src="https://i.ibb.co/dG7pB0m/xanthe-icon.jpg" alt="Xanthe Journal Icon" className="w-10 h-10 rounded-lg" />
                <span className="text-2xl font-bold text-accent">Xanthe Journal</span>
              </motion.div>
              
              <p className="text-text-secondary mb-6 max-w-md">
                The most advanced trading journal platform trusted by professional traders worldwide. 
                Elevate your trading performance with AI-powered analytics and insights.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center text-text-secondary hover:text-primary transition-colors duration-300 border border-transparent hover:border-primary/30"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-accent font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-text-secondary hover:text-primary transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-secondary text-sm mb-4 md:mb-0">
              © 2025 Xanthe Journal. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <motion.a
                href="#"
                className="hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Cookies
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
