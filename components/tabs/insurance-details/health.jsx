import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import AddMedicalInsuranceDialog from "@/components/dialogs/add-medical-insurance";
import EditMedicalInsuranceDialog from "@/components/dialogs/edit-medical-insurance";
import { listMedicalInsurance, deleteMedicalInsurance } from "@/utils/insurance-apis";
import MedicalInsuranceCard from "@/components/cards/medical-insurance-card";
import { useToast } from "@/hooks/use-toast";

const HealthInsuranceTab = () => {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [insurances, setInsurances] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchInsurances = useCallback(async () => {
    try {
      const response = await listMedicalInsurance();
      console.log("Fetch Medical Insurances Response:", response);
      if (response.status === true) {
        setInsurances(response.data || []);
      } else {
        throw new Error("Failed to fetch medical insurances");
      }
    } catch (error) {
      console.error("Fetch Medical Insurances Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch medical insurances",
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
      const response = await deleteMedicalInsurance(insuranceId);
      console.log("Delete Medical Insurance Response:", response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Medical insurance deleted successfully",
        });
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error("Failed to delete medical insurance");
      }
    } catch (error) {
      console.error("Delete Medical Insurance Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete medical insurance",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (!insurances.length) {
    return (
      <div className="p-2 sm:p-6 mx-auto h-full flex items-center justify-center flex-col gap-3">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Medical Insurances"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add Medical Insurance"</span> button to add details.</span>
        </p>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Medical Insurance
        </Button>
        <AddMedicalInsuranceDialog
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
          Total Medical Insurances ({insurances.length})
        </h1>
        <Button className="w-full sm:w-auto" onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Medical Insurance
        </Button>
      </div>
      <AddMedicalInsuranceDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={handleAddSuccess}
      />
      <EditMedicalInsuranceDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        insurance={selectedInsurance}
        onSuccess={handleEditSuccess}
      />
      <div className="space-y-6">
        {insurances.map((insurance) => (
          <MedicalInsuranceCard
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

export default HealthInsuranceTab;