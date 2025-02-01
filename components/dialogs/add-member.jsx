import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AddMemberDialog = ({ open, onOpenChange }) => {
  const [selectedDocType, setSelectedDocType] = useState("");

  const documentTypes = [
    "Aadhaar Card",
    "PAN Card",
    "Passport",
    "Driving License",
    "Voting Card",
    "Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 h-[75vh] flex flex-col">
        <DialogHeader className={'p-4 border-b'}>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
<form onSubmit={handleSubmit} className='flex flex-col h-full' >
        <div  className="flex-1">
        <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select onValueChange={(value) => setSelectedDocType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(" ", "-")}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDocType && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="documentNumber">Document Number</Label>
                  <Input 
                    id="documentNumber" 
                    placeholder="Enter document number"
                    className="w-full"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="documentFile">Upload Document</Label>
                  <Input 
                    id="documentFile" 
                    type="file" 
                    className="w-full"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              </>
            )}
          </div>
        </div>

          <DialogFooter className={'border-t p-4'}>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-32 bg-popover border-foreground" >
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedDocType} className="w-32" >Add</Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;