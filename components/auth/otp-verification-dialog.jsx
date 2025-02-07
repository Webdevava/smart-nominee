'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AuthDialog,
  AuthDialogContent,
  AuthDialogDescription,
  AuthDialogHeader,
  AuthDialogTitle,
} from '@/components/ui/auth-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { verifyOtp, resendOtp, getUserData } from '@/utils/api';

export default function OtpVerificationDialog({ 
  isOpen, 
  onOpenChange,
  onVerificationSuccess 
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const userData = getUserData();

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

  const handleResendOtp = async () => {
    if (canResend) {
      try {
        setLoading(true);
        const response = await resendOtp();
        toast({
          title: "Success",
          description: response.message || "OTP sent successfully",
          variant: "success",
        });
        setCanResend(false);
        setCountdown(30);
      } catch (error) {
        toast({
          title: "Error",
          description: error.detail?.[0]?.msg || "Failed to resend OTP",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await verifyOtp(otp);
      setSuccess(true);
      toast({
        title: "Success!",
        description: response.message || "OTP verified successfully",
        variant: "success",
      });

      // Wait for animation and then close
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
        onVerificationSuccess();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.detail?.[0]?.msg || "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthDialog open={isOpen} onOpenChange={onOpenChange}>
      <AuthDialogContent className="sm:max-w-[450px]">
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
                Verification Successful!
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
                  OTP Verification
                </AuthDialogTitle>
                <AuthDialogDescription className="text-sm mt-2">
                  We have sent a verification code to
                </AuthDialogDescription>
                <AuthDialogDescription className="text-sm font-semibold">
                  {userData.email || userData.mobile}
                </AuthDialogDescription>
              </AuthDialogHeader>

              <div className="flex flex-col gap-6 py-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="otp" className="text-[0.7rem] opacity-50 mb-1">
                    Enter Verification Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit code"
                    className="text-center text-2xl tracking-[1em] h-12"
                    maxLength={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="flex items-center justify-center text-sm">
                  <span className="text-gray-500">Didn&apos;t receive code? </span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={!canResend || loading}
                    className={`ml-1 font-semibold ${
                      canResend && !loading
                        ? "text-primary cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </AuthDialogContent>
    </AuthDialog>
  );
}