import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { listContacts, deleteContact } from '@/utils/contact-apis';
import { cn } from "@/lib/utils";
import AddContactDialog from '../dialogs/add-contact';
import EditContactDialog from '../dialogs/edit-contact';

const ContactList = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await listContacts();
      console.log('Fetch Contacts Response:', response);

      // Check if the response indicates success
      if (response.status === true) {
        setContacts(response.data || []); // Set contacts, even if empty
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Fetch Contacts Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to fetch contacts',
      });
      setContacts([]); // Reset to empty on error
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
      console.log('Delete Contact Response:', response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: "Contact deleted successfully",
        });
        setRefreshTrigger(prev => prev + 1); // Trigger refresh after delete
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Delete Contact Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to delete contact',
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
    console.log('handleAddSuccess triggered');
    setRefreshTrigger(prev => prev + 1); // Trigger refresh after add/edit
    setIsAddDialogOpen(false); // Close add dialog
  };

  const handleEditSuccess = () => {
    console.log('handleEditSuccess triggered');
    setRefreshTrigger(prev => prev + 1); // Trigger refresh after edit
    setIsEditDialogOpen(false); // Close edit dialog
    setSelectedContact(null); // Clear selection
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

  // Empty state
  if (!contacts.length) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-3">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Contacts"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add Contact"</span> button to add details.</span>
        </p>
        <Button
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
        <AddContactDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSuccess={handleAddSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      {contacts.map((contact) => (
        <Card key={contact.id} className="relative group">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    {
                      'bg-blue-100 text-blue-700': contact.email,
                      'bg-purple-100 text-purple-700': contact.phone_number,
                    }
                  )}>
                    {contact.email ? 'Email' : 'Phone'}
                  </span>
                </div>
                <p className="text-sm">{contact.email || contact.phone_number}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleEdit(contact)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
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
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-center pt-4">
        <Button
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
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
    </div>
  );
};

export default ContactList;