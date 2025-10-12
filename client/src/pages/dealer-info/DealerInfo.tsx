import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, MapPin, Phone, Mail, Globe, User, Clock, Settings } from "lucide-react";

// Sample dealer data matching the uploaded screenshots
const dealerData = {
  "all-american-chevrolet": {
    name: "All American Chevrolet of Midland",
    website: "https://www.allamericanchevroletofmidland.com",
    type: "SALES",
    address: "4900 W Wall St, Midland, TX 79707, USA",
    hours: "Mon - Sat: 8:30am - 7:30pm | Sun: CLOSED",
    timeZone: "Central Time Zone",
    salesCrm: "VinSolutions",
    uia: "https://vinsolutions.eos.corp.com/corp",
    dealerId: "N/A",
    username: "TrueBDC@AllAmericanChevrolet",
    password: "Chevrolet4325",
    textCode: "RingCentral",
    emailCode: "Password",
    crmEmailAddress: "N/A",
    crmSource: "N/A",
    crmEmailSubject: "N/A",
    crmUpType: "N/A",
    specialAttention: "N/A",
    vpManager: "VP Manager",
    salesTransfer: "# 888-739-4364",
    serviceTransfer: "# 806-839-5024",
    partsTransfer: "# 806-862-2954",
    ringCentral: "# (432) 203-1319"
  },
  "andrews-auto": {
    name: "Andrews Auto",
    website: "https://www.andrewsauto.com",
    type: "SALES",
    address: "123 Main St, Andrews, TX 79714, USA",
    hours: "Mon - Fri: 9:00am - 6:00pm | Sat: 9:00am - 5:00pm | Sun: CLOSED",
    timeZone: "Central Time Zone",
    salesCrm: "AutoTrader",
    uia: "https://autotrader.com/dealer",
    dealerId: "AT001",
    username: "TrueBDC@AndrewsAuto",
    password: "Andrews2024",
    textCode: "Twilio",
    emailCode: "Gmail",
    crmEmailAddress: "info@andrewsauto.com",
    crmSource: "Website",
    crmEmailSubject: "New Lead",
    crmUpType: "Phone",
    specialAttention: "Follow up within 2 hours",
    vpManager: "Sales Manager",
    salesTransfer: "# 432-555-0123",
    serviceTransfer: "# 432-555-0124",
    partsTransfer: "# 432-555-0125",
    ringCentral: "# (432) 555-0100"
  },
  "augusta-mitsubishi": {
    name: "Augusta Mitsubishi",
    website: "https://www.augustamitsubishi.com",
    type: "SALES",
    address: "456 Commerce Dr, Augusta, GA 30909, USA",
    hours: "Mon - Sat: 8:00am - 8:00pm | Sun: 12:00pm - 6:00pm",
    timeZone: "Eastern Time Zone",
    salesCrm: "DealerSocket",
    uia: "https://dealersocket.com/login",
    dealerId: "DS002",
    username: "TrueBDC@AugustaMitsubishi",
    password: "Mitsubishi123",
    textCode: "TextUs",
    emailCode: "Outlook",
    crmEmailAddress: "leads@augustamitsubishi.com",
    crmSource: "AutoTrader",
    crmEmailSubject: "Lead Follow-up",
    crmUpType: "Email",
    specialAttention: "Priority dealer - respond within 1 hour",
    vpManager: "VP Sales",
    salesTransfer: "# 706-555-0200",
    serviceTransfer: "# 706-555-0201",
    partsTransfer: "# 706-555-0202",
    ringCentral: "# (706) 555-0210"
  },
  "daytona-kia": {
    name: "Daytona Kia",
    website: "https://www.daytonakia.com",
    type: "SALES",
    address: "789 Speedway Blvd, Daytona Beach, FL 32114, USA",
    hours: "Mon - Sat: 9:00am - 9:00pm | Sun: 11:00am - 7:00pm",
    timeZone: "Eastern Time Zone",
    salesCrm: "CDK Global",
    uia: "https://cdkglobal.com/dealer",
    dealerId: "CDK003",
    username: "TrueBDC@DaytonaKia",
    password: "Kia2024!",
    textCode: "MessageDesk",
    emailCode: "Yahoo",
    crmEmailAddress: "sales@daytonakia.com",
    crmSource: "Cars.com",
    crmEmailSubject: "Kia Lead",
    crmUpType: "Text",
    specialAttention: "High volume dealer",
    vpManager: "General Manager",
    salesTransfer: "# 386-555-0300",
    serviceTransfer: "# 386-555-0301",
    partsTransfer: "# 386-555-0302",
    ringCentral: "# (386) 555-0310"
  },
  "daytona-mitsubishi": {
    name: "Daytona Mitsubishi",
    website: "https://www.daytonamitsubishi.com",
    type: "SALES",
    address: "321 International Speedway Blvd, Daytona Beach, FL 32114, USA",
    hours: "Mon - Sat: 9:00am - 8:00pm | Sun: 12:00pm - 6:00pm",
    timeZone: "Eastern Time Zone",
    salesCrm: "Reynolds and Reynolds",
    uia: "https://reyrey.com/dealer",
    dealerId: "RR004",
    username: "TrueBDC@DaytonaMitsubishi",
    password: "Mitsubishi2024",
    textCode: "CallAction",
    emailCode: "Gmail",
    crmEmailAddress: "info@daytonamitsubishi.com",
    crmSource: "Autotrader",
    crmEmailSubject: "Mitsubishi Inquiry",
    crmUpType: "Phone",
    specialAttention: "Sister store to Daytona Kia",
    vpManager: "Sales Director",
    salesTransfer: "# 386-555-0400",
    serviceTransfer: "# 386-555-0401",
    partsTransfer: "# 386-555-0402",
    ringCentral: "# (386) 555-0410"
  }
};

export default function DealerInfo() {
  const [selectedDealer, setSelectedDealer] = useState("all-american-chevrolet");
  
  const dealer = selectedDealer ? dealerData[selectedDealer as keyof typeof dealerData] : null;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <div>
              <CardTitle>Dealer Info</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Dealer Info
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Dealer Selection */}
            <div className="max-w-md">
              <div className="text-sm font-medium mb-2">
                {dealer ? dealer.name : "All American Chevrolet of Midland"}
              </div>
              <Select value={selectedDealer} onValueChange={setSelectedDealer}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Dealer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-american-chevrolet">All American Chevrolet of Midland</SelectItem>
                  <SelectItem value="andrews-auto">Andrews Auto</SelectItem>
                  <SelectItem value="augusta-mitsubishi">Augusta Mitsubishi</SelectItem>
                  <SelectItem value="daytona-kia">Daytona Kia</SelectItem>
                  <SelectItem value="daytona-mitsubishi">Daytona Mitsubishi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dealer Details */}
            {dealer && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Dealer Information */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Globe className="h-4 w-4 mt-1 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">Dealer Website:</div>
                        <a href={dealer.website} className="text-blue-500 hover:underline text-sm">
                          {dealer.website}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Settings className="h-4 w-4 mt-1 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Type:</div>
                        <div className="text-sm text-gray-600">{dealer.type}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-1 text-red-500" />
                      <div>
                        <div className="text-sm font-medium">Address:</div>
                        <div className="text-sm text-gray-600">{dealer.address}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-1 text-green-500" />
                      <div>
                        <div className="text-sm font-medium">Hours:</div>
                        <div className="text-sm text-gray-600">{dealer.hours}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 mt-1 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">Time Zone:</div>
                        <div className="text-sm text-gray-600">{dealer.timeZone}</div>
                      </div>
                    </div>
                  </div>

                  {/* Audio Control */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Dealer Pronunciation:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">0:00 / 0:00</span>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Contact & Details */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700">Sales CRM:</div>
                      <div className="text-gray-600">{dealer.salesCrm}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">UIA:</div>
                      <a href={dealer.uia} className="text-blue-500 hover:underline text-xs">
                        {dealer.uia}
                      </a>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Dealer Id:</div>
                      <div className="text-gray-600">{dealer.dealerId}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Username:</div>
                      <div className="text-gray-600">{dealer.username}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Password:</div>
                      <div className="text-gray-600">{dealer.password}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Text Code:</div>
                      <div className="text-gray-600">{dealer.textCode}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-medium text-gray-700">Email Code:</div>
                      <div className="text-gray-600">{dealer.emailCode}</div>
                    </div>
                  </div>

                  {/* CRM Information */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Crm Email Address:</span>
                        <span className="text-gray-600">{dealer.crmEmailAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Crm Source:</span>
                        <span className="text-gray-600">{dealer.crmSource}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Crm Email Subject:</span>
                        <span className="text-gray-600">{dealer.crmEmailSubject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Crm Up Type:</span>
                        <span className="text-gray-600">{dealer.crmUpType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Special Attention:</span>
                        <span className="text-gray-600">{dealer.specialAttention}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">VP Manager:</span>
                        <span className="text-gray-600">{dealer.vpManager}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Sales Transfer:</span>
                        <span className="text-gray-600">{dealer.salesTransfer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Service Transfer:</span>
                        <span className="text-gray-600">{dealer.serviceTransfer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Parts Transfer:</span>
                        <span className="text-gray-600">{dealer.partsTransfer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Ring Central:</span>
                        <span className="text-gray-600">{dealer.ringCentral}</span>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-3 text-center border-b">
                      <div className="text-sm font-semibold text-gray-700">{dealer.name}</div>
                      <div className="text-xs text-gray-600 mt-1">View larger map</div>
                      <div className="text-xs text-blue-500 mt-1">View Profile › Edit</div>
                    </div>
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-red-500 mx-auto mb-2" />
                        <div className="text-sm text-gray-600">{dealer.name}</div>
                        <div className="text-xs text-gray-500">{dealer.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}