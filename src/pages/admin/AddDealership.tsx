import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { dealershipStore } from "@/lib/dealershipStore";

// Mock dealers list - in real app, this would come from an API
const availableDealers = [
  "Downtown Toyota",
  "Downtown Subaru",
  "Sterling BMW",
  "Sterling MINI",
  "Orlando Nissan",
  "Woodbridge Koons",
];

export default function AddDealership() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    assignedDealers: [] as string[],
  });
  const [selectedDealer, setSelectedDealer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    dealershipStore.addDealership({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      showCallLogs: false,
      status: true,
      assignedDealers: formData.assignedDealers,
    });

    toast({
      title: "Success",
      description: "Dealership created successfully",
    });
    
    setLocation('/admin/dealership-logins');
  };

  const handleAddDealer = () => {
    if (selectedDealer && !formData.assignedDealers.includes(selectedDealer)) {
      setFormData({
        ...formData,
        assignedDealers: [...formData.assignedDealers, selectedDealer],
      });
      setSelectedDealer("");
    }
  };

  const handleRemoveDealer = (dealer: string) => {
    setFormData({
      ...formData,
      assignedDealers: formData.assignedDealers.filter(d => d !== dealer),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Add Dealership</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              Dashboard / Dealership List / Add Dealership
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Dealership Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Dealership Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    data-testid="input-password"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Dealership Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="manager@truebdc.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Dealership Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    data-testid="input-confirm-password"
                  />
                </div>
              </div>
            </div>

            {/* Assign Dealers */}
            <div className="space-y-2">
              <Label htmlFor="assignDealers">Dealership Assign Dealers</Label>
              <div className="flex gap-2">
                <Select value={selectedDealer} onValueChange={setSelectedDealer}>
                  <SelectTrigger id="assignDealers" data-testid="select-dealer">
                    <SelectValue placeholder="Select dealer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDealers.map((dealer) => (
                      <SelectItem key={dealer} value={dealer}>
                        {dealer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleAddDealer}
                  disabled={!selectedDealer}
                  data-testid="button-add-dealer"
                >
                  Add
                </Button>
              </div>
              
              {/* Display assigned dealers */}
              {formData.assignedDealers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.assignedDealers.map((dealer) => (
                    <div
                      key={dealer}
                      className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded"
                      data-testid={`assigned-dealer-${dealer}`}
                    >
                      {dealer}
                      <button
                        type="button"
                        onClick={() => handleRemoveDealer(dealer)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                data-testid="button-create"
              >
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
