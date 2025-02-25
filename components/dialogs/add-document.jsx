import React, { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDocument } from '@/utils/document-apis';

const AddDocumentDialog = ({ open, onOpenChange, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    document_type: '',
    document_number: '',
    issue_date: '',
    expiry_date: '',
    extra_data: {},
  });
  const [extraDataInput, setExtraDataInput] = useState('');
  const [errors, setErrors] = useState({});

  const documentTypes = [
    { label: "Passport", value: "Passport" },
    { label: "Aadhaar", value: "Aadhaar" },
    { label: "PAN Card", value: "PAN Card" },
    { label: "Driving License", value: "Driving License" },
    { label: "Voter ID", value: "Voter ID" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.document_type) newErrors.document_type = 'Document type is required';
    if (!formData.document_number) newErrors.document_number = 'Document number is required';
    if (!formData.issue_date) newErrors.issue_date = 'Issue date is required';
    if (!formData.expiry_date) newErrors.expiry_date = 'Expiry date is required';
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

  const handleDocumentTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      document_type: value,
    }));
    if (errors.document_type) {
      setErrors(prev => ({
        ...prev,
        document_type: '',
      }));
    }
  };

  const handleExtraDataChange = (e) => {
    const value = e.target.value;
    setExtraDataInput(value);
    try {
      const parsed = value ? JSON.parse(value) : {};
      if (typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Invalid JSON object');
      }
      setFormData(prev => ({
        ...prev,
        extra_data: parsed,
      }));
      setErrors(prev => ({ ...prev, extra_data: '' }));
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        extra_data: 'Please enter a valid JSON object (e.g., {"key": "value"})',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || errors.extra_data) return;

    try {
      setIsSubmitting(true);
      const response = await createDocument(formData);
      console.log('Add Document Response:', response);

      // Check for success based on status only
      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Document added successfully",
        });
        resetForm();
        onSuccess(); // Trigger list refresh in parent
        onOpenChange(false); // Close dialog
      } else {
        throw new Error('Document addition failed');
      }
    } catch (error) {
      console.error('Add Document Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.detail?.[0]?.msg || error.message || 'Failed to add document',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      document_type: '',
      document_number: '',
      issue_date: '',
      expiry_date: '',
      extra_data: {},
    });
    setExtraDataInput('');
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 h-[75vh] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-4 p-4">
              <div className="grid gap-2">
                <Label htmlFor="document_type">Document Type</Label>
                <Select
                  onValueChange={handleDocumentTypeChange}
                  value={formData.document_type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.document_type && <p className="text-destructive text-sm">{errors.document_type}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="document_number">Document Number</Label>
                <Input
                  id="document_number"
                  name="document_number"
                  value={formData.document_number}
                  onChange={handleInputChange}
                  placeholder="Enter document number"
                />
                {errors.document_number && <p className="text-destructive text-sm">{errors.document_number}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issue_date">Issue Date</Label>
                <Input
                  id="issue_date"
                  name="issue_date"
                  type="date"
                  value={formData.issue_date}
                  onChange={handleInputChange}
                />
                {errors.issue_date && <p className="text-destructive text-sm">{errors.issue_date}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry_date">Expiry Date</Label>
                <Input
                  id="expiry_date"
                  name="expiry_date"
                  type="date"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                />
                {errors.expiry_date && <p className="text-destructive text-sm">{errors.expiry_date}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="extra_data">Additional Information (JSON)</Label>
                <Input
                  id="extra_data"
                  name="extra_data"
                  value={extraDataInput}
                  onChange={handleExtraDataChange}
                  placeholder='e.g., {"key": "value"} (optional)'
                />
                {errors.extra_data && <p className="text-destructive text-sm">{errors.extra_data}</p>}
              </div>
            </div>
          </div>
          <DialogFooter className="border-t p-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-32 bg-popover border-foreground"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || errors.extra_data}
              className="w-32"
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;