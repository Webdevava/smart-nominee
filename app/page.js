'use client'
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react';
import {
  AuthDialog,
  AuthDialogContent,
  AuthDialogDescription,
  AuthDialogFooter,
  AuthDialogHeader,
  AuthDialogTitle,
  AuthDialogTrigger,
} from '@/components/ui/auth-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Page() {

    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [otp, setOtp] = useState("");
    const [canResend, setCanResend] = useState(false);
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
      let timer;
      if (!canResend && countdown > 0) {
        timer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      }
      if (countdown === 0) {
        setCanResend(true);
      }
      return () => clearInterval(timer);
    }, [countdown, canResend]);

    const handleOtpChange = (e) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      if (value.length <= 6) {
        setOtp(value);
      }
    };

    const handleResendOtp = () => {
      if (canResend) {
        setCanResend(false);
        setCountdown(30);
        // Add your resend OTP logic here
      }
    };
  return (
    <div>
      <AuthDialog>
        <AuthDialogTrigger asChild>
          <Button variant="outline">Hello</Button>
        </AuthDialogTrigger>
        <AuthDialogContent className="sm:max-w-[425px]">
          <AuthDialogHeader className="flex items-center justify-center flex-col text-center">
            <AuthDialogTitle className="text-3xl font-bold">
              Welcome Back
            </AuthDialogTitle>
            <AuthDialogDescription className="text-sm">
              Glad to see you again 👋
            </AuthDialogDescription>
            <AuthDialogDescription className="text-sm">
              Login to your account below
            </AuthDialogDescription>
          </AuthDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col">
              <Label
                htmlFor="email"
                className="text-left text-[0.7rem] opacity-50 mb-1"
              >
                Name
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                className="col-span-3 placeholder:text-[0.8rem]"
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
                className="col-span-3 placeholder:text-[0.8rem] "
              />
              <p className="text-right text-[0.7rem] mt-1 text-primary font-semibold">
                Forgot Password?
              </p>
            </div>
          </div>
          <Button type="submit">Login</Button>
          <AuthDialogFooter className="flex items-center justify-center">
            <p className="text-sm text-center w-full">
              Don&apos;t have account?{" "}
              <span className="text-primary font-semibold">Sign Up</span>
            </p>
          </AuthDialogFooter>
        </AuthDialogContent>
      </AuthDialog>

      <AuthDialog>
        <AuthDialogTrigger asChild>
          <Button variant="outline">Sign Up</Button>
        </AuthDialogTrigger>
        <AuthDialogContent className="sm:max-w-[600px]">
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
                <Label
                  htmlFor="fullname"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  placeholder="Enter full name"
                  className="placeholder:text-[0.8rem]"
                />
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="email"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="placeholder:text-[0.8rem]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label
                  htmlFor="phone"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="placeholder:text-[0.8rem]"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="dob" className="text-[0.7rem] opacity-50 mb-1">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  className="placeholder:text-[0.8rem]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label
                  htmlFor="password"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="placeholder:text-[0.8rem]"
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
              <div className="flex flex-col">
                <Label
                  htmlFor="confirmPassword"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="placeholder:text-[0.8rem]"
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
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-xs">
                I agreed to Privacy policy and Terms of service.
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <AuthDialogFooter className="flex items-center justify-center">
            <p className="text-sm text-center w-full">
              Already have an account?{" "}
              <span className="text-primary font-semibold cursor-pointer">
                Login
              </span>
            </p>
          </AuthDialogFooter>
        </AuthDialogContent>
      </AuthDialog>

      <AuthDialog>
        <AuthDialogTrigger asChild>
          <Button variant="outline">Verify OTP</Button>
        </AuthDialogTrigger>
        <AuthDialogContent className="sm:max-w-[450px]">
          <AuthDialogHeader className="flex items-center justify-center flex-col text-center">
            <AuthDialogTitle className="text-3xl font-bold">
              OTP Verification
            </AuthDialogTitle>
            <AuthDialogDescription className="text-sm mt-2 text-center">
              We have sent 4-digit code to your registered email
              test**@gmail.com
            </AuthDialogDescription>
          </AuthDialogHeader>

          <div className="flex flex-col gap-6 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="otp" className="text-[0.7rem] opacity-50 mb-1">
                OTP
              </Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                className="font-medium h-12"
                maxLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 6}
            >
              Verify OTP
            </Button>

            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-500">Didn&apos;t Get OTP? </span>
              <button
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`ml-1 font-semibold ${
                  canResend
                    ? "text-primary cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
              </button>
            </div>
          </div>
        </AuthDialogContent>
      </AuthDialog>

      <AuthDialog>
        <AuthDialogTrigger asChild>
          <Button variant="outline">Reset Pass</Button>
        </AuthDialogTrigger>
        <AuthDialogContent className="sm:max-w-[450px]">
          <AuthDialogHeader className="flex items-center justify-center flex-col text-center">
            <AuthDialogTitle className="text-3xl font-bold">
              Set a New Password
            </AuthDialogTitle>
            <AuthDialogDescription className="text-sm text-center">
              Create a new password. Ensure it differs from previous ones for
              security
            </AuthDialogDescription>
          </AuthDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Label
                  htmlFor="password"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="placeholder:text-[0.8rem]"
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
              <div className="flex flex-col">
                <Label
                  htmlFor="confirmPassword"
                  className="text-[0.7rem] opacity-50 mb-1"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="placeholder:text-[0.8rem]"
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
            </div>
          </div>

          <AuthDialogFooter className="flex items-center justify-center">
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </AuthDialogFooter>
        </AuthDialogContent>
      </AuthDialog>
    </div>
  );
}