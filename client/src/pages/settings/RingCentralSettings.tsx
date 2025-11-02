import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Settings, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RingCentralSettings() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientId: "aASqKhC46OsGd2KiwgKFCz",
    clientSecret: "4SWwSlIwJDvcaxOqMGKSNFBYwLnqJTRwalR4dwIFSmW0",
    serverUrl: "https://platform.ringcentral.com",
    jwtToken: "OTBkX0RpwS_sMWhmaVlQi2kAmLinJJoWpQxWMkmpB3muJIHyJUGf4dz-YyJ0xx",
    allowNotifications: "Yes"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    // Save settings logic here
    console.log("Updating Ring Central Settings:", formData);
    toast({
      title: "Success",
      description: "Ring Central settings updated successfully",
    });
  };

  const handleClearCache = () => {
    console.log("Clearing cache...");
    toast({
      title: "Cache Cleared",
      description: "Ring Central cache has been cleared",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar Navigation */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="space-y-2">
          <Link href="/settings/general">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                location === "/settings/general" && "bg-white"
              )}
              data-testid="nav-general-settings"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-600" />
              <span>General Settings</span>
            </Button>
          </Link>
          <Link href="/settings/ring-central">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                location === "/settings/ring-central" && "bg-white text-blue-600"
              )}
              data-testid="nav-ring-central-settings"
            >
              <Phone className="mr-3 h-5 w-5 text-blue-600" />
              <span>Ring Central Settings</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-page-title">Ring Central Setting</h1>
              <p className="text-sm text-muted-foreground">
                Dashboard / Ring-central Setting
              </p>
            </div>
            <Button 
              onClick={handleClearCache}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              data-testid="button-clear-cache"
            >
              Clear Cache
            </Button>
          </div>

          {/* Form Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* First Row - Client ID and Client Secret */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Ring central client id</Label>
                    <Input
                      id="clientId"
                      value={formData.clientId}
                      onChange={(e) => handleInputChange("clientId", e.target.value)}
                      data-testid="input-client-id"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Ring central client secret</Label>
                    <Input
                      id="clientSecret"
                      value={formData.clientSecret}
                      onChange={(e) => handleInputChange("clientSecret", e.target.value)}
                      data-testid="input-client-secret"
                    />
                  </div>
                </div>

                {/* Second Row - Server URL and JWT Token */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serverUrl">Ring central server url</Label>
                    <Input
                      id="serverUrl"
                      value={formData.serverUrl}
                      onChange={(e) => handleInputChange("serverUrl", e.target.value)}
                      data-testid="input-server-url"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jwtToken">Ring central jwt token</Label>
                    <Input
                      id="jwtToken"
                      value={formData.jwtToken}
                      onChange={(e) => handleInputChange("jwtToken", e.target.value)}
                      data-testid="input-jwt-token"
                    />
                  </div>
                </div>

                {/* Third Row - Allow Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="allowNotifications">Allow Notifications</Label>
                    <Select
                      value={formData.allowNotifications}
                      onValueChange={(value) => handleInputChange("allowNotifications", value)}
                    >
                      <SelectTrigger id="allowNotifications" data-testid="select-allow-notifications">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Update Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleUpdate}
                    className="bg-blue-600 hover:bg-blue-700"
                    data-testid="button-update"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
