import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Eye,
  FileDown,
  PenLine,
  PlusCircle,
  Trash,
} from "lucide-react";

// Combined sample data for FDs and RDs
const deposits = [
  {
    type: "FD",
    name: "FD 1",
    details: [
      { label: "Type", value: "Fixed Deposit" },
      { label: "Father Name", value: "John Doe" },
      { label: "Account Number", value: "123456789" },
      { label: "Deposit Amount", value: "₹1,50,000" },
      { label: "Maturity Date", value: "31/12/2027" },
      { label: "Interest Rate", value: "5.6%" },
      { label: "Tenure", value: "3 Years" },
      { label: "Linked Phone Number", value: "1234567890" },
      { label: "Start Date", value: "31/12/2024" },
    ],
    document: "FD.pdf"
  },
  {
    type: "RD",
    name: "RD 1",
    details: [
      { label: "Type", value: "Recurring Deposit" },
      { label: "Father Name", value: "John Doe" },
      { label: "Account Number", value: "123456789" },
      { label: "Monthly Installment", value: "₹10,000" },
      { label: "Maturity Amount", value: "₹50,000,00" },
      { label: "Interest Rate", value: "5.6%" },
      { label: "Tenure", value: "3 Years" },
      { label: "Linked Phone Number", value: "1234567890" },
      { label: "Start Date", value: "31/12/2024" },
    ],
    document: "RD.pdf"
  }
];

const DepositCard = ({ deposit }) => (
  <Card className="p-0">
    <CardHeader className="flex flex-row items-center justify-between">
      <h1 className="text-lg font-semibold">{deposit.name}</h1>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deposit.details.map((item, index) => (
          <div key={index} className="bg-popover p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="border-t p-2 justify-between">
      <div className="bg-background/85 text-xs p-2 rounded-lg flex gap-3 items-center w-60 justify-between">
        {deposit.document}
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          <FileDown className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <PenLine className="h-4 w-4 text-foreground" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash className="h-4 w-4 text-foreground" />
        </Button>
      </div>
    </CardFooter>
  </Card>
);

const FDRDTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Total Deposits ({deposits.length})
        </h1>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setDialogOpen(true)}
        >
          <PlusCircle className=" h-4 w-4" /> Add
        </Button>
      </div>
      <div className="space-y-6">
        {deposits.map((deposit, index) => (
          <DepositCard key={index} deposit={deposit} />
        ))}
      </div>
    </div>
  );
};

export default FDRDTab;