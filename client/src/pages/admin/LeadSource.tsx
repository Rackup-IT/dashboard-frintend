import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface LeadSource {
  id: number;
  name: string;
}

const initialLeadSources: LeadSource[] = [
  { id: 1, name: "Internet" },
  { id: 2, name: "Phone Up" },
  { id: 3, name: "Service Drive" },
  { id: 4, name: "Database" },
  { id: 5, name: "Cargurus" },
  { id: 6, name: "Carfax" },
  { id: 7, name: "Dealer.com" },
  { id: 8, name: "Dealer Website" },
  { id: 9, name: "Autotrader" },
  { id: 10, name: "Truecar" },
];

export default function LeadSource() {
  const [leadSources, setLeadSources] = useState<LeadSource[]>(initialLeadSources);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLeadSource, setEditingLeadSource] = useState<LeadSource | null>(null);
  const [leadSourceName, setLeadSourceName] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleAdd = () => {
    setEditingLeadSource(null);
    setLeadSourceName("");
    setIsDialogOpen(true);
  };

  const handleEdit = (leadSource: LeadSource) => {
    setEditingLeadSource(leadSource);
    setLeadSourceName(leadSource.name);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!leadSourceName.trim()) return;

    if (editingLeadSource) {
      // Edit existing lead source
      setLeadSources(prev =>
        prev.map(source =>
          source.id === editingLeadSource.id
            ? { ...source, name: leadSourceName }
            : source
        )
      );
    } else {
      // Add new lead source
      const newLeadSource: LeadSource = {
        id: Math.max(...leadSources.map(s => s.id), 0) + 1,
        name: leadSourceName,
      };
      setLeadSources(prev => [...prev, newLeadSource]);
    }

    setIsDialogOpen(false);
    setLeadSourceName("");
    setEditingLeadSource(null);
  };

  const handleDelete = (id: number) => {
    setLeadSources(prev => prev.filter(source => source.id !== id));
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setLeadSourceName("");
    setEditingLeadSource(null);
  };

  // Filter lead sources based on search
  const filteredLeadSources = leadSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredLeadSources.length / parseInt(entriesPerPage));
  const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
  const endIndex = startIndex + parseInt(entriesPerPage);
  const currentLeadSources = filteredLeadSources.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead Source List</CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Dashboard / Lead Source List
              </div>
            </div>
            <Button 
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-add-lead-source"
            >
              <Plus className="h-4 w-4 mr-2" />
              Lead Source
            </Button>
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
                    <TableHead className="font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentLeadSources.map((leadSource, index) => (
                    <TableRow key={leadSource.id}>
                      <TableCell className="text-sm">{startIndex + index + 1}</TableCell>
                      <TableCell className="text-sm">{leadSource.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => handleEdit(leadSource)}
                            data-testid={`button-edit-${leadSource.id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDelete(leadSource.id)}
                            data-testid={`button-delete-${leadSource.id}`}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredLeadSources.length)} of {filteredLeadSources.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-previous"
                >
                  Previous
                </Button>
                
                {currentPage > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </Button>
                )}
                
                <Button
                  variant="default"
                  size="sm"
                  className="bg-blue-600 text-white"
                  data-testid={`button-page-${currentPage}`}
                >
                  {currentPage}
                </Button>
                
                {currentPage < totalPages && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="button-next"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Lead Source Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md" data-testid="dialog-add-edit-lead-source">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {editingLeadSource ? "Edit Lead Source" : "Add Lead Source"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="lead-source-name">Name</Label>
              <Input
                id="lead-source-name"
                placeholder="Admin"
                value={leadSourceName}
                onChange={(e) => setLeadSourceName(e.target.value)}
                data-testid="input-lead-source-name"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline"
              onClick={handleClose}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              data-testid="button-close"
            >
              Close
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!leadSourceName.trim()}
              data-testid="button-save"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
