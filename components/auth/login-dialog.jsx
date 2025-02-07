'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'; // or 'next/router' for older Next.js versions
import {
  AuthDialog,
  AuthDialogContent,
  AuthDialogDescription,
  AuthDialogHeader,
  AuthDialogTitle,
  AuthDialogTrigger,
} from '@/components/ui/auth-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/utils/api';

export default function LoginDialog() {
  const { toast } = useToast();
  const router = useRouter(); // Initialize the router
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(formData.mobile, formData.password);
      setSuccess(true);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
        variant: "success",
      });

      // Redirect to /dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard'); // Redirect to the dashboard
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.detail?.[0]?.msg || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthDialog>
      <AuthDialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </AuthDialogTrigger>
      <AuthDialogContent className="sm:max-w-[425px]">
        <AnimatePresence>
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center justify-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CheckCircle className="w-24 h-24 text-green-500" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold mt-4"
              >
                Login Successful!
              </motion.p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <AuthDialogHeader className="flex items-center justify-center flex-col text-center">
                <AuthDialogTitle className="text-3xl font-bold">
                  Welcome Back
                </AuthDialogTitle>
                <AuthDialogDescription className="text-sm">
                  Login to your account below
                </AuthDialogDescription>
              </AuthDialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="flex flex-col">
                  <Label
                    htmlFor="mobile"
                    className="text-left text-[0.7rem] opacity-50 mb-1"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter phone number"
                    className="col-span-3 placeholder:text-[0.8rem]"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <Label
                    htmlFor="password"
                    className="text-left text-[0.7rem] opacity-50 mb-1"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="col-span-3 placeholder:text-[0.8rem]"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </AuthDialogContent>
    </AuthDialog>
  );
}