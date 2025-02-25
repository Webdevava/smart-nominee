// pages/settings.js
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Eye, EyeOff, Pencil, Trash } from 'lucide-react';

export default function GenralSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('••••••••••');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-10">General Settings</h1>
      
      {/* Avatar Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-1">Avatar</h2>
            <p className="text-gray-500 text-sm">
              Choose an image that binit reflects your identify<br />
              (We only support JPG, JPEG, or PNG file. 1MB Max)
            </p>
          </div>
          
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-2xl font-semibold mr-4">
              JD
            </div>
            <Button variant="outline" className="mr-2 whitespace-nowrap">
              Upload Image
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500">
              <Trash className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Personal Information */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Personal Information</h2>
            <p className="text-gray-500 text-sm">Edit your personal information</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="block mb-2">Full Name</Label>
            <Input id="fullName" defaultValue="John Deo" className="w-full" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2">Email ID</Label>
            <Input id="email" defaultValue="johndeo@gmail.com" className="w-full" />
          </div>
          <div>
            <Label htmlFor="phone" className="block mb-2">Phone Number</Label>
            <Input id="phone" defaultValue="123456790" className="w-full" />
          </div>
          <div className="relative">
            <Label htmlFor="dob" className="block mb-2">Date of Birth</Label>
            <Input id="dob" defaultValue="12/12/1996" className="w-full pr-10" />
            <Button variant="ghost" size="icon" className="absolute right-1 top-8">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Account Management */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Account Management</h2>
            <p className="text-gray-500 text-sm">Edit Your Password</p>
          </div>
        </div>
        
        <div>
          <Label htmlFor="password" className="block mb-2">Password</Label>
          <div className="flex space-x-4 items-center">
            <div className="relative flex-grow">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10" 
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button variant="link" className="text-blue-600 whitespace-nowrap">
              Change Password
            </Button>
          </div>
        </div>
      </div>
      
      {/* Language */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Language</h2>
            <p className="text-gray-500 text-sm">Customize your language</p>
          </div>
        </div>
        
        <div>
          <Label htmlFor="language" className="block mb-2">Language</Label>
          <Select defaultValue="english">
            <SelectTrigger className="w-full md:w-60">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Transaction logs */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Transaction logs</h2>
            <p className="text-gray-500 text-sm">Customize your logs</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {['All', 'Contact', 'Address', 'Document', 'Family', 'Nominee', 'Financial', 'Insurance'].map((category) => (
            <div 
              key={category}
              className="flex items-center space-x-2 bg-green-50 rounded-full px-3 py-1"
            >
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg 
                  className="h-3 w-3 text-green-700" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <span className="text-sm">{category}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Theme */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Theme</h2>
            <p className="text-gray-500 text-sm">Choose a preferred theme for the app</p>
          </div>
        </div>
        
        <RadioGroup defaultValue="light" className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Footer Actions */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-16">
        <Button variant="link" className="text-red-600">
          Delete Account
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto mb-4 md:mb-0">
          Log Out
        </Button>
      </div>
    </div>
  );
}