import { Home, Search, ShoppingCart, Bell, User, ChevronDown, LogOut, Users, FileText, Settings, BarChart3, MenuIcon } from 'lucide-react';
import Header from '../../components/dashboardComponent/Header';
import LeftsideNavbar from '../../components/dashboardComponent/LeftsideNavbar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
     <Header/>
      {/* Body Layout */}
      <div className="flex flex-1 min-h-0">

        {/* sidebar navigation */}
          <LeftsideNavbar/>

        {/* Main Content */}
        <main className="flex-1 px-10 py-8 bg-blue-50 min-h-0">
          <h1 className="text-3xl font-bold text-[#5b91aa] mb-4">Home</h1>

          <div className="flex flex-wrap gap-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-[#497488] to-[#334d7d] text-white rounded-xl p-6 flex-1 min-w-[320px] shadow">
              <h2 className="text-xl font-semibold mb-2">Welcome, Super Admin!</h2>
              <p className="mb-2">You have full access to all system features and can manage all users and content.</p>
              <span className="bg-white/20 py-1 px-4 rounded-lg text-sm font-semibold">Role: SUPERADMIN</span>
            </div>

          </div>

          {/* Capabilities Section */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow max-w-3xl">
            <h3 className="text-lg font-semibold mb-3">Your Capabilities</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-[#497488]">
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>Create, edit, delete all admins</li>
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>Full content management access</li>
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>Create, edit, delete all content creators</li>
              <li className="flex items-center"><span className="text-green-500 mr-1">✓</span>System-wide administrative privileges</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
