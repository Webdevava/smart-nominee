import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye, FileDown, PenLine, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const DepositCard = ({ deposit, onEdit, onDelete }) => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Function to handle file download
  const handleDownload = () => {
    if (deposit.document) {
      const link = document.createElement("a");
      link.href = deposit.document;
      link.download = deposit.document.split("/").pop(); // Extract filename from URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to handle file view
  const handleView = () => {
    setViewDialogOpen(true);
  };

  // Function to handle delete confirmation
  const handleConfirmDelete = async () => {
    try {
      await onDelete(deposit.id); // Call the onDelete function passed from the parent
      setDeleteDialogOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Failed to delete deposit:", error);
    }
  };

  return (
    <>
      <Card className="p-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <h1 className="text-lg font-semibold">{deposit.name}</h1>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Deposit Type</p>
              <p className="font-semibold mt-2 truncate">{deposit.deposit_type}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Installment</p>
              <p className="font-semibold mt-2 truncate">₹{deposit.installment}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Installment Type</p>
              <p className="font-semibold mt-2 truncate">{deposit.installment_type}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Interest Rate</p>
              <p className="font-semibold mt-2 truncate">{deposit.interest_rate}%</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Tenure</p>
              <p className="font-semibold mt-2 truncate">{deposit.tenure} Months</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Maturity Date</p>
              <p className="font-semibold mt-2 truncate">{deposit.maturity_date}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Maturity Amount</p>
              <p className="font-semibold mt-2 truncate">₹{deposit.maturity_amount}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Linked Mobile</p>
              <p className="font-semibold mt-2 truncate">{deposit.linked_mobile_number}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-2 justify-between">
          <div className="bg-background/85 text-xs p-2 rounded-lg flex gap-3 items-center w-60 justify-between">
            {deposit.document ? (
              <span>{deposit.document.split("/").pop()}</span>
            ) : (
              <span>No file attached</span>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleView}
                disabled={!deposit.document}
              >
                <Eye className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                disabled={!deposit.document}
              >
                <FileDown className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit} // Use onEdit prop passed from parent
            >
              <PenLine className="h-4 w-4 text-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)} // Open confirmation dialog
            >
              <Trash className="h-4 w-4 text-foreground" />
            </Button>
          </div>
        </CardFooter>

        {/* Dialog to view the file */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[90%] sm:max-h-[90%]">
            <DialogHeader>
              <DialogTitle>View Document</DialogTitle>
            </DialogHeader>
            <div className="w-full h-full overflow-auto">
              {deposit.document && (
                <>
                  {deposit.document.endsWith(".pdf") ? (
                    <iframe
                      src={deposit.document}
                      width="100%"
                      height="600px"
                      title="Document"
                    />
                  ) : (
                    <img
                      src={deposit.document}
                      alt="Document"
                      className="w-full h-auto"
                    />
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the deposit "{deposit.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepositCard;