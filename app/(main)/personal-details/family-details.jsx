'use client'
import React, { useState, useEffect } from "react";
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
import { getFamilyList, deleteFamilyMember } from "@/utils/family-api";
import { useToast } from "@/hooks/use-toast";

// ... keep all the utility functions the same ...
const getRelationBgColor = (relation) => {
  const colors = {
    father: "bg-green-200 text-green-800 font-bold",
    mother: "bg-yellow-200 text-yellow-800 font-bold",
    sister: "bg-blue-200 text-blue-800 font-bold",
    brother: "bg-red-200 text-red-800 font-bold",
    spouse: "bg-purple-200 text-purple-800 font-bold",
    child: "bg-pink-200 text-pink-800 font-bold",
    other: "bg-gray-200 text-gray-800 font-bold"
  };
  return colors[relation.toLowerCase()] || "bg-gray-100 text-gray-800";
};

const getInitials = (firstName, lastName) => {
  return `${firstName[0]}${lastName[0]}`;
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const FamilyMembersList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMembers = async () => {
    try {
      const response = await getFamilyList();
      if (response.status) {
        setMembers(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch family members",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (memberId) => {
    try {
      const response = await deleteFamilyMember(memberId);
      if (response.status) {
        toast({
          title: "Success",
          description: "Family member deleted successfully",
        });
        fetchMembers();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete family member",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
  }

  if (members.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Address"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add address"</span> button to add details.</span>
        </p>
        <Button onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Member
        </Button>
        <AddMemberDialog 
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={fetchMembers}
        />
      </div>
    );
  }

  return (
    <div className="p-2 lg:p-8 mx-auto pb-20 sm:pb-2">
      {/* Header - Hidden on small screens */}
      <div className="hidden sm:flex flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">
          Total Member ({members.length})
        </h1>
        <Button onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden mb-6">
        <h1 className="text-lg font-semibold">
          Total Member ({members.length})
        </h1>
      </div>

      <AddMemberDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={fetchMembers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {members.map((member) => (
          <Card key={member.id} className="p-0 shadow-none">
            <CardHeader className="p-3 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 sm:gap-3 w-full">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarFallback
                      className={getRelationBgColor(member.relationship)}
                    >
                      {getInitials(member.first_name, member.last_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex justify-between w-full gap-2 sm:items-center">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {`${member.first_name} ${member.last_name}`}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`${getRelationBgColor(
                        member.relationship
                      )} text-xs sm:text-sm w-fit`}
                    >
                      {member.relationship}
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
                    {member.phone_number}
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
                    {calculateAge(member.dob)}
                  </p>
                </div>
                <div className="bg-popover p-2 rounded-lg">
                  <p className="text-xs text-gray-500">Adhaar Number</p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    {member.adhaar_number}
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
                  onClick={() => setDialogOpen(true)}
                >
                  <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Fixed Mobile Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t sm:hidden">
        <Button className="w-full" onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>
    </div>
  );
};

export default FamilyMembersList;