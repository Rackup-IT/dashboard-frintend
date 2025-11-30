import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useEffect, useState } from "react";

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    siteName: "BDC Professional",
    siteAddress: "",
    siteEmail: "manager@bdc.com",
    siteSupportEmail: "manager@bdc.com",
    sitePhone: "+95843877596",
    timezone: "America/New_York",
    debugMode: "Disable",
  });

  useEffect(() => {
    loadGeneralSettings();
  }, []);

  const loadGeneralSettings = () => {
    apiRequest("GET", "general/settings").then((data) => {
      if (data.settings) {
        setSettings(data.settings);
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearCache = () => {
    console.log("Clearing cache...");
  };
  const handleSaveSettings = () => {
    apiRequest("PUT", "general/settings", settings).then((data) => {
      alert("Settings saved successfully!");
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>General Settings</CardTitle>
            <Button
              onClick={handleClearCache}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Clear Cache
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) =>
                    handleInputChange("siteName", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteAddress">Site Address</Label>
                <Textarea
                  id="siteAddress"
                  rows={3}
                  value={settings.siteAddress}
                  onChange={(e) =>
                    handleInputChange("siteAddress", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteSupportEmail">Site Support Email</Label>
                <Input
                  id="siteSupportEmail"
                  type="email"
                  value={settings.siteSupportEmail}
                  onChange={(e) =>
                    handleInputChange("siteSupportEmail", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    handleInputChange("timezone", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      America/New_York
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      America/Chicago
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      America/Denver
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      America/Los_Angeles
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteEmail">Site Email</Label>
                <Input
                  id="siteEmail"
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) =>
                    handleInputChange("siteEmail", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sitePhone">Site Phone</Label>
                <Input
                  id="sitePhone"
                  type="tel"
                  value={settings.sitePhone}
                  onChange={(e) =>
                    handleInputChange("sitePhone", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debugMode">Debug Mode</Label>
                <Select
                  value={settings.debugMode}
                  onValueChange={(value) =>
                    handleInputChange("debugMode", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disable">Disable</SelectItem>
                    <SelectItem value="Enable">Enable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-end p-4">
          <Button
            onClick={handleSaveSettings}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Save Settings
          </Button>
        </div>
      </Card>

      {/* Logo Settings */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-3">
                  <Button variant="secondary" size="sm">Choose File</Button>
                  <span className="text-sm text-gray-500">No file chosen</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
                      <span className="font-bold">TRUE</span>
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="font-bold">BDC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
           
            <div className="space-y-2">
              <Label>Light Logo</Label>
              <div className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-3">
                  <Button variant="secondary" size="sm">Choose File</Button>
                  <span className="text-sm text-gray-500">No file chosen</span>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-white text-gray-900 px-4 py-2 rounded-lg">
                      <span className="font-bold">TRUE</span>
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <span className="font-bold">BDC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
         
          <div className="mt-6">
            <Label>Favicon</Label>
            <div className="border border-gray-300 rounded-lg p-4 max-w-md">
              <div className="flex items-center space-x-4 mb-3">
                <Button variant="secondary" size="sm">Choose File</Button>
                <span className="text-sm text-gray-500">No file chosen</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
