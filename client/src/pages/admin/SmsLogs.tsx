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

const smsLogs = [
  {
    id: 1,
    to: "(754) 604-9063",
    message: "I scheduled your VIP appointment for 07/03/2024 08...",
    sentAt: "2024-07-03 08:08:03",
    createdAt: "2024-07-03 08:07:08",
  },
  {
    id: 2,
    to: "+15583828894+142237846843+1573688343+1575209284+1757639623+1976369464+1564859088",
    message: "Dealer - Priority Toyota Springfield Type - Type...",
    sentAt: "2024-07-03 08:08:04",
    createdAt: "2024-07-03 08:07:08",
  },
  {
    id: 3,
    to: "+1 (504) 483 - 7956",
    message: "I scheduled your VIP appointment for 07/04/2024 09...",
    sentAt: "2024-07-03 08:04:04",
    createdAt: "2024-07-03 08:03:36",
  },
  {
    id: 4,
    to: "+19044759761+13864067177+1525820679",
    message: "Dealer - Davis Nissan of Jacksonville Type - Type ...",
    sentAt: "2024-07-03 08:04:05",
    createdAt: "2024-07-03 08:03:36",
  },
];

export default function SmsLogs() {
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
    { key: "sentAt", label: "Sent At" },
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
            <DropdownMenuItem>Resend</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={smsLogs}
      searchPlaceholder="Search SMS logs..."
      showAddButton={false}
    />
  );
}
