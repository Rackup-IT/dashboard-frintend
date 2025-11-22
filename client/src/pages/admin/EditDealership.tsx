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
import { useToast } from "@/hooks/use-toast";
import { dealershipStore } from "@/lib/dealershipStore";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

// Mock dealers list - in real app, this would come from an API
const availableDealers = [
  "Downtown Toyota",
  "Downtown Subaru",
  "Sterling BMW",
  "Sterling MINI",
  "Orlando Nissan",
  "Woodbridge Koons",
];

export default function EditDealership() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/dealerships/:id/edit");
  const { toast } = useToast();

  const dealershipId = params?.id ? parseInt(params.id) : 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    assignedDealers: [] as string[],
  });
  const [selectedDealer, setSelectedDealer] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (dealershipId) {
      const dealership = dealershipStore.getDealership(dealershipId);
      if (dealership) {
        setFormData({
          name: dealership.name,
          email: dealership.email,
          password: "",
          confirmPassword: "",
          assignedDealers: dealership.assignedDealers || [],
        });
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
  }, [dealershipId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const updates: any = {
      name: formData.name,
      email: formData.email,
      assignedDealers: formData.assignedDealers,
    };

    if (formData.password) {
      updates.password = formData.password;
    }

    dealershipStore.updateDealership(dealershipId, updates);

    toast({
      title: "Success",
      description: "Dealership updated successfully",
    });

    setLocation("/admin/dealership-logins");
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
      assignedDealers: formData.assignedDealers.filter((d) => d !== dealer),
    });
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-4">
        <p>Dealership not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Edit Dealership</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              Dashboard / Dealership List / Edit Dealership
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    data-testid="input-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Dealership Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Dealership Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    data-testid="input-confirm-password"
                  />
                </div>
              </div>
            </div>

            {/* Assign Dealers */}
            <div className="space-y-2">
              <Label htmlFor="assignDealers">Dealership Assign Dealers</Label>

              {/* Display assigned dealers as badges */}
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.assignedDealers.map((dealer) => (
                  <div
                    key={dealer}
                    className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm"
                    data-testid={`assigned-dealer-${dealer}`}
                  >
                    {dealer}
                    <button
                      type="button"
                      onClick={() => handleRemoveDealer(dealer)}
                      className="text-gray-600 hover:text-gray-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedDealer}
                  onValueChange={setSelectedDealer}
                >
                  <SelectTrigger id="assignDealers" data-testid="select-dealer">
                    <SelectValue placeholder="Select dealer to add..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDealers
                      .filter(
                        (dealer) => !formData.assignedDealers.includes(dealer)
                      )
                      .map((dealer) => (
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
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                data-testid="button-update"
              >
                Update
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
