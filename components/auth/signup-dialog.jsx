'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AuthDialog,
  AuthDialogContent,
  AuthDialogDescription,
  AuthDialogHeader,
  AuthDialogTitle,
  AuthDialogTrigger,
  AuthDialogFooter,
} from '@/components/ui/auth-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { saveUserData, signUpUser } from '@/utils/api';
import OtpVerificationDialog from "./otp-verification-dialog";

export default function SignUpDialog() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value
    });
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name) {
      throw new Error("Please enter your full name");
    }
    if (!formData.email) {
      throw new Error("Please enter your email");
    }
    if (!formData.mobile) {
      throw new Error("Please enter your phone number");
    }
    if (!formData.dob) {
      throw new Error("Please enter your date of birth");
    }
    if (!formData.password) {
      throw new Error("Please enter a password");
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (!formData.terms) {
      throw new Error("Please accept the terms and conditions");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      validateForm();
  
      const userData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        mobile: formData.mobile,
        dob: formData.dob,
        password: formData.password
      };
  
      const response = await signUpUser(userData);
      
      // Save user data for OTP verification
      saveUserData(userData.email, userData.mobile);
      
      setSuccess(true);
      toast({
        title: "Success!",
        description: "Account created. Please verify your email.",
        variant: "success",
      });
  
      // Show OTP dialog after signup success
      setTimeout(() => {
        setSuccess(false);
        setShowOtpDialog(true);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.detail?.[0]?.msg || error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
<>
<AuthDialog>
      <AuthDialogTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </AuthDialogTrigger>
      <AuthDialogContent className="sm:max-w-[600px]">
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
                Registration Successful!
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
                  Create Your Account
                </AuthDialogTitle>
                <AuthDialogDescription className="text-sm">
                  Enter your details below to create your account & get started.
                </AuthDialogDescription>
              </AuthDialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="first_name" className="text-[0.7rem] opacity-50 mb-1">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      placeholder="Enter first name"
                      className="placeholder:text-[0.8rem]"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="last_name" className="text-[0.7rem] opacity-50 mb-1">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      placeholder="Enter last name"
                      className="placeholder:text-[0.8rem]"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="email" className="text-[0.7rem] opacity-50 mb-1">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      className="placeholder:text-[0.8rem]"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="mobile" className="text-[0.7rem] opacity-50 mb-1">
                      Phone Number
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter phone number"
                      className="placeholder:text-[0.8rem]"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="dob" className="text-[0.7rem] opacity-50 mb-1">
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      className="placeholder:text-[0.8rem]"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="password" className="text-[0.7rem] opacity-50 mb-1">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="placeholder:text-[0.8rem]"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="confirmPassword" className="text-[0.7rem] opacity-50 mb-1">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="placeholder:text-[0.8rem]"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.terms}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, terms: checked }))
                    }
                  />
                  <Label htmlFor="terms" className="text-xs">
                    I agree to the Privacy Policy and Terms of Service.
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>

              <AuthDialogFooter className="flex items-center justify-center">
                <p className="text-sm text-center w-full">
                  Already have an account?{" "}
                  <span className="text-primary font-semibold cursor-pointer">
                    Login
                  </span>
                </p>
              </AuthDialogFooter>
            </motion.form>
          )}
        </AnimatePresence>
      </AuthDialogContent>
    </AuthDialog>
    
    <OtpVerificationDialog
      isOpen={showOtpDialog}
      onOpenChange={setShowOtpDialog}
      onVerificationSuccess={() => {
        // Show login dialog after successful verification
        // You'll need to implement this logic to show the login dialog
        toast({
          title: "Verification Complete",
          description: "Please login to continue.",
          variant: "success",
        });
      }}
    />
    </>
  );
}