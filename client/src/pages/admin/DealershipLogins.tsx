import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import StatusToggle from "@/components/common/StatusToggle";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialDealerships = [
  {
    id: 5,
    name: "Downtown Auto Center",
    email: "f.salm@downtownautocenter.com",
    showCallLogs: false,
    status: true,
  },
];

export default function DealershipLogins() {
  const [dealerships, setDealerships] = useState(initialDealerships);

  const toggleStatus = (id: number, field: 'status' | 'showCallLogs') => {
    setDealerships(prev => prev.map(dealership => 
      dealership.id === id 
        ? { ...dealership, [field]: !dealership[field] }
        : dealership
    ));
  };

  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "showCallLogs",
      label: "Show Call Logs",
      render: (value: boolean, row: any) => (
        <StatusToggle
          checked={value}
          onCheckedChange={() => toggleStatus(row.id, 'showCallLogs')}
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: boolean, row: any) => (
        <StatusToggle
          checked={value}
          onCheckedChange={() => toggleStatus(row.id, 'status')}
        />
      ),
    },
    {
      key: "actions",
      label: "Action",
      render: (_: any, row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={dealerships}
      searchPlaceholder="Search dealerships..."
      addButtonLabel="Dealership"
      onAdd={() => console.log("Add dealership")}
    />
  );
}
