import { Outlet } from 'react-router';
import { AppProvider } from '../context/AppContext';

export default function Root() {
  return (
    <AppProvider>
      <div className="min-h-screen w-full max-w-[480px] mx-auto bg-white relative overflow-x-hidden">
        <Outlet />
      </div>
    </AppProvider>
  );
}
