import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAddressList, deleteAddress } from '@/utils/address-apis';
import AddAddressDialog from '../dialogs/add-address';
import EditAddressDialog from '../dialogs/edit-address';

const AddressList = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch addresses
  const fetchAddresses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAddressList();
      console.log('Fetch Addresses Response:', response);

      if (response.status === true) {
        setAddresses(response.data || []);
      } else {
        throw new Error('Failed to fetch addresses');
      }
    } catch (error) {
      console.error('Fetch Addresses Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to fetch addresses',
      });
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Refresh addresses when refreshTrigger changes
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses, refreshTrigger]);

  // Handle delete address
  const handleDelete = async (addressId) => {
    try {
      setIsDeleting(addressId);
      const response = await deleteAddress(addressId);
      console.log('Delete Address Response:', response);

      if (response.status === true) {
        toast({
          title: "Success",
          description: "Address deleted successfully",
        });
        setRefreshTrigger(prev => prev + 1);
      } else {
        throw new Error('Failed to delete address');
      }
    } catch (error) {
      console.error('Delete Address Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to delete address',
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // Handle edit address
  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsEditDialogOpen(true);
  };

  // Handle success after add/edit
  const handleAddSuccess = () => {
    console.log('handleAddSuccess triggered');
    setRefreshTrigger(prev => prev + 1);
    setIsAddDialogOpen(false);
  };

  const handleEditSuccess = () => {
    console.log('handleEditSuccess triggered');
    setRefreshTrigger(prev => prev + 1);
    setIsEditDialogOpen(false);
    setSelectedAddress(null);
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
        {/* Addresses Card */}
        {addresses.length > 0 && (
          <Card className="mb-2">
            <CardHeader className="flex flex-row items-center justify-between pb-0 p-3">
              <CardTitle className="text-sm font-bold">Addresses</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 overflow-auto max-h-44">
              <ul className="space-y-2">
                {addresses.map((address, index) => (
                  <li
                    key={address.id}
                    className="flex items-center justify-between border-b last:border-b-0 group relative"
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-3">{index + 1}.</span>
                      <span className="text-primary">
                        {`${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.zip_code}`}
                      </span>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity absolute bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 rounded-lg p-1 right-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(address)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
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
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default AddressList;