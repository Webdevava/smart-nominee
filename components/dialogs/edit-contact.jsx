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
  const [contactType, setContactType] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        email: contact.email || '',
        phone_number: contact.phone_number || '',
      });
      // Determine contact type
      setContactType(contact.email ? 'email' : 'phone');
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};
    if (contactType === 'email' && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (contactType === 'phone' && !formData.phone_number) {
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
    if (!validateForm() || !contact) return;

    try {
      setIsSubmitting(true);
      const payload = contactType === 'email' 
        ? { email: formData.email } 
        : { phone_number: formData.phone_number };
        
      const response = await updateContact(contact.id, payload);
      console.log('Edit Contact Response:', response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Contact updated successfully",
        });
        onSuccess(); // Trigger list refresh in parent
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

  const handleClose = () => {
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit {contactType === 'email' ? 'Email' : 'Phone Number'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {contactType === 'email' ? (
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
            ) : (
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