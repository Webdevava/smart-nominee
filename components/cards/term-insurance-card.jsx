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

const TermInsuranceCard = ({ insurance, onEdit, onDelete, isDeleting }) => {
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = insurance.document;
    link.download = insurance.document.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    setViewDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setDeleteDialogOpen(false);
  };

  const isImage = insurance.document?.match(/\.(jpeg|jpg|png)$/i);

  return (
    <>
      <Card className="p-0">
        <CardHeader>
          <h1 className="text-lg font-semibold">{insurance.policy_name}</h1>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Policy Number</p>
              <p className="font-semibold mt-2 truncate">{insurance.policy_number}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Insurer Name</p>
              <p className="font-semibold mt-2 truncate">{insurance.insurer_name}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Sum Assured</p>
              <p className="font-semibold mt-2 truncate">{insurance.sum_assured}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Premium Amount</p>
              <p className="font-semibold mt-2 truncate">{insurance.premium_amount}</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Policy Term</p>
              <p className="font-semibold mt-2 truncate">{insurance.policy_term} years</p>
            </div>
            <div className="bg-popover p-2 rounded-lg">
              <p className="text-xs text-muted-foreground">Maturity Date</p>
              <p className="font-semibold mt-2 truncate">{insurance.maturity_date}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-2 justify-between">
          <div className="bg-background/85 text-xs p-2 rounded-lg flex gap-3 items-center w-60 justify-between">
            {insurance.document ? (
              <span>{insurance.document.split("/").pop()}</span>
            ) : (
              <span>No file attached</span>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleView}
                disabled={!insurance.document}
              >
                <Eye className="h-4 w-4 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                disabled={!insurance.document}
              >
                <FileDown className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onEdit}
            >
              <PenLine className="h-4 w-4 text-foreground" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              <Trash className="h-4 w-4 text-foreground" />
            </Button>
          </div>
        </CardFooter>

        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[90%] sm:max-h-[90%]">
            <DialogHeader>
              <DialogTitle>View Insurance Document</DialogTitle>
            </DialogHeader>
            <div className="w-full h-full overflow-auto">
              {insurance.document && (
                <>
                  {isImage ? (
                    <img
                      src={insurance.document}
                      alt="Insurance Document"
                      className="w-full h-auto"
                    />
                  ) : (
                    <iframe
                      src={insurance.document}
                      width="100%"
                      height="600px"
                      title="Insurance Document"
                    />
                  )}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the term insurance "{insurance.policy_name}"? This action cannot be undone.
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
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TermInsuranceCard;