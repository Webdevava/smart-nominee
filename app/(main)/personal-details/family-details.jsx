'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import AddMemberDialog from "@/components/dialogs/add-member";

const members = [
  {
    id: "MD",
    name: "Mike Deo",
    relation: "Father",
    phone: "1234567890",
    email: "Johndeo@gmail.com",
    age: "54",
    address: "Room No. 12, Shanti Niwas PG,...",
  },
  {
    id: "SD",
    name: "Sarah Deo",
    relation: "Mother",
    phone: "1234567890",
    email: "Johndeo@gmail.com",
    age: "54",
    address: "Room No. 12, Shanti Niwas PG,...",
  },
  {
    id: "JD",
    name: "Jenny Deo",
    relation: "Sister",
    phone: "1234567890",
    email: "Johndeo@gmail.com",
    age: "54",
    address: "Room No. 12, Shanti Niwas PG,...",
  },
  {
    id: "SMD",
    name: "Smith Deo",
    relation: "Brother",
    phone: "1234567890",
    email: "Johndeo@gmail.com",
    age: "54",
    address: "Room No. 12, Shanti Niwas PG,...",
  },
];

const getInitialsBgColor = (relation) => {
  const colors = {
    Father: "bg-green-100",
    Mother: "bg-yellow-100",
    Sister: "bg-blue-100",
    Brother: "bg-red-100",
  };
  return colors[relation] || "bg-gray-100";
};

const getRelationBgColor = (relation) => {
  const colors = {
    Father: "bg-green-200 text-green-800 font-bold",
    Mother: "bg-yellow-200 text-yellow-800 font-bold",
    Sister: "bg-blue-200 text-blue-800 font-bold",
    Brother: "bg-red-200 text-red-800 font-bold",
  };
  return colors[relation] || "bg-gray-100 text-gray-800";
};

const getInitials = (name) => {
  const nameParts = name.split(" ");
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`;
  }
  return name[0];
};

const FamilyMembersList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="p-2 sm:p-6 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Total Member ({members.length})
        </h1>
        <Button className="w-full sm:w-auto" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <AddMemberDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {members.map((member) => (
          <Card key={member.id} className="p-0 shadow-none">
            <CardHeader className="p-3 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 sm:gap-3 w-full">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarFallback
                      className={getRelationBgColor(member.relation)}
                    >
                      {getInitials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex justify-between w-full gap-2 sm:items-center">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {member.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`${getRelationBgColor(
                        member.relation
                      )} text-xs sm:text-sm w-fit`}
                    >
                      {member.relation}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-popover p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground break-all">
                    {member.phone}
                  </p>
                </div>
                <div className="bg-popover p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground break-all">
                    {member.email}
                  </p>
                </div>
                <div className="bg-popover p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Age</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {member.age}
                  </p>
                </div>
                <div className="bg-popover p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {member.address}
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t p-2 flex justify-end">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembersList;
