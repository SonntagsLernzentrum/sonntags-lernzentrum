import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, FileText, Calendar, Users, User, LogOut } from "lucide-react";

export default function ParentLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("parentId");
    navigate("/eltern/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const navItems = [
    { path: "/eltern/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/eltern/rechnungen", icon: FileText, label: "Rechnungen" },
    { path: "/eltern/termine", icon: Calendar, label: "Termine" },
    { path: "/eltern/kinder", icon: Users, label: "Meine Kinder" },
    { path: "/eltern/konto", icon: User, label: "Mein Konto" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              Sonntags Lernzentrum - Elternportal
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <nav className="w-64 bg-white rounded-lg shadow-sm p-4 h-fit sticky top-24">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        active
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
