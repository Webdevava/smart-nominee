import React from "react";
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
import { Check, CloudUpload, PlusCircle, X } from "lucide-react";

const StepIndicator = ({ number, isCompleted, isCurrent }) => {
    if (isCompleted) {
      return (
        <div className="rounded-full w-6 h-6 flex items-center justify-center bg-primary text-white">
          <Check className="h-4 w-4" />
        </div>
      );
    }
    
    if (isCurrent) {
      return (
        <div className="rounded-full w-6 h-6 flex items-center justify-center border-2 border-primary bg-transparent relative">
          <div className="rounded-full w-2 h-2 bg-primary absolute" />
        </div>
      );
    }
    
    return (
      <div className="rounded-full w-6 h-6 flex items-center justify-center border-2 border-muted-foreground">
        
      </div>
    );
  };

const AddBankDialog = ({ open, onOpenChange }) => {
  const [step, setStep] = React.useState(1);
  const [nominees, setNominees] = React.useState([]);

  const steps = [
    { number: 1, title: "Bank Details" },
    { number: 2, title: "Nominee Details" },
    { number: 3, title: "Upload bank Doc" },
  ];

  const addNominee = () => {
    setNominees([
      ...nominees,
      { id: Date.now(), name: "", relation: "", percentage: "" },
    ]);
  };

  const removeNominee = (id) => {
    setNominees(nominees.filter((nominee) => nominee.id !== id));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name*</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank1">Bank 1</SelectItem>
                    <SelectItem value="bank2">Bank 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name*</Label>
                <Input
                  id="accountHolder"
                  placeholder="Enter account holder name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name*</Label>
                <Input id="branchName" placeholder="Select branch" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number*</Label>
                <Input id="accountNumber" placeholder="Enter account number" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ifsc">IFSC Code*</Label>
                <Input id="ifsc" placeholder="Enter IFSC code" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type*</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Linked Mobile Number*</Label>
                <Input id="mobile" placeholder="Enter mobile no" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 h-96 ">
            <Button
              type="button"
              variant="outline"
              onClick={addNominee}
              className="w-full"
            >
              <PlusCircle />
              Add Nominee
            </Button>

            {nominees.map((nominee, index) => (
              <div
                key={nominee.id}
                className="p-4 border rounded-lg space-y-3 relative bg-card"
              >
                <div className="flex justify-between items-center">
                  <h1 className=" font-semibold">Nominee {index + 1}</h1>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-6 w-6"
                    onClick={() => removeNominee(nominee.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nominee Relation*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Nominee Name*</Label>
                    <Input placeholder="Enter nominee name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Percentage*</Label>
                    <Input
                      type="number"
                      placeholder="Enter percentage"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 px-6">
            <div className="border-2 border-dashed bg-card/50 rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center">
                <CloudUpload className="h-12 w-12 text-primary" />
              </div>
              <div>
                <p className="text-base font-medium">
                  Select your file or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, PDF, JPG file accepted (Max 5mb)
                </p>
              </div>
              <Button type="button" variant="outline" className="mt-4 bg-popover">
                Browse
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 h-[75vh] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Add Bank Details</DialogTitle>
        </DialogHeader>

        <div className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className={`flex items-center ${s.number > step ? 'opacity-50' : ''}`}>
                  <StepIndicator 
                    number={s.number}
                    isCompleted={step > s.number}
                    isCurrent={step === s.number}
                  />
                  <div className="ml-2">
                    <div className="text-xs text-gray-500">STEP {s.number}</div>
                    <div className="text-sm font-medium">{s.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 mx-4 h-px ${step > index + 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form className="flex flex-col h-full">
          <div className="flex-1 p-4 overflow-y-auto">
            {renderStepContent()}
          </div>

          <DialogFooter className="border-t p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (step === 1) onOpenChange(false);
                else setStep(step - 1);
              }}
              className="w-32 bg-popover border-foreground"
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              type="button"
              className="w-32"
              onClick={() => {
                if (step === 3) onOpenChange(false);
                else setStep(step + 1);
              }}
            >
              {step === 3 ? "Save" : "Next"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBankDialog;
