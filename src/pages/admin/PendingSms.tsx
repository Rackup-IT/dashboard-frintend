import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pendingSmsStore, type PendingSms } from "@/lib/pendingSmsStore";
import { useToast } from "@/hooks/use-toast";

export default function PendingSms() {
  const { toast } = useToast();
  const [smsList, setSmsList] = useState<PendingSms[]>([]);
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSms, setSelectedSms] = useState<PendingSms | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);

  useEffect(() => {
    loadPendingSms();
  }, []);

  // Reset to page 1 when search or entries per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  const loadPendingSms = () => {
    setSmsList(pendingSmsStore.getPendingSms());
  };

  const handleViewMessage = (sms: PendingSms) => {
    setSelectedSms(sms);
    setShowViewDialog(true);
  };

  const handleDelete = (id: number) => {
    pendingSmsStore.deletePendingSms(id);
    loadPendingSms();
    toast({
      title: "Success",
      description: "Pending SMS deleted successfully",
    });
  };

  // Filter SMS based on search
  const filteredSms = smsList.filter(sms =>
    sms.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sms.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Clamp current page to valid range when data changes
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredSms.length / parseInt(entriesPerPage)));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [smsList.length, filteredSms.length, entriesPerPage, currentPage]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredSms.length / parseInt(entriesPerPage)));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentSms = filteredSms.slice(startIndex, endIndex);
  const hasResults = filteredSms.length > 0;

  // Truncate long text for table display
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Pending Sms</CardTitle>
            <div className="text-sm text-gray-500 mt-1">
              Dashboard / Pending Sms
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">Show</span>
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                  <SelectTrigger className="w-20" data-testid="select-entries">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm">entries</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm">Search:</span>
                <Input
                  placeholder=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-48"
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold w-12">#</TableHead>
                    <TableHead className="font-semibold">To</TableHead>
                    <TableHead className="font-semibold">Message</TableHead>
                    <TableHead className="font-semibold">Created At</TableHead>
                    <TableHead className="font-semibold w-20">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSms.map((sms) => (
                    <TableRow key={sms.id}>
                      <TableCell className="text-sm">{sms.id}</TableCell>
                      <TableCell className="text-sm">{truncateText(sms.to, 30)}</TableCell>
                      <TableCell className="text-sm">{truncateText(sms.message, 60)}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{sms.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="h-8 w-8 p-0"
                              data-testid={`button-action-${sms.id}`}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => handleViewMessage(sms)}
                              data-testid={`action-view-${sms.id}`}
                            >
                              View Message
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(sms.id)}
                              data-testid={`action-delete-${sms.id}`}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {hasResults ? (
                  <>Showing {startIndex + 1} to {Math.min(endIndex, filteredSms.length)} of {filteredSms.length} entries</>
                ) : (
                  <>Showing 0 to 0 of 0 entries</>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || !hasResults}
                  data-testid="button-previous"
                >
                  Previous
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 text-white"
                  data-testid={`button-page-${currentPage}`}
                >
                  {currentPage}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || !hasResults}
                  data-testid="button-next"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Pending Sms</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
                onClick={() => setShowViewDialog(false)}
              >
                <X className="h-4 w-4 text-white bg-red-500 rounded" />
              </Button>
            </div>
          </DialogHeader>
          {selectedSms && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                <label className="text-sm font-medium">To</label>
                <div className="text-sm">{selectedSms.to}</div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                <label className="text-sm font-medium">Message</label>
                <div className="text-sm break-words whitespace-pre-wrap">
                  {selectedSms.message}
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                <label className="text-sm font-medium">Created At</label>
                <div className="text-sm">{selectedSms.createdAt}</div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                <label className="text-sm font-medium">Sent At</label>
                <div className="text-sm">{selectedSms.sentAt}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
