import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Settings = () => {
  const personalDetails = {
    name: "John Deo",
    dateOfBirth: "15 May 1987",
    email: "johndeo@gmail.com",
    age: "34 Years",
    gender: "Male",
    primaryContact: "7584968123",
    secondaryContact: "8945612374",
    aadhaar: "7894 5689 1235",
    pan: "DONKP1547K",
    permeantAddress:
      "Flat No. 202, Rosewood Apartments, MG Road, Bandra West, Mumbai, Maharashtra, 400050",
    currentAddress:
      "15, Lakeview Res, 2nd Cross, Indiranagar, Bengaluru, 560038",
  };

  const familyMembers = [
    {
      name: "Mike Deo",
      relationship: "Father",
      age: "54",
      contact: "7894561230",
    },
    {
      name: "Sarah Deo",
      relationship: "Mother",
      age: "50",
      contact: "7894561230",
    },
    {
      name: "Jenny Deo",
      relationship: "Sister",
      age: "54",
      contact: "7894561230",
    },
  ];

  return (
    <div className=" mx-auto space-y-6">
      {/* Personal Details Card */}
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold">Personal Details</h2>
          <Button variant="outline">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <DetailItem label="Name" value={personalDetails.name} />
            <DetailItem
              label="Date of Birth"
              value={personalDetails.dateOfBirth}
            />
            <DetailItem label="Email" value={personalDetails.email} />
            <DetailItem label="Age" value={personalDetails.age} />
            <DetailItem label="Gender" value={personalDetails.gender} />
            <DetailItem
              label="Primary Contact No"
              value={personalDetails.primaryContact}
            />
            <DetailItem
              label="Secondary Contact No"
              value={personalDetails.secondaryContact}
            />
            <DetailItem label="Aadhaar No" value={personalDetails.aadhaar} />
            <DetailItem label="PAN No" value={personalDetails.pan} />
            <DetailItem
              label="Permeant Address"
              value={personalDetails.permeantAddress}
              className="col-span-full lg:col-span-2"
            />
            <DetailItem
              label="Current Address"
              value={personalDetails.currentAddress}
              className="col-span-full lg:col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <DetailItem label="Name" value={personalDetails.name} />
            <DetailItem
              label="Date of Birth"
              value={personalDetails.dateOfBirth}
            />
            <DetailItem label="Email" value={personalDetails.email} />
            <DetailItem label="Age" value={personalDetails.age} />
            <DetailItem label="Gender" value={personalDetails.gender} />
            <DetailItem
              label="Primary Contact No"
              value={personalDetails.primaryContact}
            />
            <DetailItem
              label="Secondary Contact No"
              value={personalDetails.secondaryContact}
            />
            <DetailItem label="Aadhaar No" value={personalDetails.aadhaar} />
            <DetailItem label="PAN No" value={personalDetails.pan} />
            <DetailItem
              label="Permeant Address"
              value={personalDetails.permeantAddress}
              className="col-span-full lg:col-span-2"
            />
            <DetailItem
              label="Current Address"
              value={personalDetails.currentAddress}
              className="col-span-full lg:col-span-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Family Details Card */}
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold">Family Details</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Contact No</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familyMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.relationship}</TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>{member.contact}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const DetailItem = ({ label, value, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default Settings;
