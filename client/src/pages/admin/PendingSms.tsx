import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pendingSms = [
  {
    id: 192848,
    to: "(757) 575-4639",
    message: "I scheduled your VIP appointment for 06/28/2026 12...",
    createdAt: "2026-06-26 18:46:49",
  },
  {
    id: 192649,
    to: "+15583828894+154033537086+1649948539",
    message: "Dealer - Subaru of Sterling Type - Type 🚀 Appo...",
    createdAt: "2026-06-26 18:46:49",
  },
  {
    id: 192650,
    to: "(866) 540-9477 (",
    message: "I scheduled your VIP appointment for 06/27/2026 10...",
    createdAt: "2026-06-26 18:46:57",
  },
  {
    id: 192651,
    to: "+15583828894+1524476774+1463475776+1863507736+1888275477",
    message: "Dealer - Daytona Kia Type - Type 🚀 Appointment...",
    createdAt: "2026-06-26 18:46:57",
  },
];

export default function PendingSms() {
  const columns = [
    { key: "id", label: "#" },
    { 
      key: "to", 
      label: "To",
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    { 
      key: "message", 
      label: "Message",
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    { key: "createdAt", label: "Created At" },
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
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Send Now</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={pendingSms}
      searchPlaceholder="Search pending SMS..."
      showAddButton={false}
    />
  );
}
