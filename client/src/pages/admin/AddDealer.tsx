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
import { apiRequest } from "@/lib/queryClient";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

type NullableString = string | "";

interface PhoneNumber {
  id: number;
  value: string;
}

interface DealerForm {
  dealerName: NullableString;
  dealerWebsite: NullableString;
  dealerPronunciation: NullableString;
  crmEmail: NullableString;
  crmSource: NullableString;
  crmLxpType: NullableString;
  crmEmailSubject: NullableString;

  salesCrm: NullableString;
  salesLink: NullableString;
  salesDealerId: NullableString;
  salesUsername: NullableString;
  salesPassword: NullableString;
  salesTextCode: NullableString;
  salesEmailCode: NullableString;

  dataMngmtCrm: NullableString;
  dataMngmtLink: NullableString;
  dataMngmtDealerId: NullableString;
  dataMngmtUsername: NullableString;
  dataMngmtPassword: NullableString;
  dataMngmtTextCode: NullableString;
  dataMngmtEmailCode: NullableString;

  serviceCrm: NullableString;
  serviceLink: NullableString;
  serviceDealerId: NullableString;
  serviceUsername: NullableString;
  servicePassword: NullableString;
  serviceTextCode: NullableString;
  serviceEmailCode: NullableString;

  specialMember: NullableString;
  hqManager: NullableString;
  salesTransfer: NullableString;
  serviceTransfer: NullableString;
  partTransfer: NullableString;
  ringCentral: NullableString;
  addresses: NullableString;
  hours: NullableString;
}

export default function AddDealer() {
  const [, setLocation] = useLocation();
  const [type, setType] = useState<string>("");
  const [timeZone, setTimeZone] = useState<string>("");

  const [form, setForm] = useState<DealerForm>({
    dealerName: "",
    dealerWebsite: "",
    dealerPronunciation: "",
    crmEmail: "",
    crmSource: "",
    crmLxpType: "",
    crmEmailSubject: "",

    salesCrm: "",
    salesLink: "",
    salesDealerId: "",
    salesUsername: "",
    salesPassword: "",
    salesTextCode: "",
    salesEmailCode: "",

    dataMngmtCrm: "",
    dataMngmtLink: "",
    dataMngmtDealerId: "",
    dataMngmtUsername: "",
    dataMngmtPassword: "",
    dataMngmtTextCode: "",
    dataMngmtEmailCode: "",

    serviceCrm: "",
    serviceLink: "",
    serviceDealerId: "",
    serviceUsername: "",
    servicePassword: "",
    serviceTextCode: "",
    serviceEmailCode: "",

    specialMember: "",
    hqManager: "",
    salesTransfer: "",
    serviceTransfer: "",
    partTransfer: "",
    ringCentral: "",
    addresses: "",
    hours: "",
  });

  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const [nextId, setNextId] = useState(3);
  const [loading, setLoading] = useState(false);

  const addPhoneNumber = () => {
    setPhoneNumbers((s) => [...s, { id: nextId, value: "" }]);
    setNextId((n) => n + 1);
  };

  const removePhoneNumber = (id: number) => {
    setPhoneNumbers((s) => (s.length > 1 ? s.filter((p) => p.id !== id) : s));
  };

  const updatePhoneNumber = (id: number, value: string) => {
    setPhoneNumbers((s) => s.map((p) => (p.id === id ? { ...p, value } : p)));
  };

  const validate = (): string | null => {
    if (!form.dealerName || form.dealerName.trim() === "")
      return "Dealer name is required";
    // add more validation rules here as needed
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      console.error(err);
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      // append form fields
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ""));
      fd.append("type", type);
      fd.append("timeZone", timeZone);
      phoneNumbers.forEach((p, i) =>
        fd.append(`phoneNumbers[${i}]`, p.value ?? "")
      );
      console.log("Submitting form data:", form, {
        type,
        timeZone,
        phoneNumbers,
      });

      const res = await apiRequest("POST", `dealer/create`, form);
      if (res.success) {
        setLocation("/admin/dealer-list");
      }
    } catch (err) {
      console.error("Failed to create dealer", err);
    } finally {
      setLoading(false);
    }
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

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Basic Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dealer-name" className="text-sm">
                    Dealer Name
                  </Label>
                  <Input
                    id="dealer-name"
                    name="dealerName"
                    placeholder=""
                    data-testid="input-dealer-name"
                    value={form.dealerName}
                    onChange={(e) =>
                      setForm({ ...form, dealerName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm">
                    Type
                  </Label>
                  <Select onValueChange={(v) => setType(v)} value={type}>
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
                  <Label htmlFor="dealer-website" className="text-sm">
                    Dealer Website
                  </Label>
                  <Input
                    id="dealer-website"
                    name="dealerWebsite"
                    placeholder=""
                    data-testid="input-dealer-website"
                    value={form.dealerWebsite}
                    onChange={(e) =>
                      setForm({ ...form, dealerWebsite: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dealer-pronunciation" className="text-sm">
                    Dealer Pronunciation
                  </Label>
                  <Input
                    id="dealer-pronunciation"
                    name="dealerPronunciation"
                    placeholder=""
                    data-testid="input-dealer-pronunciation"
                    value={form.dealerPronunciation}
                    onChange={(e) =>
                      setForm({ ...form, dealerPronunciation: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-zone" className="text-sm">
                    Time Zone
                  </Label>
                  <Select
                    onValueChange={(v) => setTimeZone(v)}
                    value={timeZone}
                  >
                    <SelectTrigger id="time-zone" data-testid="select-timezone">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pacific">Pacific Time (PT)</SelectItem>
                      <SelectItem value="mountain">
                        Mountain Time (MT)
                      </SelectItem>
                      <SelectItem value="central">Central Time (CT)</SelectItem>
                      <SelectItem value="eastern">Eastern Time (ET)</SelectItem>
                      <SelectItem value="alaska">Alaska Time (AKT)</SelectItem>
                      <SelectItem value="hawaii">Hawaii Time (HT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-email" className="text-sm">
                    Crm Email
                  </Label>
                  <Input
                    id="crm-email"
                    name="crmEmail"
                    placeholder=""
                    type="email"
                    data-testid="input-crm-email"
                    value={form.crmEmail}
                    onChange={(e) =>
                      setForm({ ...form, crmEmail: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crm-source" className="text-sm">
                    Crm Source
                  </Label>
                  <Input
                    id="crm-source"
                    name="crmSource"
                    placeholder=""
                    data-testid="input-crm-source"
                    value={form.crmSource}
                    onChange={(e) =>
                      setForm({ ...form, crmSource: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crm-lxp-type" className="text-sm">
                    Crm Lxp Type
                  </Label>
                  <Input
                    id="crm-lxp-type"
                    name="crmLxpType"
                    placeholder=""
                    data-testid="input-crm-lxp-type"
                    value={form.crmLxpType}
                    onChange={(e) =>
                      setForm({ ...form, crmLxpType: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="crm-email-subject" className="text-sm">
                    Crm Email Subject
                  </Label>
                  <Input
                    id="crm-email-subject"
                    name="crmEmailSubject"
                    placeholder=""
                    data-testid="input-crm-email-subject"
                    value={form.crmEmailSubject}
                    onChange={(e) =>
                      setForm({ ...form, crmEmailSubject: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Phone Numbers Section */}
              <div className="space-y-4">
                {phoneNumbers.map((phone) => (
                  <div key={phone.id} className="flex items-center gap-2">
                    <Input
                      placeholder="Enter dealer phone number with country code"
                      value={phone.value}
                      onChange={(e) =>
                        updatePhoneNumber(phone.id, e.target.value)
                      }
                      data-testid={`input-phone-${phone.id}`}
                    />
                    {phoneNumbers.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removePhoneNumber(phone.id)}
                        variant="destructive"
                        size="icon"
                        className="bg-red-500 hover:bg-red-600"
                        data-testid={`button-delete-phone-${phone.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <div>
                  <Button
                    type="button"
                    onClick={addPhoneNumber}
                    className="bg-green-500 hover:bg-green-600 text-white"
                    data-testid="button-add-phone"
                  >
                    Add New Number
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Sales CRM Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-crm" className="text-sm">
                    Sales Crm
                  </Label>
                  <Input
                    id="sales-crm"
                    name="salesCrm"
                    placeholder=""
                    data-testid="input-sales-crm"
                    value={form.salesCrm}
                    onChange={(e) =>
                      setForm({ ...form, salesCrm: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-link" className="text-sm">
                    Link
                  </Label>
                  <Input
                    id="sales-link"
                    name="salesLink"
                    placeholder=""
                    data-testid="input-sales-link"
                    value={form.salesLink}
                    onChange={(e) =>
                      setForm({ ...form, salesLink: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-dealer-id" className="text-sm">
                    Dealer Id
                  </Label>
                  <Input
                    id="sales-dealer-id"
                    name="salesDealerId"
                    placeholder=""
                    data-testid="input-sales-dealer-id"
                    value={form.salesDealerId}
                    onChange={(e) =>
                      setForm({ ...form, salesDealerId: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-username" className="text-sm">
                    Username
                  </Label>
                  <Input
                    id="sales-username"
                    name="salesUsername"
                    placeholder=""
                    data-testid="input-sales-username"
                    value={form.salesUsername}
                    onChange={(e) =>
                      setForm({ ...form, salesUsername: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="sales-password"
                    name="salesPassword"
                    type="password"
                    placeholder=""
                    data-testid="input-sales-password"
                    value={form.salesPassword}
                    onChange={(e) =>
                      setForm({ ...form, salesPassword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-text-code" className="text-sm">
                    Text Code
                  </Label>
                  <Input
                    id="sales-text-code"
                    name="salesTextCode"
                    placeholder=""
                    data-testid="input-sales-text-code"
                    value={form.salesTextCode}
                    onChange={(e) =>
                      setForm({ ...form, salesTextCode: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="sales-email-code" className="text-sm">
                    Email Code
                  </Label>
                  <Input
                    id="sales-email-code"
                    name="salesEmailCode"
                    placeholder=""
                    data-testid="input-sales-email-code"
                    value={form.salesEmailCode}
                    onChange={(e) =>
                      setForm({ ...form, salesEmailCode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Data Mngmt / SIS CRM Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-crm" className="text-sm">
                    Data Mngmt / SIS CRM
                  </Label>
                  <Input
                    id="data-mngmt-crm"
                    name="dataMngmtCrm"
                    placeholder=""
                    data-testid="input-data-mngmt-crm"
                    value={form.dataMngmtCrm}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtCrm: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-link" className="text-sm">
                    Link
                  </Label>
                  <Input
                    id="data-mngmt-link"
                    name="dataMngmtLink"
                    placeholder=""
                    data-testid="input-data-mngmt-link"
                    value={form.dataMngmtLink}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtLink: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-dealer-id" className="text-sm">
                    Dealer Id
                  </Label>
                  <Input
                    id="data-mngmt-dealer-id"
                    name="dataMngmtDealerId"
                    placeholder=""
                    data-testid="input-data-mngmt-dealer-id"
                    value={form.dataMngmtDealerId}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtDealerId: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-username" className="text-sm">
                    Username
                  </Label>
                  <Input
                    id="data-mngmt-username"
                    name="dataMngmtUsername"
                    placeholder=""
                    data-testid="input-data-mngmt-username"
                    value={form.dataMngmtUsername}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtUsername: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="data-mngmt-password"
                    name="dataMngmtPassword"
                    type="password"
                    placeholder=""
                    data-testid="input-data-mngmt-password"
                    value={form.dataMngmtPassword}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtPassword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data-mngmt-text-code" className="text-sm">
                    Text Code
                  </Label>
                  <Input
                    id="data-mngmt-text-code"
                    name="dataMngmtTextCode"
                    placeholder=""
                    data-testid="input-data-mngmt-text-code"
                    value={form.dataMngmtTextCode}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtTextCode: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="data-mngmt-email-code" className="text-sm">
                    Email Code
                  </Label>
                  <Input
                    id="data-mngmt-email-code"
                    name="dataMngmtEmailCode"
                    placeholder=""
                    data-testid="input-data-mngmt-email-code"
                    value={form.dataMngmtEmailCode}
                    onChange={(e) =>
                      setForm({ ...form, dataMngmtEmailCode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Service CRM Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-crm" className="text-sm">
                    Service Crm
                  </Label>
                  <Input
                    id="service-crm"
                    name="serviceCrm"
                    placeholder=""
                    data-testid="input-service-crm"
                    value={form.serviceCrm}
                    onChange={(e) =>
                      setForm({ ...form, serviceCrm: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-link" className="text-sm">
                    Link
                  </Label>
                  <Input
                    id="service-link"
                    name="serviceLink"
                    placeholder=""
                    data-testid="input-service-link"
                    value={form.serviceLink}
                    onChange={(e) =>
                      setForm({ ...form, serviceLink: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-dealer-id" className="text-sm">
                    Dealer Id
                  </Label>
                  <Input
                    id="service-dealer-id"
                    name="serviceDealerId"
                    placeholder=""
                    data-testid="input-service-dealer-id"
                    value={form.serviceDealerId}
                    onChange={(e) =>
                      setForm({ ...form, serviceDealerId: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-username" className="text-sm">
                    Username
                  </Label>
                  <Input
                    id="service-username"
                    name="serviceUsername"
                    placeholder=""
                    data-testid="input-service-username"
                    value={form.serviceUsername}
                    onChange={(e) =>
                      setForm({ ...form, serviceUsername: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="service-password"
                    name="servicePassword"
                    type="password"
                    placeholder=""
                    data-testid="input-service-password"
                    value={form.servicePassword}
                    onChange={(e) =>
                      setForm({ ...form, servicePassword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-text-code" className="text-sm">
                    Text Code
                  </Label>
                  <Input
                    id="service-text-code"
                    name="serviceTextCode"
                    placeholder=""
                    data-testid="input-service-text-code"
                    value={form.serviceTextCode}
                    onChange={(e) =>
                      setForm({ ...form, serviceTextCode: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="service-email-code" className="text-sm">
                    Email Code
                  </Label>
                  <Input
                    id="service-email-code"
                    name="serviceEmailCode"
                    placeholder=""
                    data-testid="input-service-email-code"
                    value={form.serviceEmailCode}
                    onChange={(e) =>
                      setForm({ ...form, serviceEmailCode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-200 my-6" />

              {/* Transfer Numbers Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="special-member" className="text-sm">
                    Special Member
                  </Label>
                  <Input
                    id="special-member"
                    name="specialMember"
                    placeholder=""
                    data-testid="input-special-member"
                    value={form.specialMember}
                    onChange={(e) =>
                      setForm({ ...form, specialMember: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hq-manager" className="text-sm">
                    Hq Manager #
                  </Label>
                  <Input
                    id="hq-manager"
                    name="hqManager"
                    placeholder=""
                    data-testid="input-hq-manager"
                    value={form.hqManager}
                    onChange={(e) =>
                      setForm({ ...form, hqManager: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-transfer" className="text-sm">
                    Sales Transfer #
                  </Label>
                  <Input
                    id="sales-transfer"
                    name="salesTransfer"
                    placeholder=""
                    data-testid="input-sales-transfer"
                    value={form.salesTransfer}
                    onChange={(e) =>
                      setForm({ ...form, salesTransfer: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service-transfer" className="text-sm">
                    Service Transfer #
                  </Label>
                  <Input
                    id="service-transfer"
                    name="serviceTransfer"
                    placeholder=""
                    data-testid="input-service-transfer"
                    value={form.serviceTransfer}
                    onChange={(e) =>
                      setForm({ ...form, serviceTransfer: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="part-transfer" className="text-sm">
                    Part Transfer #
                  </Label>
                  <Input
                    id="part-transfer"
                    name="partTransfer"
                    placeholder=""
                    data-testid="input-part-transfer"
                    value={form.partTransfer}
                    onChange={(e) =>
                      setForm({ ...form, partTransfer: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ring-central" className="text-sm">
                    Ring Central #
                  </Label>
                  <Input
                    id="ring-central"
                    name="ringCentral"
                    placeholder=""
                    data-testid="input-ring-central"
                    value={form.ringCentral}
                    onChange={(e) =>
                      setForm({ ...form, ringCentral: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="addresses" className="text-sm">
                    Addresses #
                  </Label>
                  <Input
                    id="addresses"
                    name="addresses"
                    placeholder=""
                    data-testid="input-addresses"
                    value={form.addresses}
                    onChange={(e) =>
                      setForm({ ...form, addresses: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours" className="text-sm">
                    Hours #
                  </Label>
                  <Input
                    id="hours"
                    name="hours"
                    placeholder=""
                    data-testid="input-hours"
                    value={form.hours}
                    onChange={(e) =>
                      setForm({ ...form, hours: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  data-testid="button-submit"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Submit"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
