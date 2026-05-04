import { Outlet } from "react-router";
import { AppProvider } from "../context/AppContext";

export default function Root() {
  return (
    <AppProvider>
      <div className="sm:min-h-screen w-full max-w-[480px] mx-auto bg-white relative overflow-x-hidden md:max-w-[900px] lg:max-w-full">
        <Outlet />
      </div>
    </AppProvider>
  );
}
