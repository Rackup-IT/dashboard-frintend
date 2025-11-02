import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Dealer data matching the screenshot
const dealerData = {
  "augusta-mitsubishi": {
    name: "Augusta Mitsubishi",
    website: "https://www.augustamitsubishi.com",
    type: "SALES",
    address: "3145 Peach Orchard Rd, Augusta, GA, USA",
    hours: "Mon - Fri, 9am - 8pm / Sat, 9am - 7pm / Sun, CLOSED",
    timeZone: "Eastern Time Zone",
    salesCrm: "VinSolutions",
    link: "https://vinsolutions.augustamitsubishi.com/",
    dealerId: "N/A",
    username: "TrueBDCAccountAugustaMitsubishi",
    password: "Augusta2611@",
    textCode: "RingCentral",
    emailCode: "iPassword",
    crmEmailAddress: "N/A",
    crmSource: "N/A",
    crmEmailSubject: "N/A",
    crmUpType: "N/A",
    specialAttention: "N/A",
    vipManager: "VIP Manager",
    salesTransfer: "839-826-5294",
    serviceTransfer: "839-826-5244",
    partsTransfer: "839-826-5227",
    ringCentral: "(706) 262-4207",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9!2d-81.9!3d33.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f9!2sAugusta%20Mitsubishi!5e0!3m2!1sen!2sus!4v1234567890"
  },
  "all-american-chevrolet": {
    name: "All American Chevrolet of Midland",
    website: "https://www.allamericanchevroletofmidland.com",
    type: "SALES",
    address: "4900 W Wall St, Midland, TX 79707, USA",
    hours: "Mon - Sat: 8:30am - 7:30pm | Sun: CLOSED",
    timeZone: "Central Time Zone",
    salesCrm: "VinSolutions",
    link: "https://vinsolutions.eos.corp.com/corp",
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
    vipManager: "VP Manager",
    salesTransfer: "888-739-4364",
    serviceTransfer: "806-839-5024",
    partsTransfer: "806-862-2954",
    ringCentral: "(432) 203-1319",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9!2d-102.0!3d32.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86f9!2sMidland!5e0!3m2!1sen!2sus!4v1234567890"
  },
  "anchor-kia": {
    name: "Anchor Kia",
    website: "https://www.anchorkia.com",
    type: "SALES",
    address: "123 Main St, Smithtown, NY 11787, USA",
    hours: "Mon - Fri: 9:00am - 8:00pm | Sat: 9:00am - 6:00pm | Sun: CLOSED",
    timeZone: "Eastern Time Zone",
    salesCrm: "DealerSocket",
    link: "https://dealersocket.com/anchorkia",
    dealerId: "DS123",
    username: "TrueBDCAnchorKia",
    password: "Kia2024!",
    textCode: "TextUs",
    emailCode: "Gmail",
    crmEmailAddress: "info@anchorkia.com",
    crmSource: "Website",
    crmEmailSubject: "New Lead",
    crmUpType: "Email",
    specialAttention: "Priority follow-up required",
    vipManager: "Sales Manager",
    salesTransfer: "631-555-0123",
    serviceTransfer: "631-555-0124",
    partsTransfer: "631-555-0125",
    ringCentral: "(631) 555-0100",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9!2d-73.2!3d40.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e9!2sSmithtown!5e0!3m2!1sen!2sus!4v1234567890"
  },
  "goyanda-kia": {
    name: "Goyanda Kia",
    website: "https://www.goyandakia.com",
    type: "SALES",
    address: "456 Auto Plaza, Goyanda, NY 14070, USA",
    hours: "Mon - Sat: 9:00am - 9:00pm | Sun: 11:00am - 5:00pm",
    timeZone: "Eastern Time Zone",
    salesCrm: "CDK Global",
    link: "https://cdkglobal.com/goyanda",
    dealerId: "CDK456",
    username: "TrueBDCGoyandaKia",
    password: "Goyanda123",
    textCode: "RingCentral",
    emailCode: "Outlook",
    crmEmailAddress: "leads@goyandakia.com",
    crmSource: "AutoTrader",
    crmEmailSubject: "Kia Inquiry",
    crmUpType: "Phone",
    specialAttention: "High volume dealer",
    vipManager: "General Manager",
    salesTransfer: "716-555-0200",
    serviceTransfer: "716-555-0201",
    partsTransfer: "716-555-0202",
    ringCentral: "(716) 555-0210",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9!2d-78.6!3d42.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9!2sGoyanda!5e0!3m2!1sen!2sus!4v1234567890"
  }
};

export default function DealerInfo() {
  const [selectedDealer, setSelectedDealer] = useState("augusta-mitsubishi");
  
  const dealer = dealerData[selectedDealer as keyof typeof dealerData];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dealer Info</h1>
        <p className="text-sm text-gray-500">Dashboard / Dealer Info</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="mb-6">
          <Select value={selectedDealer} onValueChange={setSelectedDealer}>
            <SelectTrigger className="w-full max-w-md bg-white" data-testid="select-dealer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="augusta-mitsubishi">Augusta Mitsubishi</SelectItem>
              <SelectItem value="all-american-chevrolet">All American Chevrolet of Midland</SelectItem>
              <SelectItem value="anchor-kia">Anchor Kia</SelectItem>
              <SelectItem value="goyanda-kia">Goyanda Kia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {dealer && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Dealer Website :</span>
                <a 
                  href={dealer.website} 
                  className="text-sm text-blue-500 hover:underline ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-dealer-website"
                >
                  {dealer.website}
                </a>
              </div>

              <div>
                <span className="text-sm text-gray-600">Type :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.type}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Address :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.address}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Hours :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.hours}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Time Zone :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.timeZone}</span>
              </div>

              {/* Audio Player */}
              <div className="mt-6">
                <audio controls className="w-full" data-testid="audio-pronunciation">
                  <source src="" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="mt-4 text-sm text-gray-900 font-medium">Dealer Pronounciation</div>

              <div className="space-y-2 mt-4">
                <div>
                  <span className="text-sm text-gray-600">Crm Email Address :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.crmEmailAddress}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Crm Source :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.crmSource}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Crm Email Subject :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.crmEmailSubject}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Crm Up Type :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.crmUpType}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Special Attention :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.specialAttention}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">VIP Manager :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.vipManager}</span>
                </div>

                <div className="mt-4">
                  <div>
                    <span className="text-sm text-gray-600">Sales Transfer #</span>
                    <span className="text-sm text-gray-900 ml-2">{dealer.salesTransfer}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Service Transfer #</span>
                    <span className="text-sm text-gray-900 ml-2">{dealer.serviceTransfer}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Parts Transfer #</span>
                    <span className="text-sm text-gray-900 ml-2">{dealer.partsTransfer}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="text-sm text-gray-600">Ring Central # :</span>
                  <span className="text-sm text-gray-900 ml-2">{dealer.ringCentral}</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Sales CRM :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.salesCrm}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Link :</span>
                <a 
                  href={dealer.link} 
                  className="text-sm text-blue-500 hover:underline ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-crm"
                >
                  {dealer.link}
                </a>
              </div>

              <div>
                <span className="text-sm text-gray-600">Dealer Id :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.dealerId}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Username :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.username}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Password :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.password}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Text Code :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.textCode}</span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Email Code :</span>
                <span className="text-sm text-gray-900 ml-2">{dealer.emailCode}</span>
              </div>

              {/* Google Map */}
              <div className="mt-6 border rounded-lg overflow-hidden" data-testid="map-container">
                <div className="bg-white p-3 text-center border-b">
                  <div className="text-sm font-semibold text-gray-900">{dealer.name}</div>
                  <div className="text-xs text-gray-500 mt-1">View larger map</div>
                </div>
                <div className="relative h-64 bg-gray-100">
                  <iframe
                    src={dealer.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${dealer.name}`}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
