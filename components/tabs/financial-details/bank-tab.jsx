import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import AddBankDialog from "@/components/dialogs/add-bank";
import EditBankDialog from "@/components/dialogs/edit-bank"; // New EditBankDialog
import { getBankList, deleteBankAccount } from "@/utils/bank-apis";
import BankCard from "@/components/cards/bank-card";
import { useToast } from "@/hooks/use-toast";

const BankTab = () => {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchBanks = useCallback(async () => {
    try {
      const response = await getBankList();
      console.log("Fetch Banks Response:", response);
      if (response.status === true) {
        setBanks(response.data || []);
      } else {
        throw new Error("Failed to fetch banks");
      }
    } catch (error) {
      console.error("Fetch Banks Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch banks",
      });
      setBanks([]);
    }
  }, [toast]);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks, refreshTrigger]);

  const handleAddSuccess = () => {
    console.log("handleAddSuccess triggered");
    setRefreshTrigger((prev) => prev + 1);
    setAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    console.log("handleEditSuccess triggered");
    setRefreshTrigger((prev) => prev + 1);
    setEditDialogOpen(false);
    setSelectedBank(null);
  };

  const handleEdit = (bank) => {
    setSelectedBank(bank);
    setEditDialogOpen(true);
  };

  const handleDelete = async (bankId) => {
    try {
      setIsDeleting(bankId);
      const response = await deleteBankAccount(bankId);
      console.log("Delete Bank Response:", response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: response.message || "Bank deleted successfully",
        });
        setRefreshTrigger((prev) => prev + 1);
      } else {
        throw new Error("Failed to delete bank");
      }
    } catch (error) {
      console.error("Delete Bank Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete bank",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  if (!banks.length) {
    return (
      <div className="p-2 sm:p-6 mx-auto h-full flex items-center justify-center flex-col gap-3">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Banks"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add Bank"</span> button to add details.</span>
        </p>
        <Button onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Bank
        </Button>
        <AddBankDialog
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
          Total Banks ({banks.length})
        </h1>
        <Button className="w-full sm:w-auto" onClick={() => setAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Bank
        </Button>
      </div>
      <AddBankDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={handleAddSuccess}
      />
      <EditBankDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        bank={selectedBank}
        onSuccess={handleEditSuccess}
      />
      <div className="space-y-6">
        {banks.map((bank) => (
          <BankCard
            key={bank.id} // Use bank.id instead of index for uniqueness
            bank={bank}
            onEdit={() => handleEdit(bank)} // Pass edit handler
            onDelete={() => handleDelete(bank.id)} // Pass delete handler
          />
        ))}
      </div>
    </div>
  );
};

export default BankTab;