import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">WeatherNow</h1>
        </nav>
      </header>
      <main className="container mx-auto p-4" style={{ height: 'calc(100vh - 68px)' }}>
        <Outlet />
      </main>
    </div>
  );
};
