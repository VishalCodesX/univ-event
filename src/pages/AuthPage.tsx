import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  const ForgotPasswordForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md bg-gradient-card shadow-xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Reset Password</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>
          <Button variant="hero" size="lg" className="w-full">
            Send Reset Link
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setMode("login")}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === "signup" ? 50 : mode === "forgot" ? -50 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "signup" ? -50 : mode === "forgot" ? 50 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {mode === "login" && (
              <LoginForm 
                onToggleMode={() => setMode("signup")}
                onForgotPassword={() => setMode("forgot")}
              />
            )}
            {mode === "signup" && (
              <SignupForm onToggleMode={() => setMode("login")} />
            )}
            {mode === "forgot" && <ForgotPasswordForm />}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-white/20 rounded-full blur-lg"></div>
    </div>
  );
}