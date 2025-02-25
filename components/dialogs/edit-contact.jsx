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
import { updateContact } from '@/utils/contact-apis';

const EditContactDialog = ({ open, onOpenChange, contact, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        email: contact.email || '',
        phone_number: contact.phone_number || '',
      });
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email && !formData.phone_number) {
      newErrors.general = 'Either email or phone number is required';
    } else if (formData.email && formData.phone_number) {
      newErrors.general = 'You can only update either email or phone number, not both';
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
    if (errors[name] || errors.general) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const payload = formData.email ? { email: formData.email } : { phone_number: formData.phone_number };
      const response = await updateContact(contact.id, payload);
      console.log('Edit Contact Response:', response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Contact updated successfully",
        });
        resetForm();
        onSuccess(); // Trigger list refresh in parent
        onOpenChange(false); // Close dialog
      } else {
        throw new Error('Contact update failed');
      }
    } catch (error) {
      console.error('Edit Contact Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to update contact',
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
            {errors.general && (
              <p className="text-destructive text-sm">{errors.general}</p>
            )}
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
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactDialog;