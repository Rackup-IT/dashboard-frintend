import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PopoverContent } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiRequest } from "@/lib/queryClient";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const icons = {
    "users-icons": "👥",
    "appointments-icons": "📅",
    "dealers-icons": "🏢",
    "today-appointments-icons": "📆",
    "monthly-appointments-icons": "🗓️",
  };
  // Date states for each table
  const [todayAgentDate, setTodayAgentDate] = useState<Date | undefined>(
    new Date()
  );
  const [todayDealerDate, setTodayDealerDate] = useState<Date | undefined>(
    new Date()
  );
  const [todayAgentDeptDate, setTodayAgentDeptDate] = useState<
    Date | undefined
  >(new Date());
  const [todayDealerDeptDate, setTodayDealerDeptDate] = useState<
    Date | undefined
  >(new Date());
  const [mtdAgentDate, setMtdAgentDate] = useState<Date | undefined>(
    new Date()
  );
  const [mtdDealerDate, setMtdDealerDate] = useState<Date | undefined>(
    new Date()
  );
  const [ringCentralDate, setRingCentralDate] = useState<Date | undefined>(
    new Date()
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [agentPage, setAgentPage] = useState(1);
  const [agentTotalPages, setAgentTotalPages] = useState(1);

  // Calendar open states
  const [calendarStates, setCalendarStates] = useState({
    todayAgent: false,
    todayDealer: false,
    todayAgentDept: false,
    todayDealerDept: false,
    mtdAgent: false,
    mtdDealer: false,
    ringCentral: false,
  });

  const setCalendarOpen = (table: string, isOpen: boolean) => {
    setCalendarStates((prev) => ({ ...prev, [table]: isOpen }));
  };

  // Sample data matching the screenshots
  const [summaryStats, setSummaryStats] = useState([]);

  const [todayAgentStats, setTodayAgentStats] = useState([]);
  const [todayDealerStats, setTodayDealerStats] = useState([]);

  // const todayAgentDeptStats = [
  //   {
  //     agent: "vdmengpe",
  //     apts: 0,
  //     campaigns: 0,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 0,
  //     sms: 0,
  //     sales: 0,
  //   },
  //   {
  //     agent: "Adrian Mclaughlin",
  //     apts: 34,
  //     campaigns: 0,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 0,
  //     sms: 0,
  //     sales: 0,
  //   },
  //   {
  //     agent: "Alex Willhite",
  //     apts: 0,
  //     campaigns: 0,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 0,
  //     sms: 0,
  //     sales: 0,
  //   },
  //   {
  //     agent: "Amanda Jones",
  //     apts: 34,
  //     campaigns: 6,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 6,
  //     sms: 0,
  //     sales: 34,
  //   },
  //   {
  //     agent: "Jonathan",
  //     apts: 1,
  //     campaigns: 1,
  //     confirmations: 1,
  //     data_mining: 0,
  //     follow_up: 1,
  //     sms: 0,
  //     sales: 1,
  //   },
  // ];

  // const todayDealerDeptStats = [
  //   {
  //     dealer: "All American Chevrolet of Midland",
  //     apts: 2,
  //     campaigns: 0,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 0,
  //     sms: 0,
  //     sales: 2,
  //   },
  //   {
  //     dealer: "Anchor Kia",
  //     apts: 0,
  //     campaigns: 0,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 0,
  //     sms: 0,
  //     sales: 7,
  //   },
  //   {
  //     dealer: "Augusta",
  //     apts: 25,
  //     campaigns: 0,
  //     confirmations: 0,
  //     data_mining: 0,
  //     follow_up: 1,
  //     sms: 0,
  //     sales: 25,
  //   },
  //   {
  //     dealer: "Goyanda",
  //     apts: 6,
  //     campaigns: 5,
  //     confirmations: 3,
  //     data_mining: 0,
  //     follow_up: 1,
  //     sms: 0,
  //     sales: 6,
  //   },
  //   {
  //     dealer: "Jonathan",
  //     apts: 15,
  //     campaigns: 1,
  //     confirmations: 1,
  //     data_mining: 0,
  //     follow_up: 1,
  //     sms: 0,
  //     sales: 15,
  //   },
  // ];

  // const mtdAgentStats = [
  //   {
  //     agent: "vdmengpe",
  //     total_apts: "0",
  //     mid_avg: "0",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "0",
  //     sms: "0",
  //     sales: "0",
  //   },
  //   {
  //     agent: "Adrian Mclaughlin",
  //     total_apts: "1,895",
  //     mid_avg: "134.24",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "0",
  //     sms: "0",
  //     sales: "1,895",
  //   },
  //   {
  //     agent: "Alex Willhite",
  //     total_apts: "585",
  //     mid_avg: "21.81",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "0",
  //     sms: "0",
  //     sales: "168",
  //   },
  //   {
  //     agent: "Amanda Jones",
  //     total_apts: "655",
  //     mid_avg: "140.76",
  //     campaigns: "2",
  //     confirmations: "1",
  //     data_mining: "0",
  //     follow_up: "23",
  //     sms: "6",
  //     sales: "672",
  //   },
  //   {
  //     agent: "Jonathan Gonzalez",
  //     total_apts: "398",
  //     mid_avg: "47.36",
  //     campaigns: "1",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "128",
  //     sms: "6",
  //     sales: "398",
  //   },
  // ];

  // const mtdDealerStats = [
  //   {
  //     dealer: "All American Chevrolet of Midland",
  //     total_apts: "79",
  //     daily_avg: "2.7",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "1",
  //     sms: "2",
  //     sales: "79",
  //   },
  //   {
  //     dealer: "Anchor Kia",
  //     total_apts: "114",
  //     daily_avg: "8",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "3",
  //     sms: "0",
  //     sales: "114",
  //   },
  //   {
  //     dealer: "Augusta Mitsubishi",
  //     total_apts: "274",
  //     daily_avg: "12.8",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "3",
  //     sms: "0",
  //     sales: "274",
  //   },
  //   {
  //     dealer: "Goyanda Kia",
  //     total_apts: "307",
  //     daily_avg: "9.17",
  //     campaigns: "5",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "6",
  //     sms: "0",
  //     sales: "307",
  //   },
  //   {
  //     dealer: "Daytona Mitsubishi",
  //     total_apts: "194",
  //     daily_avg: "8.83",
  //     campaigns: "0",
  //     confirmations: "0",
  //     data_mining: "0",
  //     follow_up: "3",
  //     sms: "0",
  //     sales: "194",
  //   },
  // ];

  // const ringCentralStats = [
  //   {
  //     agent: "Adrian Mclaughlin",
  //     today_calls: "305",
  //     month_calls: "5,572",
  //     avg_daily_calls: "341.12",
  //   },
  //   {
  //     agent: "Alex Willhite",
  //     today_calls: "194",
  //     month_calls: "4,400",
  //     avg_daily_calls: "88.6",
  //   },
  //   {
  //     agent: "Amanda Jones",
  //     today_calls: "330",
  //     month_calls: "7,659",
  //     avg_daily_calls: "595.22",
  //   },
  //   {
  //     agent: "Jonathan Gonzalez",
  //     today_calls: "168",
  //     month_calls: "5,506",
  //     avg_daily_calls: "334.5",
  //   },
  //   {
  //     agent: "Other John Stockton",
  //     today_calls: "187",
  //     month_calls: "4,522",
  //     avg_daily_calls: "257.5",
  //   },
  // ];

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "dd/MM/yyyy") : "06/27/2025";
  };
  useEffect(() => {
    loadData();
  }, [todayAgentDate, todayDealerDate]);
  const loadData = () => {
    apiRequest("GET", "dashboard/admin-stats").then((data) => {
      setSummaryStats(data.summary);
    });
    apiRequest(
      "GET",
      `dashboard/leaderboard?date=${todayAgentDate?.toISOString()}`
    ).then((data) => {
      setTodayAgentStats(data.leaderboard);
    });
    apiRequest(
      "GET",
      `dashboard/dealer-leaderboard?date=${todayDealerDate?.toISOString()}`
    ).then((data) => {
      setTodayDealerStats(data.leaderboard);
    });
  };
  const getIcon = (iconName: string) => {
    if (iconName === "users-icon") return "👥";
    if (iconName === "appointments-icon") return "📅";
    if (iconName === "dealers-icon") return "🏢";
    if (iconName === "today-appointments-icon") return "📆";
    if (iconName === "monthly-appointments-icon") return "🗓️";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl`}
                >
                  {getIcon(stat.icon)}
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today - Agent Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Today - Agent Stats</CardTitle>
            <div className="flex items-center gap-2">
              <Popover
                open={calendarStates.todayAgent}
                onOpenChange={(isOpen) => setCalendarOpen("todayAgent", isOpen)}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDate(todayAgentDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={todayAgentDate}
                    onSelect={setTodayAgentDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Agent</TableHead>
                  <TableHead className="text-xs">Apts. Today</TableHead>
                  <TableHead className="text-xs">Last Apt.</TableHead>
                  <TableHead className="text-xs">Hourly Avg. Apts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAgentStats.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs">{row.agentName}</TableCell>
                    <TableCell className="text-xs">{row.total}</TableCell>
                    <TableCell className="text-xs">
                      {formatDate(row.lastAppointmentDate)}
                    </TableCell>
                    <TableCell className="text-xs">
                      {(row.total / 24).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </CardContent>
        </Card>

        {/* Today - Dealer Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Today - Dealer Stats</CardTitle>
            <div className="flex items-center gap-2">
              <Popover
                open={calendarStates.todayDealer}
                onOpenChange={(isOpen) =>
                  setCalendarOpen("todayDealer", isOpen)
                }
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDate(todayDealerDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={todayDealerDate}
                    onSelect={setTodayDealerDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Dealer</TableHead>
                  <TableHead className="text-xs">Apts. Today</TableHead>
                  <TableHead className="text-xs">Last Apt.</TableHead>
                  <TableHead className="text-xs">Hourly Avg. Apts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayDealerStats.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs">{row.name}</TableCell>
                    <TableCell className="text-xs">
                      {row.totalAppointments}
                    </TableCell>
                    <TableCell className="text-xs">
                      {formatDate(row.lastAppointmentDate)}
                    </TableCell>
                    <TableCell className="text-xs">
                      {row.totalAppointments / 24}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              currentPage={agentPage}
              totalPages={agentTotalPages}
              onPageChange={(newPage) => setAgentPage(newPage)}
            />
          </CardContent>
        </Card>

        {/* Today - Agent Stats By Department */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Today - Agent Stats By Department
            </CardTitle>
            <div className="flex items-center gap-2">
              <Popover
                open={calendarStates.todayAgentDept}
                onOpenChange={(isOpen) =>
                  setCalendarOpen("todayAgentDept", isOpen)
                }
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDate(todayAgentDeptDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={todayAgentDeptDate}
                    onSelect={setTodayAgentDeptDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Agent</TableHead>
                    <TableHead className="text-xs">Apts.</TableHead>
                    <TableHead className="text-xs">Campaigns</TableHead>
                    <TableHead className="text-xs">Confirmations</TableHead>
                    <TableHead className="text-xs">Data Mining</TableHead>
                    <TableHead className="text-xs">Follow Up</TableHead>
                    <TableHead className="text-xs">SMS</TableHead>
                    <TableHead className="text-xs">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAgentDeptStats.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{row.agent}</TableCell>
                      <TableCell className="text-xs">{row.apts}</TableCell>
                      <TableCell className="text-xs">{row.campaigns}</TableCell>
                      <TableCell className="text-xs">
                        {row.confirmations}
                      </TableCell>
                      <TableCell className="text-xs">
                        {row.data_mining}
                      </TableCell>
                      <TableCell className="text-xs">{row.follow_up}</TableCell>
                      <TableCell className="text-xs">{row.sms}</TableCell>
                      <TableCell className="text-xs">{row.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button size="sm" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="ml-1">
                2
              </Button>
              <Button variant="outline" size="sm" className="ml-1">
                3
              </Button>
              <Button variant="outline" size="sm" className="ml-1">
                Next
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Today - Dealer Stats By Department */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Today - Dealer Stats By Department
            </CardTitle>
            <div className="flex items-center gap-2">
              <Popover
                open={calendarStates.todayDealerDept}
                onOpenChange={(isOpen) =>
                  setCalendarOpen("todayDealerDept", isOpen)
                }
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {formatDate(todayDealerDeptDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={todayDealerDeptDate}
                    onSelect={setTodayDealerDeptDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Dealer</TableHead>
                    <TableHead className="text-xs">Apts.</TableHead>
                    <TableHead className="text-xs">Campaigns</TableHead>
                    <TableHead className="text-xs">Confirmations</TableHead>
                    <TableHead className="text-xs">Data Mining</TableHead>
                    <TableHead className="text-xs">Follow Up</TableHead>
                    <TableHead className="text-xs">SMS</TableHead>
                    <TableHead className="text-xs">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayDealerDeptStats.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{row.dealer}</TableCell>
                      <TableCell className="text-xs">{row.apts}</TableCell>
                      <TableCell className="text-xs">{row.campaigns}</TableCell>
                      <TableCell className="text-xs">
                        {row.confirmations}
                      </TableCell>
                      <TableCell className="text-xs">
                        {row.data_mining}
                      </TableCell>
                      <TableCell className="text-xs">{row.follow_up}</TableCell>
                      <TableCell className="text-xs">{row.sms}</TableCell>
                      <TableCell className="text-xs">{row.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button size="sm" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="ml-1">
                2
              </Button>
              <Button variant="outline" size="sm" className="ml-1">
                3
              </Button>
              <Button variant="outline" size="sm" className="ml-1">
                Next
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* MTD - Agent Stats */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-sm">MTD - Agent Stats</CardTitle>
            <div className="flex items-center gap-2">
              <Popover open={calendarStates.mtdAgent} onOpenChange={(isOpen) => setCalendarOpen('mtdAgent', isOpen)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    June 2025
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <
                    mode="single"
                    selected={mtdAgentDate}
                    onSelect={setMtdAgentDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Agent</TableHead>
                    <TableHead className="text-xs">Total Apts</TableHead>
                    <TableHead className="text-xs">Mid Avg</TableHead>
                    <TableHead className="text-xs">Campaigns</TableHead>
                    <TableHead className="text-xs">Confirmations</TableHead>
                    <TableHead className="text-xs">Data Mining</TableHead>
                    <TableHead className="text-xs">Follow Up</TableHead>
                    <TableHead className="text-xs">SMS</TableHead>
                    <TableHead className="text-xs">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mtdAgentStats.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{row.agent}</TableCell>
                      <TableCell className="text-xs">{row.total_apts}</TableCell>
                      <TableCell className="text-xs">{row.mid_avg}</TableCell>
                      <TableCell className="text-xs">{row.campaigns}</TableCell>
                      <TableCell className="text-xs">{row.confirmations}</TableCell>
                      <TableCell className="text-xs">{row.data_mining}</TableCell>
                      <TableCell className="text-xs">{row.follow_up}</TableCell>
                      <TableCell className="text-xs">{row.sms}</TableCell>
                      <TableCell className="text-xs">{row.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm" className="ml-1">2</Button>
              <Button variant="outline" size="sm" className="ml-1">3</Button>
              <Button variant="outline" size="sm" className="ml-1">Next</Button>
            </div>
          </CardContent>
        </Card> */}

        {/* MTD - Dealer Stats */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-sm">MTD - Dealer Stats</CardTitle>
            <div className="flex items-center gap-2">
              <Popover open={calendarStates.mtdDealer} onOpenChange={(isOpen) => setCalendarOpen('mtdDealer', isOpen)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    June 2025
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <
                    mode="single"
                    selected={mtdDealerDate}
                    onSelect={setMtdDealerDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Dealer</TableHead>
                    <TableHead className="text-xs">Total Apts</TableHead>
                    <TableHead className="text-xs">Daily Avg</TableHead>
                    <TableHead className="text-xs">Campaigns</TableHead>
                    <TableHead className="text-xs">Confirmations</TableHead>
                    <TableHead className="text-xs">Data Mining</TableHead>
                    <TableHead className="text-xs">Follow Up</TableHead>
                    <TableHead className="text-xs">SMS</TableHead>
                    <TableHead className="text-xs">Sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mtdDealerStats.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{row.dealer}</TableCell>
                      <TableCell className="text-xs">{row.total_apts}</TableCell>
                      <TableCell className="text-xs">{row.daily_avg}</TableCell>
                      <TableCell className="text-xs">{row.campaigns}</TableCell>
                      <TableCell className="text-xs">{row.confirmations}</TableCell>
                      <TableCell className="text-xs">{row.data_mining}</TableCell>
                      <TableCell className="text-xs">{row.follow_up}</TableCell>
                      <TableCell className="text-xs">{row.sms}</TableCell>
                      <TableCell className="text-xs">{row.sales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button size="sm" className="bg-blue-600 text-white">1</Button>
              <Button variant="outline" size="sm" className="ml-1">2</Button>
              <Button variant="outline" size="sm" className="ml-1">3</Button>
              <Button variant="outline" size="sm" className="ml-1">Next</Button>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* RingCentral Call - Agent Stats (Full Width) */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-sm">RingCentral Call - Agent Stats</CardTitle>
          <div className="flex items-center gap-2">
            <Popover open={calendarStates.ringCentral} onOpenChange={(isOpen) => setCalendarOpen('ringCentral', isOpen)}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {formatDate(ringCentralDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <
                  mode="single"
                  selected={ringCentralDate}
                  onSelect={setRingCentralDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Agent</TableHead>
                <TableHead className="text-xs">Today Calls</TableHead>
                <TableHead className="text-xs">Month Calls</TableHead>
                <TableHead className="text-xs">Avg Daily Calls</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ringCentralStats.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs">{row.agent}</TableCell>
                  <TableCell className="text-xs">{row.today_calls}</TableCell>
                  <TableCell className="text-xs">{row.month_calls}</TableCell>
                  <TableCell className="text-xs">{row.avg_daily_calls}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4">
            <Button size="sm" className="bg-blue-600 text-white">1</Button>
            <Button variant="outline" size="sm" className="ml-1">2</Button>
            <Button variant="outline" size="sm" className="ml-1">3</Button>
            <Button variant="outline" size="sm" className="ml-1">Next</Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
