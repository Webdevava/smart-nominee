import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail } from "lucide-react";
import { addContact } from '@/utils/contact-apis';

const AddContactDialog = ({ open, onOpenChange, onSuccess, defaultType = "phone" }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactType, setContactType] = useState(defaultType);
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState({});

  // Update contact type when defaultType prop changes
  useEffect(() => {
    setContactType(defaultType);
  }, [defaultType]);

  const validateForm = () => {
    const newErrors = {};
    if (contactType === "email" && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (contactType === "phone" && !formData.phone_number) {
      newErrors.phone_number = 'Phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const payload = contactType === "email" 
        ? { email: formData.email } 
        : { phone_number: formData.phone_number };
        
      const response = await addContact(payload);
      console.log('Add Contact Response:', response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Contact added successfully",
        });
        resetForm();
        onSuccess(); // Trigger list refresh in parent
      } else {
        throw new Error('Contact addition failed');
      }
    } catch (error) {
      console.error('Add Contact Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to add contact',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', phone_number: '' });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleTabChange = (value) => {
    setContactType(value);
    // Clear errors when switching tabs
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Tabs 
              value={contactType} 
              onValueChange={handleTabChange} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone" className="mt-0">
                <div className="grid gap-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                  {errors.phone_number && (
                    <p className="text-destructive text-sm">{errors.phone_number}</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="mt-0">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;