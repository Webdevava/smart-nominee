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
import { FileText, Trash2, X } from 'lucide-react';

const AddDocumentDialog = ({ open, onOpenChange }) => {
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  const documentTypes = [
    "Aadhaar Card",
    "PAN Card",
    "Passport",
    "Driving License",
    "Voting Card",
    "Other"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) { // 2MB in bytes
      setSelectedFile(file);
    } else {
      alert('File size should be less than 2MB');
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 h-[75vh] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1">
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
                    <div className="relative">
                      <div className="flex items-center border rounded-md">
                        <label className="cursor-pointer flex justify-between items-center w-full p-1">
                          <div className="bg-accent h-fit text-xs text-primary px-4 py-1.5 rounded-md">
                            Upload
                          </div>
                          <span className="px-4 text-xs text-gray-500">
                          Up to 2MB
                        </span>
                          <Input
                            id="documentFile"
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            disabled={selectedFile !== null}
                          />

                        </label>
                     
                      </div>
                      {selectedFile && (
                        <div className="mt-2 flex items-center justify-between rounded-md">
                          <span className="text-sm truncate flex items-center gap-1">
                          <FileText className="h-4 w-4"/>
                            {selectedFile.name}
                          </span>
                          <button
                            type="button"
                            onClick={handleFileDelete}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter className="border-t p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-32 bg-popover border-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedDocType}
              className="w-32"
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDocumentDialog;