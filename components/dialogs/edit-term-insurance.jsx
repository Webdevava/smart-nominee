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
import { updateTermInsurance } from "@/utils/insurance-apis";
import { useToast } from "@/hooks/use-toast";

const EditTermInsuranceDialog = ({ open, onOpenChange, insurance, onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [insuranceDetails, setInsuranceDetails] = useState({
    policy_name: "",
    policy_number: "",
    insurer_name: "",
    sum_assured: 0,
    premium_amount: 0,
    policy_term: 0,
    maturity_date: "",
    start_date: "",
    linked_mobile: "",
    coverage_detail: [],
    installment_type: "Annually",
  });

  useEffect(() => {
    if (insurance) {
      setInsuranceDetails({
        policy_name: insurance.policy_name || "",
        policy_number: insurance.policy_number || "",
        insurer_name: insurance.insurer_name || "",
        sum_assured: insurance.sum_assured || 0,
        premium_amount: insurance.premium_amount || 0,
        policy_term: insurance.policy_term || 0,
        maturity_date: insurance.maturity_date || "",
        start_date: insurance.start_date || "",
        linked_mobile: insurance.linked_mobile || "",
        coverage_detail: insurance.coverage_detail || [],
        installment_type: insurance.installment_type || "Annually",
      });
    }
  }, [insurance]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await updateTermInsurance(insurance.id, insuranceDetails);
      console.log("Update Term Insurance Response:", response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Term insurance updated successfully",
        });
        resetForm();
        onSuccess();
        onOpenChange(false);
      } else {
        throw new Error("Term insurance update failed");
      }
    } catch (error) {
      console.error("Update Term Insurance Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update term insurance",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setInsuranceDetails({
      policy_name: "",
      policy_number: "",
      insurer_name: "",
      sum_assured: 0,
      premium_amount: 0,
      policy_term: 0,
      maturity_date: "",
      start_date: "",
      linked_mobile: "",
      coverage_detail: [],
      installment_type: "Annually",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 h-[75vh] flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Edit Term Insurance</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col h-full">
          <div className="flex-1 p-4 overflow-y-auto">
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
                <div className="space-y-2">
                  <Label htmlFor="sumAssured">Sum Assured*</Label>
                  <Input
                    id="sumAssured"
                    type="number"
                    placeholder="Enter sum assured"
                    value={insuranceDetails.sum_assured}
                    onChange={(e) =>
                      setInsuranceDetails({ ...insuranceDetails, sum_assured: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="installmentType">Installment Type*</Label>
                  <Select
                    value={insuranceDetails.installment_type}
                    onValueChange={(value) =>
                      setInsuranceDetails({ ...insuranceDetails, installment_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select installment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Annually">Annually</SelectItem>
                      <SelectItem value="Semi-Annually">Semi-Annually</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverageDetail">Coverage Details</Label>
                <Input
                  id="coverageDetail"
                  placeholder="Enter coverage details (comma-separated)"
                  value={insuranceDetails.coverage_detail.join(", ")}
                  onChange={(e) =>
                    setInsuranceDetails({
                      ...insuranceDetails,
                      coverage_detail: e.target.value.split(", "),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-32 bg-popover border-foreground"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-32"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTermInsuranceDialog;