import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useEffect, useState } from "react";

// Dealer data matching the screenshot

export default function DealerInfo() {
  const [selectedDealer, setSelectedDealer] = useState("augusta-mitsubishi");
  const [dealers, setDealers] = useState<any>(null);
  const dealer = dealers?.find((d: any) => d._id === selectedDealer);
  useEffect(() => {
    loadDealers();
  }, []);
  const loadDealers = () => {
    apiRequest("GET", "dealer/get-all").then((data) => {
      setDealers(data.dealers);
      setSelectedDealer(data.dealers[0]._id);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dealer Info</h1>
        <p className="text-sm text-gray-500">Dashboard / Dealer Info</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="mb-6">
          <Select value={selectedDealer} onValueChange={setSelectedDealer}>
            <SelectTrigger
              className="w-full max-w-md bg-white"
              data-testid="select-dealer"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dealers &&
                dealers.map((d: any) => (
                  <SelectItem
                    key={d._id}
                    value={d._id}
                    data-testid={`select-dealer-${d.dealerName}`}
                  >
                    {d.dealerName}
                  </SelectItem>
                ))}
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
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.type}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Address :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.address}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Hours :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.hours}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Time Zone :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.timeZone}
                </span>
              </div>

              {/* Audio Player */}
              <div className="mt-6">
                <audio
                  controls
                  className="w-full"
                  data-testid="audio-pronunciation"
                >
                  <source src="" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="mt-4 text-sm text-gray-900 font-medium">
                Dealer Pronounciation
              </div>

              <div className="space-y-2 mt-4">
                <div>
                  <span className="text-sm text-gray-600">
                    Crm Email Address :
                  </span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.crmEmailAddress}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Crm Source :</span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.crmSource}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">
                    Crm Email Subject :
                  </span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.crmEmailSubject}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Crm Up Type :</span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.crmUpType}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">
                    Special Attention :
                  </span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.specialAttention}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">VIP Manager :</span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.vipManager}
                  </span>
                </div>

                <div className="mt-4">
                  <div>
                    <span className="text-sm text-gray-600">
                      Sales Transfer #
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {dealer.salesTransfer}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Service Transfer #
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {dealer.serviceTransfer}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      Parts Transfer #
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {dealer.partsTransfer}
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <span className="text-sm text-gray-600">
                    Ring Central # :
                  </span>
                  <span className="text-sm text-gray-900 ml-2">
                    {dealer.ringCentral}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Sales CRM :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.salesCrm}
                </span>
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
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.dealerId}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Username :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.username}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Password :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.password}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Text Code :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.textCode}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600">Email Code :</span>
                <span className="text-sm text-gray-900 ml-2">
                  {dealer.emailCode}
                </span>
              </div>

              {/* Google Map */}
              <div
                className="mt-6 border rounded-lg overflow-hidden"
                data-testid="map-container"
              >
                <div className="bg-white p-3 text-center border-b">
                  <div className="text-sm font-semibold text-gray-900">
                    {dealer.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    View larger map
                  </div>
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
