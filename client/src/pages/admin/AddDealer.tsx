import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface PhoneNumber {
  id: number;
  value: string;
}

export default function AddDealer() {
  const [, setLocation] = useLocation();
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    { id: 1, value: "" },
    { id: 2, value: "" }
  ]);
  const [nextId, setNextId] = useState(3);

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, { id: nextId, value: "" }]);
    setNextId(nextId + 1);
  };

  const removePhoneNumber = (id: number) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter(phone => phone.id !== id));
    }
  };

  const updatePhoneNumber = (id: number, value: string) => {
    setPhoneNumbers(phoneNumbers.map(phone => 
      phone.id === id ? { ...phone, value } : phone
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    setLocation("/admin/dealer-list");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Dealer</h1>
        <div className="text-sm text-gray-500">
          Dashboard / Dealer List / Add Dealer
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealer-name" className="text-sm">Dealer Name</Label>
                  <Input 
                    id="dealer-name"
                    placeholder="" 
                    data-testid="input-dealer-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm">Type</Label>
                  <Select>
                    <SelectTrigger id="type" data-testid="select-type">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="both">Sales & Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dealer-website" className="text-sm">Dealer Website</Label>
                  <Input 
                    id="dealer-website"
                    placeholder="" 
                    data-testid="input-dealer-website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealer-pronunciation" className="text-sm">Dealer Pronunciation</Label>
                  <Input 
                    id="dealer-pronunciation"
                    placeholder="" 
                    data-testid="input-dealer-pronunciation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-zone" className="text-sm">Time Zone</Label>
                  <Select>
                    <SelectTrigger id="time-zone" data-testid="select-timezone">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pacific">Pacific Time (PT)</SelectItem>
                      <SelectItem value="mountain">Mountain Time (MT)</SelectItem>
                      <SelectItem value="central">Central Time (CT)</SelectItem>
                      <SelectItem value="eastern">Eastern Time (ET)</SelectItem>
                      <SelectItem value="alaska">Alaska Time (AKT)</SelectItem>
                      <SelectItem value="hawaii">Hawaii Time (HT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-email" className="text-sm">Crm Email</Label>
                  <Input 
                    id="crm-email"
                    placeholder="" 
                    type="email"
                    data-testid="input-crm-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crm-source" className="text-sm">Crm Source</Label>
                  <Input 
                    id="crm-source"
                    placeholder="" 
                    data-testid="input-crm-source"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-lxp-type" className="text-sm">Crm Lxp Type</Label>
                  <Input 
                    id="crm-lxp-type"
                    placeholder="" 
                    data-testid="input-crm-lxp-type"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="crm-email-subject" className="text-sm">Crm Email Subject</Label>
                  <Input 
                    id="crm-email-subject"
                    placeholder="" 
                    data-testid="input-crm-email-subject"
                  />
                </div>
              </div>

              {/* Phone Numbers Section */}
              <div className="space-y-4">
                {phoneNumbers.map((phone, index) => (
                  <div key={phone.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input 
                        placeholder="Enter dealer phone number with country code"
                        value={phone.value}
                        onChange={(e) => updatePhoneNumber(phone.id, e.target.value)}
                        data-testid={`input-phone-${index}`}
                      />
                    </div>
                    <div className="flex gap-2">
                      {index === phoneNumbers.length - 1 && index === 0 ? (
                        <Button 
                          type="button"
                          onClick={addPhoneNumber}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          data-testid="button-add-phone"
                        >
                          Add New Number
                        </Button>
                      ) : index === phoneNumbers.length - 1 ? (
                        <>
                          <Input 
                            placeholder="Enter dealer phone number with country code"
                            className="flex-1"
                            data-testid={`input-phone-extra-${index}`}
                          />
                          <Button 
                            type="button"
                            onClick={() => removePhoneNumber(phone.id)}
                            variant="destructive"
                            size="icon"
                            className="bg-red-500 hover:bg-red-600"
                            data-testid={`button-delete-phone-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : index < phoneNumbers.length - 1 && index > 0 ? (
                        <Input 
                          placeholder="Enter dealer phone number with country code"
                          data-testid={`input-phone-second-${index}`}
                        />
                      ) : null}
                    </div>
                    {index === phoneNumbers.length - 1 && phoneNumbers.length > 1 && (
                      <div className="md:col-span-2 -mt-2">
                        <Button 
                          type="button"
                          onClick={addPhoneNumber}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          data-testid="button-add-phone-bottom"
                        >
                          Add New Number
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Sales CRM Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-crm" className="text-sm">Sales Crm</Label>
                  <Input 
                    id="sales-crm"
                    placeholder="" 
                    data-testid="input-sales-crm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-link" className="text-sm">Link</Label>
                  <Input 
                    id="sales-link"
                    placeholder="" 
                    data-testid="input-sales-link"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-dealer-id" className="text-sm">Dealer Id</Label>
                  <Input 
                    id="sales-dealer-id"
                    placeholder="" 
                    data-testid="input-sales-dealer-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-username" className="text-sm">Username</Label>
                  <Input 
                    id="sales-username"
                    placeholder="" 
                    data-testid="input-sales-username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-password" className="text-sm">Password</Label>
                  <Input 
                    id="sales-password"
                    type="password"
                    placeholder="" 
                    data-testid="input-sales-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-text-code" className="text-sm">Text Code</Label>
                  <Input 
                    id="sales-text-code"
                    placeholder="" 
                    data-testid="input-sales-text-code"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="sales-email-code" className="text-sm">Email Code</Label>
                  <Input 
                    id="sales-email-code"
                    placeholder="" 
                    data-testid="input-sales-email-code"
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Data Mngmt / SIS CRM Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-crm" className="text-sm">Data Mngmt / SIS CRM</Label>
                  <Input 
                    id="data-mngmt-crm"
                    placeholder="" 
                    data-testid="input-data-mngmt-crm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-link" className="text-sm">Link</Label>
                  <Input 
                    id="data-mngmt-link"
                    placeholder="" 
                    data-testid="input-data-mngmt-link"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-dealer-id" className="text-sm">Dealer Id</Label>
                  <Input 
                    id="data-mngmt-dealer-id"
                    placeholder="" 
                    data-testid="input-data-mngmt-dealer-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-username" className="text-sm">Username</Label>
                  <Input 
                    id="data-mngmt-username"
                    placeholder="" 
                    data-testid="input-data-mngmt-username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-password" className="text-sm">Password</Label>
                  <Input 
                    id="data-mngmt-password"
                    type="password"
                    placeholder="" 
                    data-testid="input-data-mngmt-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-text-code" className="text-sm">Text Code</Label>
                  <Input 
                    id="data-mngmt-text-code"
                    placeholder="" 
                    data-testid="input-data-mngmt-text-code"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="data-mngmt-email-code" className="text-sm">Email Code</Label>
                  <Input 
                    id="data-mngmt-email-code"
                    placeholder="" 
                    data-testid="input-data-mngmt-email-code"
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Service CRM Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-crm" className="text-sm">Service Crm</Label>
                  <Input 
                    id="service-crm"
                    placeholder="" 
                    data-testid="input-service-crm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-link" className="text-sm">Link</Label>
                  <Input 
                    id="service-link"
                    placeholder="" 
                    data-testid="input-service-link"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-dealer-id" className="text-sm">Dealer Id</Label>
                  <Input 
                    id="service-dealer-id"
                    placeholder="" 
                    data-testid="input-service-dealer-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-username" className="text-sm">Username</Label>
                  <Input 
                    id="service-username"
                    placeholder="" 
                    data-testid="input-service-username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-password" className="text-sm">Password</Label>
                  <Input 
                    id="service-password"
                    type="password"
                    placeholder="" 
                    data-testid="input-service-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-text-code" className="text-sm">Text Code</Label>
                  <Input 
                    id="service-text-code"
                    placeholder="" 
                    data-testid="input-service-text-code"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="service-email-code" className="text-sm">Email Code</Label>
                  <Input 
                    id="service-email-code"
                    placeholder="" 
                    data-testid="input-service-email-code"
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Transfer Numbers Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="special-member" className="text-sm">Special Member</Label>
                  <Input 
                    id="special-member"
                    placeholder="" 
                    data-testid="input-special-member"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hq-manager" className="text-sm">Hq Manager #</Label>
                  <Input 
                    id="hq-manager"
                    placeholder="" 
                    data-testid="input-hq-manager"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-transfer" className="text-sm">Sales Transfer #</Label>
                  <Input 
                    id="sales-transfer"
                    placeholder="" 
                    data-testid="input-sales-transfer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-transfer" className="text-sm">Service Transfer #</Label>
                  <Input 
                    id="service-transfer"
                    placeholder="" 
                    data-testid="input-service-transfer"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="part-transfer" className="text-sm">Part Transfer #</Label>
                  <Input 
                    id="part-transfer"
                    placeholder="" 
                    data-testid="input-part-transfer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ring-central" className="text-sm">Ring Central #</Label>
                  <Input 
                    id="ring-central"
                    placeholder="" 
                    data-testid="input-ring-central"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addresses" className="text-sm">Addresses #</Label>
                  <Input 
                    id="addresses"
                    placeholder="" 
                    data-testid="input-addresses"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours" className="text-sm">Hours #</Label>
                  <Input 
                    id="hours"
                    placeholder="" 
                    data-testid="input-hours"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  data-testid="button-submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
