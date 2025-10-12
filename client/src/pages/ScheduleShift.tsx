import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Lock, Calendar, Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";

type TabType = "schedule" | "password" | "profile";

export default function ScheduleShift() {
  const [activeTab, setActiveTab] = useState<TabType>("schedule");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Profile form state
  const [name, setName] = useState("Admin Admin");
  const [email, setEmail] = useState("manager@truebdc.com");
  const [phone, setPhone] = useState("+1659202819");

  const renderScheduleContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Schedule</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600">Select your schedule</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Shift</h3>
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center">Day</TableHead>
              <TableHead className="text-center">Start Time</TableHead>
              <TableHead className="text-center">End Time</TableHead>
              <TableHead className="text-center">Lunch Start Time</TableHead>
              <TableHead className="text-center">Lunch End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Empty table rows to match screenshot */}
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                No schedule data available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="flex justify-end mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Change Schedule & Shift
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPasswordContent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Change Password</h3>
      
      <div className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <div className="relative">
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg max-w-md">
        <h4 className="font-medium mb-2">Password requirements:</h4>
        <p className="text-sm text-gray-600 mb-2">Ensure that these requirements are met:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Lowercase & Uppercase
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Number (0-9)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Special Character (!@#$%^&*)
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Atleast 8 Characters
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Change Password
        </Button>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Basic Info</h3>
      
      <div className="space-y-6 max-w-md">
        <div className="text-center">
          <Label>Profile</Label>
          <div className="mt-2 flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="text-white text-2xl">👤</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Update Profile
        </Button>
      </div>
    </div>
  );

  const getBreadcrumb = () => {
    switch (activeTab) {
      case "password":
        return "Dashboard / Change Password";
      case "profile":
        return "Dashboard / My Account";
      default:
        return "Dashboard / Schedule & Shift";
    }
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <div className="w-64 space-y-1">
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
            activeTab === "profile" 
              ? "bg-blue-100 text-blue-600" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <User className="h-4 w-4" />
          Profile Setting
        </button>
        
        <button
          onClick={() => setActiveTab("password")}
          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
            activeTab === "password" 
              ? "bg-blue-100 text-blue-600" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Lock className="h-4 w-4" />
          Change Password
        </button>
        
        <button
          onClick={() => setActiveTab("schedule")}
          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
            activeTab === "schedule" 
              ? "bg-blue-100 text-blue-600" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Calendar className="h-4 w-4" />
          Schedule & Shift
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {activeTab === "schedule" && <Calendar className="h-5 w-5" />}
              {activeTab === "password" && <Lock className="h-5 w-5" />}
              {activeTab === "profile" && <User className="h-5 w-5" />}
              <div>
                <CardTitle>
                  {activeTab === "schedule" && "Schedule & Shift"}
                  {activeTab === "password" && "Change Password"}
                  {activeTab === "profile" && "Basic Info"}
                </CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  {getBreadcrumb()}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === "schedule" && renderScheduleContent()}
            {activeTab === "password" && renderPasswordContent()}
            {activeTab === "profile" && renderProfileContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}