import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return <div className="h-screen border-r flex-col overflow-y-auto bg-white shadow-sm">
    <div className="p-6">
        <Logo/>
    </div>
    <div className="flex-col w-full ">
        <SidebarRoutes/>
    </div>
  </div>;
};
