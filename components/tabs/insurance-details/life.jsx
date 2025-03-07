import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import AddTermInsuranceDialog from "@/components/dialogs/add-term-insurance";
import EditTermInsuranceDialog from "@/components/dialogs/edit-term-insurance";
import { listTermInsurance, deleteTermInsurance } from "@/utils/insurance-apis";
import TermInsuranceCard from "@/components/cards/term-insurance-card";
import { useToast } from "@/hooks/use-toast";

const InsuranceTab = () => {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [insurances, setInsurances] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchInsurances = useCallback(async () => {
    try {
      const response = await listTermInsurance();
      console.log("Fetch Term Insurances Response:", response);
      if (response.status === true) {
        setInsurances(response.data || []);
      } else {
        throw new Error("Failed to fetch term insurances");
      }
    } catch (error) {
      console.error("Fetch Term Insurances Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch term insurances",
      });
      setInsurances([]);
    }
  }, [toast]);

  useEffect(() => {
    fetchInsurances();
  }, [fetchInsurances, refreshTrigger]);

  const handleAddSuccess = () => {
    console.log("handleAddSuccess triggered");
    setRefreshTrigger((prev) => prev + 1);
    setAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    console.log("handleEditSuccess triggered");
    setRefreshTrigger((prev) => prev + 1);
    setEditDialogOpen(false);
    setSelectedInsurance(null);
  };

  const handleEdit = (insurance) => {
    setSelectedInsurance(insurance);
    setEditDialogOpen(true);
  };

  const handleDelete = async (insuranceId) => {
    try {
      setIsDeleting(insuranceId);
      const response = await deleteTermInsurance(insuranceId);
      console.log("Delete Term Insurance Response:", response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Term insurance deleted successfully",
        });
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error("Failed to delete term insurance");
      }
    } catch (error) {
      console.error("Delete Term Insurance Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete term insurance",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (!insurances.length) {
    return (
      <div className="p-2 sm:p-6 mx-auto h-full flex items-center justify-center flex-col gap-3">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Term Insurances"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add Term Insurance"</span> button to add details.</span>
        </p>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Term Insurance
        </Button>
        <AddTermInsuranceDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSuccess={handleAddSuccess}
        />
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Total Term Insurances ({insurances.length})
        </h1>
        <Button className="w-full sm:w-auto" onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Term Insurance
        </Button>
      </div>
      <AddTermInsuranceDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={handleAddSuccess}
      />
      <EditTermInsuranceDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        insurance={selectedInsurance}
        onSuccess={handleEditSuccess}
      />
      <div className="space-y-6">
        {insurances.map((insurance) => (
          <TermInsuranceCard
            key={insurance.id}
            insurance={insurance}
            onEdit={() => handleEdit(insurance)}
            onDelete={() => handleDelete(insurance.id)}
            isDeleting={isDeleting === insurance.id}
          />
        ))}
      </div>
    </div>
  );
};

export default InsuranceTab;