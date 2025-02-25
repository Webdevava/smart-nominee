import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ADDFDRDDialog from "@/components/dialogs/add-fdrd";
import EditFDRDDialog from "@/components/dialogs/edit-fdrd";
import DepositCard from "@/components/cards/deposit-card";
import { deleteDeposit } from "@/utils/deposit-api";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api";

// Define getFDList and getRDList
const getFDList = async () => {
  try {
    const response = await api.get('/deposit/FD/list/');
    console.log('Get FD List Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get FD List Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

const getRDList = async () => {
  try {
    const response = await api.get('/deposit/RD/list/');
    console.log('Get RD List Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get RD List Error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

const FDRDTab = () => {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [deposits, setDeposits] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchDeposits = useCallback(async () => {
    let fdList = [];
    let rdList = [];

    // Fetch FD list
    try {
      const fdResponse = await getFDList();
      if (fdResponse.status === true) {
        fdList = fdResponse.data || [];
      } else {
        throw new Error("Failed to fetch FD list");
      }
    } catch (error) {
      console.error("FD Fetch Failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch FD list",
      });
    }

    // Fetch RD list
    try {
      const rdResponse = await getRDList();
      if (rdResponse.status === true) {
        rdList = rdResponse.data || [];
      } else {
        throw new Error("Failed to fetch RD list");
      }
    } catch (error) {
      console.error("RD Fetch Failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch RD list",
      });
    }

    // Combine successful fetches
    const combinedDeposits = [...fdList, ...rdList];
    console.log("Combined Deposits:", combinedDeposits);
    setDeposits(combinedDeposits);

    // Show a toast if no deposits are fetched
    if (combinedDeposits.length === 0) {
      toast({
        variant: "info",
        title: "No Deposits",
        description: "No Fixed Deposits or Recurring Deposits found.",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchDeposits();
  }, [fetchDeposits, refreshTrigger]);

  const handleAddSuccess = () => {
    console.log("handleAddSuccess triggered");
    setRefreshTrigger((prev) => prev + 1);
    setAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    console.log("handleEditSuccess triggered");
    setRefreshTrigger((prev) => prev + 1);
    setEditDialogOpen(false);
    setSelectedDeposit(null);
  };

  const handleEdit = (deposit) => {
    setSelectedDeposit(deposit);
    setEditDialogOpen(true);
  };

  const handleDelete = async (depositId) => {
    try {
      setIsDeleting(depositId);
      const deposit = deposits.find((d) => d.id === depositId);
      const depositType = deposit.deposit_type === "FD" ? "FD" : "RD";
      const response = await deleteDeposit(depositType, depositId);
      console.log("Delete Deposit Response:", response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Deposit deleted successfully",
        });
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error("Failed to delete deposit");
      }
    } catch (error) {
      console.error("Delete Deposit Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete deposit",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (!deposits.length) {
    return (
      <div className="p-2 sm:p-6 mx-auto h-full flex items-center justify-center flex-col gap-3">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Deposits"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add Deposit"</span> button to add details.</span>
        </p>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Deposit
        </Button>
        <ADDFDRDDialog
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
          Total Deposits ({deposits.length})
        </h1>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Deposit
        </Button>
      </div>
      <ADDFDRDDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={handleAddSuccess}
      />
      <EditFDRDDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        deposit={selectedDeposit}
        onSuccess={handleEditSuccess}
      />
      <div className="space-y-6">
        {deposits.map((deposit) => (
          <DepositCard
            key={deposit.id}
            deposit={deposit}
            onEdit={() => handleEdit(deposit)}
            onDelete={() => handleDelete(deposit.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FDRDTab;