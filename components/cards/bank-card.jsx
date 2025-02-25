import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye, FileDown, PenLine, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

const BankCard = ({ bank, onEdit, onDelete }) => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Function to handle file download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = bank.passbook_or_statement;
    link.download = bank.passbook_or_statement.split("/").pop(); // Extract filename from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle file view
  const handleView = () => {
    setViewDialogOpen(true);
  };

  // Function to handle delete confirmation
  const handleConfirmDelete = () => {
    onDelete(); // Call the onDelete prop passed from BankTab
    setDeleteDialogOpen(false); // Close the confirmation dialog
  };

  // Check if the file is an image
  const isImage = bank.passbook_or_statement?.match(/\.(jpeg|jpg|png)$/i);

  return (
    <>
      <Card className="p-0">
        <CardHeader>
          <h1 className="text-lg font-semibold">{bank.bank_name}</h1>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Account Number</p>
              <p className="font-semibold mt-2 truncate">{bank.account_number}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">IFSC Code</p>
              <p className="font-semibold mt-2 truncate">{bank.ifsc_code}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Account Holder</p>
              <p className="font-semibold mt-2 truncate">{bank.account_holder_name}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Account Type</p>
              <p className="font-semibold mt-2 truncate">{bank.account_type}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Branch Name</p>
              <p className="font-semibold mt-2 truncate">{bank.branch_name}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Linked Phone</p>
              <p className="font-semibold mt-2 truncate">{bank.linked_mobile_number}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-2 justify-between">
          <div className="bg-background/85 text-xs p-2 rounded-lg flex gap-3 items-center w-60 justify-between">
            {bank.passbook_or_statement ? (
              <span>{bank.passbook_or_statement.split("/").pop()}</span>
            ) : (
              <span>No file attached</span>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleView}
                disabled={!bank.passbook_or_statement}
              >
                <Eye className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                disabled={!bank.passbook_or_statement}
              >
                <FileDown className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit} // Trigger edit action
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
              <DialogTitle>View Passbook/Statement</DialogTitle>
            </DialogHeader>
            <div className="w-full h-full overflow-auto">
              {bank.passbook_or_statement && (
                <>
                  {isImage ? (
                    <img
                      src={bank.passbook_or_statement}
                      alt="Passbook/Statement"
                      className="w-full h-auto"
                    />
                  ) : (
                    <iframe
                      src={bank.passbook_or_statement}
                      width="100%"
                      height="600px"
                      title="Passbook/Statement"
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
              Are you sure you want to delete the bank account "{bank.bank_name}"? This action cannot be undone.
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

export default BankCard;