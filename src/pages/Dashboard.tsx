// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Load user from localStorage
//     const storedUser = localStorage.getItem('user');
//     if (!storedUser) {
//       navigate('/');
//       return;
//     }
//     setUser(JSON.parse(storedUser));
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/');
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </header>

//       <section className="mb-6">
//         <p className="text-xl">
//           Welcome, <span className="font-semibold">{user.name}</span>! (
//           {user.role})
//         </p>
//       </section>

//       <nav className="space-x-4">
//         <button
//           onClick={() => navigate('/students')}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Manage Students
//         </button>
//         <button
//           onClick={() => navigate('/courses')}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Manage Courses
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Dashboard;


import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
