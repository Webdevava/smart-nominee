import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAddressList, deleteAddress } from '@/utils/address-apis';
import { cn } from "@/lib/utils";
import AddAddressDialog from '../dialogs/add-address';
import EditAddressDialog from '../dialogs/edit-address';

const AddressList = ({ handleOpenDialog }) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Add this state

  // Move fetchAddresses to useCallback to prevent recreation
  const fetchAddresses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAddressList();
      setAddresses(response.data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch addresses",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Update useEffect to depend on refreshTrigger
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses, refreshTrigger]);

  const handleDelete = async (addressId) => {
    try {
      setIsDeleting(addressId);
      await deleteAddress(addressId);
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
      setRefreshTrigger(prev => prev + 1); // Trigger refresh after delete
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to delete address',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleAddSuccess = () => {
    setRefreshTrigger(prev => prev + 1); // Trigger refresh after add/edit
  };

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

  if (!addresses.length) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-3">
        <p className="text-center text-sm">
          <span>You have not added <span className="font-semibold">"Address"</span> yet. </span><br />
          <span>Please Click on <span className="font-semibold">"Add address"</span> button to add details.</span>
        </p>
        <Button
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
        <AddAddressDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSuccess={handleAddSuccess}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      {addresses.map((address) => (
        <Card key={address.id} className="relative group">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    {
                      'bg-blue-100 text-blue-700': address.address_type === 'Home',
                      'bg-purple-100 text-purple-700': address.address_type === 'Office',
                      'bg-green-100 text-green-700': address.address_type === 'Permanent',
                      'bg-orange-100 text-orange-700': address.address_type === 'Temporary',
                      'bg-gray-100 text-gray-700': ['Billing', 'Shipping', 'Other'].includes(address.address_type),
                    }
                  )}>
                    {address.address_type}
                  </span>
                </div>
                <p className="text-sm">{address.street}</p>
                <p className="text-sm">{`${address.city}, ${address.state}`}</p>
                <p className="text-sm">{`${address.country} - ${address.zip_code}`}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleEdit(address)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(address.id)}
                  disabled={isDeleting === address.id}
                >
                  {isDeleting === address.id ? (
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
          Add Another Address
        </Button>
        <AddAddressDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSuccess={handleAddSuccess}
        />
        <EditAddressDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          address={selectedAddress}
          onSuccess={handleAddSuccess}
        />
      </div>
    </div>
  );
};

export default AddressList;