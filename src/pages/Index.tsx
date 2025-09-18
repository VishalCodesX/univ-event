// Update the index page with proper styling using design system
import { useState } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { motion } from "framer-motion";
import { Calendar, Users, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  const [selectedDemo, setSelectedDemo] = useState<"student" | "organizer" | "admin">("student");

  const demoOptions = [
    {
      role: "student" as const,
      title: "Student Dashboard",
      description: "Browse events, register, and manage your schedule",
      icon: Calendar,
      color: "from-blue-500 to-blue-600"
    },
    {
      role: "organizer" as const,
      title: "Event Organizer",
      description: "Create events, manage registrations, and track analytics",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      role: "admin" as const,
      title: "Administrator",
      description: "Oversee all events, users, and system analytics",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600"
    }
  ];

  const handleDemoAccess = (role: "student" | "organizer" | "admin") => {
    window.location.href = `/${role}`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/20 rounded-full blur-lg"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Campus Event
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Manager
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            The complete solution for managing campus events, registrations, and community engagement.
          </motion.p>

          {/* Demo Access Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {demoOptions.map((option, index) => (
              <motion.div
                key={option.role}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center cursor-pointer group hover:bg-white/15 transition-all duration-300"
                onClick={() => handleDemoAccess(option.role)}
              >
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{option.title}</h3>
                <p className="text-white/80 text-sm mb-4">{option.description}</p>
                <div className="flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium mr-2">Try Demo</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="space-y-4"
          >
            <Button 
              variant="glass" 
              size="xl"
              className="text-lg font-semibold px-8 py-4 mx-4"
              onClick={() => window.location.href = "/auth"}
            >
              Get Started
            </Button>
            <p className="text-white/70 text-sm">
              Experience the full authentication flow and dashboard
            </p>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: "Event Management", value: "Complete" },
              { label: "User Roles", value: "3 Types" },
              { label: "Authentication", value: "Multi-provider" },
              { label: "Analytics", value: "Real-time" }
            ].map((feature, index) => (
              <div key={feature.label} className="text-white/80">
                <div className="text-2xl font-bold text-white">{feature.value}</div>
                <div className="text-sm">{feature.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
