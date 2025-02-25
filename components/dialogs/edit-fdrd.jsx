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
import { useToast } from "@/hooks/use-toast";
import { updateDeposit, addDepositDoc } from "@/utils/deposit-api";
import { Check, CloudUpload } from "lucide-react";

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

const EditFDRDDialog = ({ open, onOpenChange, deposit, onSuccess }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depositData, setDepositData] = useState({
    name: "",
    deposit_type: "FD",
    installment: "",
    installment_type: "One Time",
    interest_rate: "",
    tenure: "",
    maturity_date: "",
    maturity_amount: "",
    linked_mobile_number: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: "Deposit Details" },
    { number: 2, title: "Upload Document" },
  ];

  const installmentTypes = {
    FD: ["One Time", "Monthly", "Quarterly", "Annually"],
    RD: ["Monthly", "Quarterly", "Annually"],
  };

  useEffect(() => {
    if (deposit) {
      setDepositData({
        name: deposit.name || "",
        deposit_type: deposit.deposit_type || "FD",
        installment: deposit.installment || "",
        installment_type: deposit.installment_type || (deposit.deposit_type === "FD" ? "One Time" : "Monthly"),
        interest_rate: deposit.interest_rate || "",
        tenure: deposit.tenure || "",
        maturity_date: deposit.maturity_date || "",
        maturity_amount: deposit.maturity_amount || "",
        linked_mobile_number: deposit.linked_mobile_number || "",
      });
    }
  }, [deposit]);

  const validateForm = () => {
    const newErrors = {};
    if (!depositData.name) newErrors.name = "Name is required";
    if (!depositData.installment) newErrors.installment = "Installment amount is required";
    if (!depositData.installment_type) newErrors.installment_type = "Installment type is required";
    if (!depositData.interest_rate) newErrors.interest_rate = "Interest rate is required";
    if (!depositData.tenure) newErrors.tenure = "Tenure is required";
    if (!depositData.maturity_date) newErrors.maturity_date = "Maturity date is required";
    if (!depositData.maturity_amount) newErrors.maturity_amount = "Maturity amount is required";
    if (!depositData.linked_mobile_number) newErrors.linked_mobile_number = "Linked mobile number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setDepositData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "deposit_type" && { installment_type: value === "FD" ? "One Time" : "Monthly" }),
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (step === 1) {
      if (!validateForm()) return;
      setStep(2);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await updateDeposit(deposit.id, depositData);
      console.log("Edit Deposit Response:", response);

      if (response.status === true) {
        if (file) {
          await addDepositDoc(deposit.id, file);
          console.log("Document Uploaded");
        }

        toast({
          title: "Success",
          description: response.message || "Deposit updated successfully",
        });
        resetForm();
        onSuccess();
        onOpenChange(false);
      } else {
        throw new Error("Deposit update failed");
      }
    } catch (error) {
      console.error("Edit Deposit Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update deposit",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setDepositData({
      name: "",
      deposit_type: "FD",
      installment: "",
      installment_type: "One Time",
      interest_rate: "",
      tenure: "",
      maturity_date: "",
      maturity_amount: "",
      linked_mobile_number: "",
    });
    setFile(null);
    setErrors({});
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name*</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter deposit name"
                  value={depositData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit_type">Deposit Type*</Label>
                <Select
                  value={depositData.deposit_type}
                  onValueChange={(value) => handleSelectChange("deposit_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select deposit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FD">Fixed Deposit (FD)</SelectItem>
                    <SelectItem value="RD">Recurring Deposit (RD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="installment">Installment*</Label>
                <Input
                  id="installment"
                  name="installment"
                  placeholder="Enter installment amount"
                  value={depositData.installment}
                  onChange={handleInputChange}
                />
                {errors.installment && <p className="text-destructive text-sm">{errors.installment}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="installment_type">Installment Type*</Label>
                <Select
                  value={depositData.installment_type}
                  onValueChange={(value) => handleSelectChange("installment_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select installment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {installmentTypes[depositData.deposit_type].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.installment_type && (
                  <p className="text-destructive text-sm">{errors.installment_type}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest_rate">Interest Rate*</Label>
                <Input
                  id="interest_rate"
                  name="interest_rate"
                  placeholder="Enter interest rate"
                  value={depositData.interest_rate}
                  onChange={handleInputChange}
                />
                {errors.interest_rate && <p className="text-destructive text-sm">{errors.interest_rate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (Months)*</Label>
                <Input
                  id="tenure"
                  name="tenure"
                  placeholder="Enter tenure in months"
                  value={depositData.tenure}
                  onChange={handleInputChange}
                />
                {errors.tenure && <p className="text-destructive text-sm">{errors.tenure}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maturity_date">Maturity Date*</Label>
                <Input
                  id="maturity_date"
                  name="maturity_date"
                  type="date"
                  value={depositData.maturity_date}
                  onChange={handleInputChange}
                />
                {errors.maturity_date && <p className="text-destructive text-sm">{errors.maturity_date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="maturity_amount">Maturity Amount*</Label>
                <Input
                  id="maturity_amount"
                  name="maturity_amount"
                  placeholder="Enter maturity amount"
                  value={depositData.maturity_amount}
                  onChange={handleInputChange}
                />
                {errors.maturity_amount && <p className="text-destructive text-sm">{errors.maturity_amount}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linked_mobile_number">Linked Mobile Number*</Label>
              <Input
                id="linked_mobile_number"
                name="linked_mobile_number"
                placeholder="Enter linked mobile number"
                value={depositData.linked_mobile_number}
                onChange={handleInputChange}
              />
              {errors.linked_mobile_number && (
                <p className="text-destructive text-sm">{errors.linked_mobile_number}</p>
              )}
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
          <DialogTitle>Edit Fixed Deposit (FD) / Recurring Deposit (RD)</DialogTitle>
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
              {isSubmitting ? "Saving..." : step === 2 ? "Save" : "Next"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFDRDDialog;