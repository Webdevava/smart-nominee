import React, { useState, useEffect } from "react";
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
import { Check, CloudUpload } from "lucide-react";
import { validateIFSC, editBankAccount, addPassbook } from "@/utils/bank-apis";
import { useToast } from "@/hooks/use-toast";

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
    <div className="rounded-full w-6 h-6 flex items-center justify-center border-2 border-muted-foreground" />
  );
};

const EditBankDialog = ({ open, onOpenChange, bank, onSuccess }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    account_holder_name: "",
    bank_name: "",
    branch_name: "",
    account_number: "",
    ifsc_code: "",
    account_type: "Savings",
    linked_mobile_number: "",
    account_balance: 0,
    account_opening_date: "",
    account_status: "Active",
    notes: "",
  });
  const [file, setFile] = useState(null);

  const steps = [
    { number: 1, title: "Bank Details" },
    { number: 2, title: "Upload Bank Doc" },
  ];

  useEffect(() => {
    if (bank) {
      setBankDetails({
        account_holder_name: bank.account_holder_name || "",
        bank_name: bank.bank_name || "",
        branch_name: bank.branch_name || "",
        account_number: bank.account_number || "",
        ifsc_code: bank.ifsc_code || "",
        account_type: bank.account_type || "Savings",
        linked_mobile_number: bank.linked_mobile_number || "",
        account_balance: bank.account_balance || 0,
        account_opening_date: bank.account_opening_date || "",
        account_status: bank.account_status || "Active",
        notes: bank.notes || "",
      });
    }
  }, [bank]);

  const handleIFSCValidation = async () => {
    try {
      const response = await validateIFSC(bankDetails.ifsc_code);
      const { bank, branch } = response.data;
      setBankDetails((prev) => ({
        ...prev,
        bank_name: bank,
        branch_name: branch,
      }));
    } catch (error) {
      console.error("IFSC Validation Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to validate IFSC code",
      });
    }
  };

  const handleSubmit = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await editBankAccount(bank.id, bankDetails);
      console.log("Edit Bank Response:", response);

      if (response.status === true) {
        if (file) {
          await addPassbook(bank.id, file);
          console.log("Passbook Uploaded");
        }

        toast({
          title: "Success",
          description: response.message || "Bank account updated successfully",
        });
        resetForm();
        onSuccess();
        onOpenChange(false);
      } else {
        throw new Error("Bank account update failed");
      }
    } catch (error) {
      console.error("Edit Bank Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update bank account",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setBankDetails({
      account_holder_name: "",
      bank_name: "",
      branch_name: "",
      account_number: "",
      ifsc_code: "",
      account_type: "Savings",
      linked_mobile_number: "",
      account_balance: 0,
      account_opening_date: "",
      account_status: "Active",
      notes: "",
    });
    setFile(null);
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name*</Label>
                <Input
                  id="accountHolder"
                  placeholder="Enter account holder name"
                  value={bankDetails.account_holder_name}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, account_holder_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ifsc">IFSC Code*</Label>
                <Input
                  id="ifsc"
                  placeholder="Enter IFSC code"
                  value={bankDetails.ifsc_code}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, ifsc_code: e.target.value })
                  }
                  onBlur={handleIFSCValidation}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name*</Label>
                <Input
                  id="bankName"
                  placeholder="Bank Name"
                  value={bankDetails.bank_name}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branchName">Branch Name*</Label>
                <Input
                  id="branchName"
                  placeholder="Branch Name"
                  value={bankDetails.branch_name}
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number*</Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={bankDetails.account_number}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, account_number: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type*</Label>
                <Select
                  value={bankDetails.account_type}
                  onValueChange={(value) =>
                    setBankDetails({ ...bankDetails, account_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Linked Mobile Number*</Label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile no"
                  value={bankDetails.linked_mobile_number}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, linked_mobile_number: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountBalance">Account Balance*</Label>
                <Input
                  id="accountBalance"
                  type="number"
                  placeholder="Enter account balance"
                  value={bankDetails.account_balance}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, account_balance: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountOpeningDate">Account Opening Date*</Label>
                <Input
                  id="accountOpeningDate"
                  type="date"
                  value={bankDetails.account_opening_date}
                  onChange={(e) =>
                    setBankDetails({ ...bankDetails, account_opening_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountStatus">Account Status*</Label>
                <Select
                  value={bankDetails.account_status}
                  onValueChange={(value) =>
                    setBankDetails({ ...bankDetails, account_status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Enter notes"
                value={bankDetails.notes}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, notes: e.target.value })
                }
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 px-6">
            <div className="border-2 border-dashed bg-card/50 rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center">
                <CloudUpload className="h-12 w-12 text-primary" />
              </div>
              <div>
                <p className="text-base font-medium">Select your file or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, PDF, JPG file accepted (Max 5mb)</p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-4 bg-popover"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Browse
              </Button>
              <Input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && <p className="text-sm mt-2">{file.name}</p>}
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
          <DialogTitle>Edit Bank Details</DialogTitle>
        </DialogHeader>

        <div className="px-4 py-3 border-b">
          <div className="flex justify-between items-center">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className={`flex items-center ${s.number > step ? "opacity-50" : ""}`}>
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
                  <div className={`flex-1 mx-4 h-px ${step > index + 1 ? "bg-primary" : "bg-gray-200"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form className="flex flex-col h-full">
          <div className="flex-1 p-4 overflow-y-auto">{renderStepContent()}</div>

          <DialogFooter className="border-t p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (step === 1) onOpenChange(false);
                else setStep(step - 1);
              }}
              className="w-32 bg-popover border-foreground"
              disabled={isSubmitting}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              type="button"
              className="w-32"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : step === 2 ? "Update" : "Next"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBankDialog;