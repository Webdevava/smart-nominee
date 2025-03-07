"use client"

// pages/settings.js
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, Upload, Trash2 } from "lucide-react"
import { updateProfile, addProfile, getProfileDetail } from "@/utils/profile-apis" // Adjust path as needed
import { useToast } from "@/hooks/use-toast"

export default function GeneralSettings() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [theme, setTheme] = useState("light")
  const fileInputRef = useRef(null)

  // Profile state
  const [profile, setProfile] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    pan: "",
    adhaar: "",
    dob: "",
    profile_picture: "",
    password: "••••••••••",
  })

  // Emergency contact state
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relationship: "",
    phone_number: "",
    email: "",
    address: "",
    alternate_phone_number: "",
  })

  // Load profile data and theme on mount
  useEffect(() => {
    fetchProfile()
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await getProfileDetail()
      console.log("API Response:", response)

      if (response.data) {
        setProfile((prev) => ({
          ...prev,
          first_name: response.data.first_name || "",
          middle_name: response.data.middle_name || "",
          last_name: response.data.last_name || "",
          pan: response.data.pan || "",
          adhaar: response.data.adhaar || "",
          dob: response.data.dob || "",
          profile_picture: response.data.profile_picture || "",
        }))
        if (response.data.emergency_contacts?.length > 0) {
          setEmergencyContact(response.data.emergency_contacts[0])
        }
      } else if (!response.status) {
        toast({
          variant: "destructive",
          title: "Warning",
          description: response.message || "Profile fetch failed, but some data was retrieved",
        })
      }
    } catch (error) {
      console.error("Fetch Profile Error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch profile data",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target
    setEmergencyContact((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const profileData = { ...profile }
      delete profileData.profile_picture
      delete profileData.password
      const response = await updateProfile(profileData)
      if (response.status) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
      } else {
        throw new Error(response.message || "Failed to update profile")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmergencyContactUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await updateProfile({ emergency_contacts: [emergencyContact] })
      if (response.status) {
        toast({
          title: "Success",
          description: "Emergency contact updated successfully",
        })
      } else {
        throw new Error(response.message || "Failed to update emergency contact")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update emergency contact",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Only JPG, JPEG, or PNG files are allowed",
      })
      return
    }

    if (file.size > 1048576) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "File size should not exceed 1MB",
      })
      return
    }

    try {
      setUploadLoading(true)

      // Create a temporary URL for preview
      const previewUrl = URL.createObjectURL(file)
      setProfile((prev) => ({ ...prev, profile_picture: previewUrl }))

      const formData = new FormData()
      formData.append("profile_picture", file)

      const response = await addProfile(formData)

      if (response.status) {
        // Use the URL from the response if available
        if (response.data && response.data.profile_picture) {
          setProfile((prev) => ({
            ...prev,
            profile_picture: response.data.profile_picture,
          }))
        }

        toast({
          title: "Success",
          description: "Profile picture updated successfully",
        })

        // Refresh profile data to ensure we have the latest from server
        await fetchProfile()
      } else {
        throw new Error(response.message || "Failed to upload profile picture")
      }
    } catch (error) {
      console.error("Image Upload Error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to upload image",
      })

      // Revert to previous state if there was an error
      await fetchProfile()
    } finally {
      setUploadLoading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // const handleRemoveProfilePicture = async () => {
  //   try {
  //     setUploadLoading(true)

  //     // Optimistically update UI
  //     setProfile((prev) => ({ ...prev, profile_picture: "" }))

  //     const response = await removeProfilePicture()

  //     if (response.status) {
  //       toast({
  //         title: "Success",
  //         description: "Profile picture removed successfully",
  //       })
  //     } else {
  //       throw new Error(response.message || "Failed to remove profile picture")
  //     }

  //     // Refresh profile data
  //     await fetchProfile()
  //   } catch (error) {
  //     console.error("Remove Profile Picture Error:", error)
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: error.message || "Failed to remove profile picture",
  //     })

  //     // Revert to previous state if there was an error
  //     await fetchProfile()
  //   } finally {
  //     setUploadLoading(false)
  //   }
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
    localStorage.setItem("theme", selectedTheme)
  }

  const handleThemeChange = (value) => {
    setTheme(value)
    applyTheme(value)
  }

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold mb-10 dark:text-white">General Settings</h1>

      {/* Avatar Section */}
      <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-1 dark:text-white">Profile Picture</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Choose an image that best reflects your identity
              <br />
              (JPG, JPEG, or PNG only. 1MB Max)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-700">
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", e)
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=80&width=80"
                  }}
                />
              ) : (
                <span className="text-green-800 dark:text-green-200 text-2xl font-semibold">
                  {profile.first_name?.[0]}
                  {profile.last_name?.[0]}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 dark:border-gray-600 dark:text-white cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {uploadLoading ? "Uploading..." : "Upload"}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleImageUpload}
                  disabled={uploadLoading || loading}
                />
              </label>
              {/* {profile.profile_picture && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 dark:text-red-400 flex items-center"
                  onClick={handleRemoveProfilePicture}
                  disabled={uploadLoading || loading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <form onSubmit={handleProfileUpdate} className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1 dark:text-white">Personal Information</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Edit your personal information</p>
          </div>
          <Button type="submit" disabled={loading} className="dark:bg-blue-700 dark:hover:bg-blue-800">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="first_name" className="dark:text-white">
              First Name
            </Label>
            <Input
              id="first_name"
              name="first_name"
              value={profile.first_name || ""}
              onChange={handleInputChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="middle_name" className="dark:text-white">
              Middle Name
            </Label>
            <Input
              id="middle_name"
              name="middle_name"
              value={profile.middle_name || ""}
              onChange={handleInputChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="last_name" className="dark:text-white">
              Last Name
            </Label>
            <Input
              id="last_name"
              name="last_name"
              value={profile.last_name || ""}
              onChange={handleInputChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="pan" className="dark:text-white">
              PAN
            </Label>
            <Input
              id="pan"
              name="pan"
              value={profile.pan || ""}
              onChange={handleInputChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="adhaar" className="dark:text-white">
              Aadhaar
            </Label>
            <Input
              id="adhaar"
              name="adhaar"
              value={profile.adhaar || ""}
              onChange={handleInputChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="dob" className="dark:text-white">
              Date of Birth
            </Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={profile.dob || ""}
              onChange={handleInputChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>
      </form>

      {/* Emergency Contact */}
      <form
        onSubmit={handleEmergencyContactUpdate}
        className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
      >
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-1 dark:text-white">Emergency Contact</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Edit your emergency contact details</p>
          </div>
          <Button type="submit" disabled={loading} className="dark:bg-blue-700 dark:hover:bg-blue-800">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="contact-name" className="dark:text-white">
              Name
            </Label>
            <Input
              id="contact-name"
              name="name"
              value={emergencyContact.name || ""}
              onChange={handleEmergencyContactChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="contact-relationship" className="dark:text-white">
              Relationship
            </Label>
            <Input
              id="contact-relationship"
              name="relationship"
              value={emergencyContact.relationship || ""}
              onChange={handleEmergencyContactChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="contact-phone" className="dark:text-white">
              Phone Number
            </Label>
            <Input
              id="contact-phone"
              name="phone_number"
              value={emergencyContact.phone_number || ""}
              onChange={handleEmergencyContactChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="contact-email" className="dark:text-white">
              Email
            </Label>
            <Input
              id="contact-email"
              name="email"
              value={emergencyContact.email || ""}
              onChange={handleEmergencyContactChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="contact-address" className="dark:text-white">
              Address
            </Label>
            <Input
              id="contact-address"
              name="address"
              value={emergencyContact.address || ""}
              onChange={handleEmergencyContactChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="contact-alt-phone" className="dark:text-white">
              Alternate Phone
            </Label>
            <Input
              id="contact-alt-phone"
              name="alternate_phone_number"
              value={emergencyContact.alternate_phone_number || ""}
              onChange={handleEmergencyContactChange}
              disabled={loading}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>
      </form>

      {/* Account Management */}
      <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-1 dark:text-white">Account Management</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Edit Your Password</p>

        <div className="flex space-x-4 items-center">
          <div className="relative flex-grow">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={profile.password}
              onChange={handleInputChange}
              className="w-full pr-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              disabled
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full dark:text-gray-300"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button variant="link" className="text-blue-600 dark:text-blue-400 whitespace-nowrap">
            Change Password
          </Button>
        </div>
      </div>

      {/* Language */}
      <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-1 dark:text-white">Language</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Customize your language</p>

        <Select defaultValue="english" disabled={loading}>
          <SelectTrigger className="w-full md:w-60 dark:bg-gray-700 dark:text-white dark:border-gray-600">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 dark:text-white">
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="german">German</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Theme */}
      <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-1 dark:text-white">Theme</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Choose a preferred theme</p>

        <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex space-x-6" disabled={loading}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" className="dark:border-white" />
            <Label htmlFor="light" className="dark:text-white">
              Light
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" className="dark:border-white" />
            <Label htmlFor="dark" className="dark:text-white">
              Dark
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col justify-between items-center mt-16">
        {" "}
        {/* Removed flex-reverse and added a div to wrap the buttons */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          {" "}
          {/* Added a div to wrap the buttons */}
          <Button variant="link" className="text-red-600 dark:text-red-400" disabled={loading}>
            Delete Account
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-full md:w-auto mb-4 md:mb-0"
            disabled={loading}
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  )
}

