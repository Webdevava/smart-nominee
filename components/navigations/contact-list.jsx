import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2, Phone, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listContacts, deleteContact } from "@/utils/contact-apis";
import AddContactDialog from "@/components/dialogs/add-contact";
import EditContactDialog from "@/components/dialogs/edit-contact";

const ContactsManager = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [phoneContacts, setPhoneContacts] = useState([]);
  const [emailContacts, setEmailContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [contactType, setContactType] = useState("phone"); // "phone" or "email"

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await listContacts();
      console.log("Fetch Contacts Response:", response);

      // Check if the response indicates success
      if (response.status === true) {
        const allContacts = response.data || [];
        setContacts(allContacts);

        // Separate phone and email contacts
        setPhoneContacts(allContacts.filter((contact) => contact.phone_number));
        setEmailContacts(allContacts.filter((contact) => contact.email));
      } else {
        throw new Error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Fetch Contacts Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch contacts",
      });
      setContacts([]);
      setPhoneContacts([]);
      setEmailContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Refresh contacts when refreshTrigger changes
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts, refreshTrigger]);

  // Handle delete contact
  const handleDelete = async (contactId) => {
    try {
      setIsDeleting(contactId);
      const response = await deleteContact(contactId);
      console.log("Delete Contact Response:", response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: "Contact deleted successfully",
        });
        setRefreshTrigger((prev) => prev + 1); // Trigger refresh after delete
      } else {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Delete Contact Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete contact",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // Handle edit contact
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditDialogOpen(true);
  };

  // Handle success after add/edit
  const handleAddSuccess = () => {
    console.log("handleAddSuccess triggered");
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh after add/edit
    setIsAddDialogOpen(false); // Close add dialog
  };

  const handleEditSuccess = () => {
    console.log("handleEditSuccess triggered");
    setRefreshTrigger((prev) => prev + 1); // Trigger refresh after edit
    setIsEditDialogOpen(false); // Close edit dialog
    setSelectedContact(null); // Clear selection
  };

  // Handle add phone/email
  const handleAddContact = (type) => {
    setContactType(type);
    setIsAddDialogOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-muted rounded-lg w-80 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 max-w-3xl flex flex-col justify-between h-full relative">
      <div>
        {/* Phone Numbers Card */}
        {phoneContacts.length > 0 && (
          <Card className="mb-2">
            <CardHeader className="flex flex-row items-center justify-between pb-0 p-3">
              <CardTitle className="text-sm font-bold">Phone Numbers</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0  overflow-auto max-h-44">
              <ul className="space-y-2">
                {phoneContacts.map((contact, index) => (
                  <li
                    key={contact.id}
                    className="flex items-center justify-between border-b last:border-b-0 group"
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-3">{index + 1}.</span>
                      <span className="text-primary">
                        {contact.phone_number}
                      </span>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(contact)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(contact.id)}
                        disabled={isDeleting === contact.id}
                      >
                        {isDeleting === contact.id ? (
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Email Card */}
        {emailContacts.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-0 p-3">
              <CardTitle className="text-sm font-bold">Email</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0  overflow-auto max-h-44">
              <ul className="space-y-2">
                {emailContacts.map((contact, index) => (
                  <li
                    key={contact.id}
                    className="flex items-center justify-between border-b last:border-b-0 group relative"
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-3">{index + 1}.</span>
                      <span className="text-primary">{contact.email}</span>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-lg p-1 right-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(contact)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(contact.id)}
                        disabled={isDeleting === contact.id}
                      >
                        {isDeleting === contact.id ? (
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <Button
        onClick={() => setIsAddDialogOpen(true)}
        className="w-full absolute left-0 bottom-0 mb-2"
      >
        <CirclePlus className="mr-2 h-4 w-4" />
        Add Another Contact
      </Button>
      <AddContactDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={handleAddSuccess}
      />
      <EditContactDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        contact={selectedContact}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default ContactsManager;
