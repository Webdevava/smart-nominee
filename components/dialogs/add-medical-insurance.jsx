import React, { useState } from "react";
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
import { createMedicalInsurance, uploadMedicalInsuranceDocument } from "@/utils/insurance-apis";
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

const AddMedicalInsuranceDialog = ({ open, onOpenChange, onSuccess }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [insuranceDetails, setInsuranceDetails] = useState({
    policy_name: "",
    policy_number: "",
    policy_type: "Family",
    insurer_name: "",
    sum_insured: 0,
    premium_amount: 0,
    policy_term: 0,
    maturity_date: "",
    start_date: "",
    linked_mobile: "",
    coverage_details: [],
  });
  const [file, setFile] = useState(null);

  const steps = [
    { number: 1, title: "Insurance Details" },
    { number: 2, title: "Upload Document" },
  ];

  const handleAddInsurance = async () => {
    try {
      setIsSubmitting(true);
      const response = await createMedicalInsurance(insuranceDetails);
      console.log("Add Medical Insurance Response:", response);

      if (response.status === true) {
        const insuranceId = response.data?.id; // Adjust based on your API response structure
        if (file && insuranceId) {
          await uploadMedicalInsuranceDocument(insuranceId, file);
          console.log("Document Uploaded");
        }

        toast({
          title: "Success",
          description: response.message || "Medical insurance added successfully",
        });
        resetForm();
        onSuccess();
        onOpenChange(false);
      } else {
        throw new Error("Medical insurance addition failed");
      }
    } catch (error) {
      console.error("Add Medical Insurance Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add medical insurance",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setInsuranceDetails({
      policy_name: "",
      policy_number: "",
      policy_type: "Individual",
      insurer_name: "",
      sum_insured: 0,
      premium_amount: 0,
      policy_term: 0,
      maturity_date: "",
      start_date: "",
      linked_mobile: "",
      coverage_details: [],
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
                <Label htmlFor="policyName">Policy Name*</Label>
                <Input
                  id="policyName"
                  placeholder="Enter policy name"
                  value={insuranceDetails.policy_name}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, policy_name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number*</Label>
                <Input
                  id="policyNumber"
                  placeholder="Enter policy number"
                  value={insuranceDetails.policy_number}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, policy_number: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyType">Policy Type*</Label>
                <Select
                  value={insuranceDetails.policy_type}
                  onValueChange={(value) =>
                    setInsuranceDetails({ ...insuranceDetails, policy_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurerName">Insurer Name*</Label>
                <Input
                  id="insurerName"
                  placeholder="Enter insurer name"
                  value={insuranceDetails.insurer_name}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, insurer_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sumInsured">Sum Insured*</Label>
                <Input
                  id="sumInsured"
                  type="number"
                  placeholder="Enter sum insured"
                  value={insuranceDetails.sum_insured}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, sum_insured: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="premiumAmount">Premium Amount*</Label>
                <Input
                  id="premiumAmount"
                  type="number"
                  placeholder="Enter premium amount"
                  value={insuranceDetails.premium_amount}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, premium_amount: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyTerm">Policy Term (Years)*</Label>
                <Input
                  id="policyTerm"
                  type="number"
                  placeholder="Enter policy term"
                  value={insuranceDetails.policy_term}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, policy_term: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date*</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={insuranceDetails.start_date}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, start_date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maturityDate">Maturity Date*</Label>
                <Input
                  id="maturityDate"
                  type="date"
                  value={insuranceDetails.maturity_date}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, maturity_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedMobile">Linked Mobile*</Label>
                <Input
                  id="linkedMobile"
                  placeholder="Enter mobile number"
                  value={insuranceDetails.linked_mobile}
                  onChange={(e) =>
                    setInsuranceDetails({ ...insuranceDetails, linked_mobile: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverageDetails">Coverage Details</Label>
              <Input
                id="coverageDetails"
                placeholder="Enter coverage details (comma-separated)"
                value={insuranceDetails.coverage_details.join(", ")}
                onChange={(e) =>
                  setInsuranceDetails({
                    ...insuranceDetails,
                    coverage_details: e.target.value.split(", "),
                  })
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
          <DialogTitle>Add Medical Insurance</DialogTitle>
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
              onClick={() => {
                if (step === 2) handleAddInsurance();
                else setStep(step + 1);
              }}
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

export default AddMedicalInsuranceDialog;