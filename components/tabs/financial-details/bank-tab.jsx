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
  Pen,
  PenLine,
  PenSquare,
  PlusCircle,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ADDBankDialog from "@/components/dialogs/add-bank";

const nominees = [
  {
    name: "Mike Deo",
    relationship: "Father",
    percentage: "25%",
    contact: "1234567890",
  },
  {
    name: "Sarah Deo",
    relationship: "Mother",
    percentage: "25%",
    contact: "0987654321",
  },
  {
    name: "Jenny Deo",
    relationship: "Sister",
    percentage: "25%",
    contact: "1122334455",
  },
];

const banks = [
  {
    name: "HDFC Bank",
    details: [
      { label: "Account Number", value: "123123123123" },
      { label: "IFSC Code", value: "HDFC0001234" },
      { label: "Account Holder", value: "John Doe" },
      { label: "Account Type", value: "Savings" },
      { label: "Branch Name", value: "Mumbai Main Branch" },
      { label: "Linked Phone", value: "+91 9876543210" },
    ],
  },
  {
    name: "SBI Bank",
    details: [
      { label: "Account Number", value: "456456456456" },
      { label: "IFSC Code", value: "SBI0005678" },
      { label: "Account Holder", value: "Jane Doe" },
      { label: "Account Type", value: "Current" },
      { label: "Branch Name", value: "Delhi Main Branch" },
      { label: "Linked Phone", value: "+91 9876501234" },
    ],
  },
  {
    name: "Axis Bank",
    details: [
      { label: "Account Number", value: "789789789789" },
      { label: "IFSC Code", value: "AXIS0009101" },
      { label: "Account Holder", value: "Alice Doe" },
      { label: "Account Type", value: "Savings" },
      { label: "Branch Name", value: "Bangalore Main Branch" },
      { label: "Linked Phone", value: "+91 9876512345" },
    ],
  },
];

const BankCard = ({ bank }) => (
  <Card className="p-0">
    <CardHeader>
      <h1 className="text-lg font-semibold">{bank.name}</h1>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bank.details.map((item, index) => (
          <div key={index} className="bg-popover p-2 rounded-lg">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-popover rounded-lg p-4 mt-6">
        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-background rounded-lg">
              <TableRow>
                <TableHead>Nominee</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Contact No</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nominees.map((nominee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{nominee.name}</TableCell>
                  <TableCell>{nominee.relationship}</TableCell>
                  <TableCell>{nominee.percentage}</TableCell>
                  <TableCell>{nominee.contact}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </CardContent>
    <CardFooter className="border-t p-2 justify-between">
      <div className="bg-background/85 text-xs p-2 rounded-lg flex gap-3 items-center w-60 justify-between">
        Passbook.pdf
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

const BankTab = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Total Banks ({banks.length})
        </h1>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Bank
        </Button>
      </div>
      <ADDBankDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="space-y-6">
        {banks.map((bank, index) => (
          <BankCard key={index} bank={bank} />
        ))}
      </div>
    </div>
  );
};

export default BankTab;
