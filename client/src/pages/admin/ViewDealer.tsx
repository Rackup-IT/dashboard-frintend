import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { dealerListStore } from "@/lib/dealerListStore";

export default function ViewDealer() {
  const [, params] = useRoute("/admin/dealers/:id");
  const [, setLocation] = useLocation();
  
  const dealerId = params?.id ? parseInt(params.id) : null;
  const dealer = dealerId ? dealerListStore.getDealerById(dealerId) : null;

  if (!dealer) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dealer Not Found</h1>
        </div>
        <Button onClick={() => setLocation("/admin/dealer-list")} data-testid="button-back">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Dealer List
        </Button>
      </div>
    );
  }

  // Generate Google Maps search URL for basic map display
  // Note: Using basic Google Maps embed without API key for demo purposes
  const searchQuery = dealer.address || `${dealer.name} Oakland CA`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">View Dealer</h1>
        <p className="text-sm text-muted-foreground">
          Dashboard / Dealer List / View Dealer
        </p>
      </div>

      {/* Dealer Name */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold" data-testid="text-dealer-name">{dealer.name}</h2>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Dealer Details */}
        <div className="space-y-4">
          {/* Dealer Website */}
          {dealer.website && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Dealer Website</div>
              <a 
                href={dealer.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                data-testid="link-dealer-website"
              >
                {dealer.website}
              </a>
            </div>
          )}

          {/* Type */}
          {dealer.type && dealer.type.length > 0 && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Type</div>
              <div data-testid="text-dealer-type">{dealer.type.join(", ")}</div>
            </div>
          )}

          {/* Address */}
          {dealer.address && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Address</div>
              <div data-testid="text-dealer-address">{dealer.address}</div>
            </div>
          )}

          {/* Hours */}
          {dealer.hours && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Hours</div>
              <div data-testid="text-dealer-hours">{dealer.hours}</div>
            </div>
          )}

          {/* Time Zone */}
          {dealer.timezone && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Time Zone</div>
              <div data-testid="text-dealer-timezone">{dealer.timezone}</div>
            </div>
          )}

          {/* Dealer Pronunciation with Audio Player */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Dealer Pronunciation</div>
            <audio controls className="w-full max-w-xs" data-testid="audio-pronunciation">
              <source src="" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* CRM Information */}
          {dealer.crmEmail && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Crm Email Address</div>
              <div data-testid="text-crm-email">{dealer.crmEmail}</div>
            </div>
          )}

          {dealer.crmSource && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Crm Source</div>
              <div data-testid="text-crm-source">{dealer.crmSource}</div>
            </div>
          )}

          {dealer.crmEmailSubject && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Crm Email Subject</div>
              <div data-testid="text-crm-subject">{dealer.crmEmailSubject}</div>
            </div>
          )}

          {dealer.crmUrlType && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Crm Up Type</div>
              <div data-testid="text-crm-url-type">{dealer.crmUrlType}</div>
            </div>
          )}

          {/* Transfer Numbers */}
          {dealer.specialAttention && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Special Attention</div>
              <div data-testid="text-special-attention">{dealer.specialAttention}</div>
            </div>
          )}

          {dealer.voManager && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">VIP Manager</div>
              <div data-testid="text-vip-manager">{dealer.voManager}</div>
            </div>
          )}

          {dealer.salesTransfer && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Sales Transfer #</div>
              <div data-testid="text-sales-transfer">{dealer.salesTransfer}</div>
            </div>
          )}

          {dealer.serviceTransfer && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Service Transfer #</div>
              <div data-testid="text-service-transfer">{dealer.serviceTransfer}</div>
            </div>
          )}

          {/* Parts Transfer - using faxTransfer as placeholder */}
          {dealer.faxTransfer && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Parts Transfer #</div>
              <div data-testid="text-parts-transfer">{dealer.faxTransfer}</div>
            </div>
          )}

          {dealer.ringCentral && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Ring Central #</div>
              <div data-testid="text-ring-central">{dealer.ringCentral}</div>
            </div>
          )}
        </div>

        {/* Right Column - Map */}
        <div className="h-[400px] lg:h-full min-h-[400px]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-testid="map-dealer-location"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
