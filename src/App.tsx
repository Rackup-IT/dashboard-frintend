import Layout from "@/components/layout/Layout";
import PrivateRoute from "@/components/PrivateRoute";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AddDealer from "@/pages/admin/AddDealer";
import AddDealership from "@/pages/admin/AddDealership";
import AddEmployee from "@/pages/admin/AddEmployee";
// import AppointmentExport from "@/pages/admin/AppointmentExport";
import AdminAppointmentHistory from "@/pages/admin/AppointmentHistory";
import AdminCallHistory from "@/pages/admin/CallHistory";
import DealerList from "@/pages/admin/DealerList";
import DealershipLogins from "@/pages/admin/DealershipLogins";
import DepartmentList from "@/pages/admin/DepartmentList";
import EditDealer from "@/pages/admin/EditDealer";
import EditDealership from "@/pages/admin/EditDealership";
import EditRole from "@/pages/admin/EditRole";
import EmployeeList from "@/pages/admin/EmployeeList";
import LeadSource from "@/pages/admin/LeadSource";
import PendingSms from "@/pages/admin/PendingSms";
import AdminRCAgentActivity from "@/pages/admin/RCAgentActivity";
import RoleList from "@/pages/admin/RoleList";
import RolePermission from "@/pages/admin/RolePermission";
import ScenarioList from "@/pages/admin/ScenarioList";
import DealerScheduleShift from "@/pages/admin/ScheduleShift";
import SmsLogs from "@/pages/admin/SmsLogs";
import ViewDealer from "@/pages/admin/ViewDealer";
import AppointmentForm from "@/pages/AppointmentForm";
import AppointmentHistory from "@/pages/AppointmentHistory";
import Login from "@/pages/auth/Login";
import CallHistory from "@/pages/CallHistory";
import Dashboard from "@/pages/dashboard/Dashboard";
import DealerInfo from "@/pages/dealer-info/DealerInfo";
import DealerNotification from "@/pages/dealer-notification/DealerNotification";
import Leaderboard from "@/pages/Leaderboard";
import MyStatistics from "@/pages/MyStatistics";
import NotFound from "@/pages/not-found";
import RCAgentActivity from "@/pages/RCAgentActivity";
import ScheduleShift from "@/pages/ScheduleShift";
import GeneralSettings from "@/pages/settings/GeneralSettings";
import RingCentralSettings from "@/pages/settings/RingCentralSettings";
import { QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";

function Router() {
  const [location] = useLocation();

  if (location === "/login") {
    return <Login />;
  }

  return (
    <PrivateRoute>
      <Layout>
        <Switch>
          <Route path="/">{() => <Redirect to="/dashboard" />}</Route>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/dealer-info" component={DealerInfo} />
          <Route path="/dealer-notification" component={DealerNotification} />
          <Route path="/appointment/create" component={AppointmentForm} />
          <Route path="/appointment/history" component={AppointmentHistory} />
          <Route path="/my-statistics" component={MyStatistics} />
          <Route path="/call-history" component={CallHistory} />
          <Route path="/schedule-shift" component={ScheduleShift} />
          <Route path="/rc-agent-activity" component={RCAgentActivity} />
          <Route path="/admin/dealer-list" component={DealerList} />
          <Route path="/admin/dealer-list/create" component={AddDealer} />
          <Route path="/admin/dealers/:id/edit" component={EditDealer} />
          <Route path="/admin/dealers/:id" component={ViewDealer} />
          <Route
            path="/admin/dealer/:id/schedule-shift"
            component={DealerScheduleShift}
          />
          <Route path="/admin/employee-list" component={EmployeeList} />
          <Route path="/admin/employee-list/create" component={AddEmployee} />
          <Route path="/admin/users/create" component={AddEmployee} />
          <Route
            path="/admin/appointment-history"
            component={AdminAppointmentHistory}
          />
          <Route path="/admin/call-history" component={AdminCallHistory} />
          {/* <Route
            path="/admin/appointment-export"
            component={AppointmentExport}
          /> */}
          <Route
            path="/admin/rc-agent-activity"
            component={AdminRCAgentActivity}
          />
          <Route path="/admin/department-list" component={DepartmentList} />
          <Route path="/admin/scenario-list" component={ScenarioList} />
          <Route path="/admin/lead-source" component={LeadSource} />
          <Route path="/admin/dealership-logins" component={DealershipLogins} />
          <Route path="/admin/dealerships/create" component={AddDealership} />
          <Route
            path="/admin/dealerships/:id/edit"
            component={EditDealership}
          />
          <Route path="/admin/roles" component={RoleList} />
          <Route path="/admin/roles/:id/edit" component={EditRole} />
          <Route path="/admin/role-permission" component={RolePermission} />
          <Route path="/admin/sms-logs" component={SmsLogs} />
          <Route path="/admin/pending-sms" component={PendingSms} />
          <Route path="/settings/general" component={GeneralSettings} />
          <Route
            path="/settings/ring-central"
            component={RingCentralSettings}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </PrivateRoute>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
