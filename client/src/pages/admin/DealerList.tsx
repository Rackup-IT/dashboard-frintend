import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Plus, Eye, Edit, Calendar, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { dealerListStore, type DealerItem } from "@/lib/dealerListStore";
import { useToast } from "@/hooks/use-toast";

export default function DealerList() {
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("10");
  const [dealers, setDealers] = useState<DealerItem[]>([]);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    loadDealers();
  }, []);

  const loadDealers = () => {
    setDealers(dealerListStore.getDealers());
  };

  const filteredDealers = dealers.filter(dealer =>
    dealer.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusToggle = (id: number) => {
    dealerListStore.toggleStatus(id);
    loadDealers();
  };

  const handleEdit = (id: number) => {
    setLocation(`/admin/dealers/${id}/edit`);
  };

  const handleView = (id: number) => {
    setLocation(`/admin/dealers/${id}`);
  };

  const handleSchedule = (id: number) => {
    setLocation(`/admin/dealer/${id}/schedule-shift`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this dealer?")) {
      dealerListStore.deleteDealer(id);
      loadDealers();
      toast({
        title: "Success",
        description: "Dealer deleted successfully",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dealer List</h1>
          <div className="text-sm text-gray-500">
            <span>Dashboard</span> / <span>Dealer List</span>
          </div>
        </div>
        <Link href="/admin/dealer-list/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create Dealer
          </Button>
        </Link>
      </div>

      {/* Table Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Search:</span>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
            placeholder=""
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Timezone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDealers.map((dealer, index) => (
                <TableRow key={dealer.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{dealer.name}</TableCell>
                  <TableCell>{dealer.type.join(" ")}</TableCell>
                  <TableCell>{dealer.timezone || '-'}</TableCell>
                  <TableCell>
                    <Switch
                      checked={dealer.status}
                      onCheckedChange={() => handleStatusToggle(dealer.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                      data-testid={`switch-status-${dealer.id}`}
                    />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" data-testid={`button-action-${dealer.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(dealer.id)} data-testid={`menu-edit-${dealer.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleView(dealer.id)} data-testid={`menu-view-${dealer.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSchedule(dealer.id)} data-testid={`menu-schedule-${dealer.id}`}>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(dealer.id)} data-testid={`menu-delete-${dealer.id}`}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1 to 10 of 10 entries
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button size="sm" className="bg-blue-600 text-white">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
          <Button variant="outline" size="sm">5</Button>
          <span className="text-gray-500">...</span>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}