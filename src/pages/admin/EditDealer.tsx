import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { type DealerItem } from "@/lib/dealerListStore";
import { apiRequest } from "@/lib/queryClient";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";

const TIMEZONES = [
  "Pacific Time Zone",
  "Mountain Time Zone",
  "Central Time Zone",
  "Eastern Time Zone",
];

const DEALER_TYPES = ["SALES", "S2S", "SERVICE"];

export default function EditDealer() {
  const [, params] = useRoute("/admin/dealers/:id/edit");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const dealerId = params?.id;

  const [formData, setFormData] = useState<Partial<DealerItem>>({
    dealerName: "",
    type: [],
    website: "",
    permasignupUrl: "",
    timezone: "",
    crmEmail: "",
    crmSource: "",
    crmUrlType: "",
    crmEmailSubject: "",
    phoneNumbers: [],
    salesCrmLink: "",
    salesCrmUsername: "",
    salesCrmPassword: "",
    salesCrmEmailCode: "",
    dataMiningLink: "",
    dataMiningUsername: "",
    dataMiningPassword: "",
    dataMiningEmailCode: "",
    dealerIdN: "",
    dealerIdUsername: "",
    dealerIdPassword: "",
    dealerIdEmailCode: "",
    serviceCrmLink: "",
    serviceCrmUsername: "",
    serviceCrmPassword: "",
    serviceCrmEmailCode: "",
    specialAttention: "",
    voManager: "",
    salesTransfer: "",
    serviceTransfer: "",
    faxTransfer: "",
    ringCentral: "",
    address: "",
    hours: "",
  });

  const [typeDropdownValue, setTypeDropdownValue] = useState("");

  useEffect(() => {
    if (dealerId) {
      const dealer = apiRequest("GET", `dealer/get-single/${dealerId}`).then(
        (data) => {
          console.log(data);
          return data.dealer;
        }
      );
      if (dealer) {
        setFormData(dealer);
      } else {
        toast({
          title: "Error",
          description: "Dealer not found",
          variant: "destructive",
        });
        setLocation("/admin/dealer-list");
      }
    }
  }, [dealerId]);

  const handleInputChange = (field: keyof DealerItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddType = (type: string) => {
    if (type && !formData.type?.includes(type)) {
      setFormData((prev) => ({
        ...prev,
        type: [...(prev.type || []), type],
      }));
      setTypeDropdownValue("");
    }
  };

  const handleRemoveType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      type: prev.type?.filter((t) => t !== type) || [],
    }));
  };

  const handleAddPhoneNumber = () => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: [...(prev.phoneNumbers || []), ""],
    }));
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumbers = [...(formData.phoneNumbers || [])];
    newPhoneNumbers[index] = value;
    setFormData((prev) => ({ ...prev, phoneNumbers: newPhoneNumbers }));
  };

  const handleRemovePhoneNumber = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealerId) return;

    const dealerUpdates = { ...formData };
    const res = apiRequest(
      "PUT",
      `dealer/update/${dealerId}`,
      dealerUpdates
    ).then((data) => {
      toast({
        title: "Success",
        description: "Dealer updated successfully",
      });
      setLocation("/admin/dealer-list");
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Dealer</h1>
        <div className="text-sm text-gray-500">
          <span>Dashboard</span> / <span>Dealer List</span> /{" "}
          <span>Edit Dealer</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dealerName">Dealer Name</Label>
                <Input
                  id="dealerName"
                  value={formData.dealerName || ""}
                  onChange={(e) =>
                    handleInputChange("dealerName", e.target.value)
                  }
                  placeholder="Downtown Toyota"
                  data-testid="input-dealer-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <div className="space-y-2">
                  <Select
                    value={typeDropdownValue}
                    onValueChange={handleAddType}
                  >
                    <SelectTrigger data-testid="select-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEALER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {formData.type?.map((type) => (
                      <div
                        key={type}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                        data-testid={`chip-type-${type.toLowerCase()}`}
                      >
                        <span>{type}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveType(type)}
                          className="hover:bg-gray-300 rounded-full p-0.5"
                          data-testid={`button-remove-type-${type.toLowerCase()}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="website">Dealer Website</Label>
                <Input
                  id="website"
                  value={formData.website || ""}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.downtowntoyota.com"
                  data-testid="input-website"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permasignupUrl">Dealer Permasignup</Label>
                <Input
                  id="permasignupUrl"
                  value={formData.permasignupUrl || ""}
                  onChange={(e) =>
                    handleInputChange("permasignupUrl", e.target.value)
                  }
                  placeholder="https://bfbs.group.com/shop/login.asp..."
                  data-testid="input-permasignup"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select
                  value={formData.timezone || ""}
                  onValueChange={(value) =>
                    handleInputChange("timezone", value)
                  }
                >
                  <SelectTrigger data-testid="select-timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="crmEmail">Crm-Email</Label>
                <Input
                  id="crmEmail"
                  value={formData.crmEmail || ""}
                  onChange={(e) =>
                    handleInputChange("crmEmail", e.target.value)
                  }
                  data-testid="input-crm-email"
                />
              </div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="crmSource">Crm Source</Label>
                <Input
                  id="crmSource"
                  value={formData.crmSource || ""}
                  onChange={(e) =>
                    handleInputChange("crmSource", e.target.value)
                  }
                  data-testid="input-crm-source"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crmUrlType">Crm-Url-Type</Label>
                <Input
                  id="crmUrlType"
                  value={formData.crmUrlType || ""}
                  onChange={(e) =>
                    handleInputChange("crmUrlType", e.target.value)
                  }
                  data-testid="input-crm-url-type"
                />
              </div>
            </div>

            {/* Fifth Row */}
            <div className="space-y-2">
              <Label htmlFor="crmEmailSubject">Crm Email Subject</Label>
              <Input
                id="crmEmailSubject"
                value={formData.crmEmailSubject || ""}
                onChange={(e) =>
                  handleInputChange("crmEmailSubject", e.target.value)
                }
                placeholder="Crm Email Subject"
                data-testid="input-crm-email-subject"
              />
            </div>

            {/* Phone Numbers Section */}
            <div className="space-y-3">
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleAddPhoneNumber}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="button-add-number"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Number
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {formData.phoneNumbers?.map((phone, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={phone}
                      onChange={(e) =>
                        handlePhoneNumberChange(index, e.target.value)
                      }
                      placeholder="+1234567890"
                      data-testid={`input-phone-${index}`}
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemovePhoneNumber(index)}
                      variant="destructive"
                      size="icon"
                      data-testid={`button-remove-phone-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Crm Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Sales Crm</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salesCrmLink">Link</Label>
                  <Input
                    id="salesCrmLink"
                    value={formData.salesCrmLink || ""}
                    onChange={(e) =>
                      handleInputChange("salesCrmLink", e.target.value)
                    }
                    placeholder="https://www.ekadro.com"
                    data-testid="input-sales-crm-link"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salesCrmUsername">Username</Label>
                  <Input
                    id="salesCrmUsername"
                    value={formData.salesCrmUsername || ""}
                    onChange={(e) =>
                      handleInputChange("salesCrmUsername", e.target.value)
                    }
                    placeholder="manager@truebdc.com"
                    data-testid="input-sales-crm-username"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salesCrmPassword">Password</Label>
                  <Input
                    id="salesCrmPassword"
                    type="password"
                    value={formData.salesCrmPassword || ""}
                    onChange={(e) =>
                      handleInputChange("salesCrmPassword", e.target.value)
                    }
                    data-testid="input-sales-crm-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salesCrmEmailCode">Email Code</Label>
                  <Input
                    id="salesCrmEmailCode"
                    value={formData.salesCrmEmailCode || ""}
                    onChange={(e) =>
                      handleInputChange("salesCrmEmailCode", e.target.value)
                    }
                    data-testid="input-sales-crm-email-code"
                  />
                </div>
              </div>
            </div>

            {/* Data Mining/S2S CRM Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">
                Data Mining/S2S CRM
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dataMiningLink">Link</Label>
                  <Input
                    id="dataMiningLink"
                    value={formData.dataMiningLink || ""}
                    onChange={(e) =>
                      handleInputChange("dataMiningLink", e.target.value)
                    }
                    data-testid="input-data-mining-link"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataMiningUsername">Username</Label>
                  <Input
                    id="dataMiningUsername"
                    value={formData.dataMiningUsername || ""}
                    onChange={(e) =>
                      handleInputChange("dataMiningUsername", e.target.value)
                    }
                    data-testid="input-data-mining-username"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dataMiningPassword">Password</Label>
                  <Input
                    id="dataMiningPassword"
                    type="password"
                    value={formData.dataMiningPassword || ""}
                    onChange={(e) =>
                      handleInputChange("dataMiningPassword", e.target.value)
                    }
                    data-testid="input-data-mining-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataMiningEmailCode">Email Code</Label>
                  <Input
                    id="dataMiningEmailCode"
                    value={formData.dataMiningEmailCode || ""}
                    onChange={(e) =>
                      handleInputChange("dataMiningEmailCode", e.target.value)
                    }
                    data-testid="input-data-mining-email-code"
                  />
                </div>
              </div>
            </div>

            {/* Dealer Id Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Dealer Id</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dealerIdN">N</Label>
                  <Input
                    id="dealerIdN"
                    value={formData.dealerIdN || ""}
                    onChange={(e) =>
                      handleInputChange("dealerIdN", e.target.value)
                    }
                    data-testid="input-dealer-id-n"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealerIdUsername">Username</Label>
                  <Input
                    id="dealerIdUsername"
                    value={formData.dealerIdUsername || ""}
                    onChange={(e) =>
                      handleInputChange("dealerIdUsername", e.target.value)
                    }
                    data-testid="input-dealer-id-username"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dealerIdPassword">Password</Label>
                  <Input
                    id="dealerIdPassword"
                    type="password"
                    value={formData.dealerIdPassword || ""}
                    onChange={(e) =>
                      handleInputChange("dealerIdPassword", e.target.value)
                    }
                    data-testid="input-dealer-id-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealerIdEmailCode">Email Code</Label>
                  <Input
                    id="dealerIdEmailCode"
                    value={formData.dealerIdEmailCode || ""}
                    onChange={(e) =>
                      handleInputChange("dealerIdEmailCode", e.target.value)
                    }
                    data-testid="input-dealer-id-email-code"
                  />
                </div>
              </div>
            </div>

            {/* Service Crm Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Service Crm</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceCrmLink">Link</Label>
                  <Input
                    id="serviceCrmLink"
                    value={formData.serviceCrmLink || ""}
                    onChange={(e) =>
                      handleInputChange("serviceCrmLink", e.target.value)
                    }
                    data-testid="input-service-crm-link"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceCrmUsername">Username</Label>
                  <Input
                    id="serviceCrmUsername"
                    value={formData.serviceCrmUsername || ""}
                    onChange={(e) =>
                      handleInputChange("serviceCrmUsername", e.target.value)
                    }
                    data-testid="input-service-crm-username"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceCrmPassword">Password</Label>
                  <Input
                    id="serviceCrmPassword"
                    type="password"
                    value={formData.serviceCrmPassword || ""}
                    onChange={(e) =>
                      handleInputChange("serviceCrmPassword", e.target.value)
                    }
                    data-testid="input-service-crm-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceCrmEmailCode">Email Code</Label>
                  <Input
                    id="serviceCrmEmailCode"
                    value={formData.serviceCrmEmailCode || ""}
                    onChange={(e) =>
                      handleInputChange("serviceCrmEmailCode", e.target.value)
                    }
                    data-testid="input-service-crm-email-code"
                  />
                </div>
              </div>
            </div>

            {/* Transfer Numbers Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="specialAttention">Special Attention #</Label>
                <Input
                  id="specialAttention"
                  value={formData.specialAttention || ""}
                  onChange={(e) =>
                    handleInputChange("specialAttention", e.target.value)
                  }
                  placeholder="N/A"
                  data-testid="input-special-attention"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="voManager">Vo-Manager #</Label>
                <Input
                  id="voManager"
                  value={formData.voManager || ""}
                  onChange={(e) =>
                    handleInputChange("voManager", e.target.value)
                  }
                  placeholder="VIP Manager"
                  data-testid="input-vo-manager"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salesTransfer">Sales Transfer #</Label>
                <Input
                  id="salesTransfer"
                  value={formData.salesTransfer || ""}
                  onChange={(e) =>
                    handleInputChange("salesTransfer", e.target.value)
                  }
                  placeholder="888-360-2937"
                  data-testid="input-sales-transfer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceTransfer">Service Transfer #</Label>
                <Input
                  id="serviceTransfer"
                  value={formData.serviceTransfer || ""}
                  onChange={(e) =>
                    handleInputChange("serviceTransfer", e.target.value)
                  }
                  placeholder="888-360-2937"
                  data-testid="input-service-transfer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="faxTransfer">Fax Transfer #</Label>
                <Input
                  id="faxTransfer"
                  value={formData.faxTransfer || ""}
                  onChange={(e) =>
                    handleInputChange("faxTransfer", e.target.value)
                  }
                  placeholder="N/A"
                  data-testid="input-fax-transfer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ringCentral">Ring Central #</Label>
                <Input
                  id="ringCentral"
                  value={formData.ringCentral || ""}
                  onChange={(e) =>
                    handleInputChange("ringCentral", e.target.value)
                  }
                  placeholder="410-987-7907"
                  data-testid="input-ring-central"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="4145 Broadway Oakland, CA 94611, USA"
                data-testid="input-address"
              />
            </div>

            {/* Hours Section */}
            <div className="space-y-2">
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                value={formData.hours || ""}
                onChange={(e) => handleInputChange("hours", e.target.value)}
                placeholder="Mon - Sat: 9:30am - 7pm / Sun - 9pm - 7pm"
                data-testid="input-hours"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                data-testid="button-submit"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
