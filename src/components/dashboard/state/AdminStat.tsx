'use client' 
import { useAdminState } from '@/hooks/states/useAdminState';
import { 
  Users, 
  Calendar, 
  CreditCard,  
  ShieldCheck, 
  UserCog, 
  RefreshCcw, 
  CoinsIcon
} from 'lucide-react'; 
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
} from 'recharts';

const AdminState = () => {
  const { data, isLoading, refetch, isFetching } = useAdminState();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-600 border-t-transparent"></div>
      </div>
    );
  }

   
  const userStats = [
    { name: 'Users', value: data?.totalUsers, color: '#EAB308' },
    { name: 'Hosts', value: data?.totalHosts, color: '#A16207' },
    { name: 'Admins', value: data?.totalAdmin, color: '#713F12' },
  ];

  const statsCards = [
    { title: 'Total Revenue', value: `৳${" "}${data?.totalPaidAmount}`, icon: CoinsIcon, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Total Events', value: data?.totalEvents, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Payments', value: data?.totalPaymentCount, icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Total Accounts', value: data?.totalUserCount, icon: Users, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="p-3 container mx-auto space-y-8 bg-[#FAFAFA] dark:bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-medium">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <button 
          onClick={() => refetch()}
          className="p-2.5 bg-white dark:bg-gray-800 border rounded-xl shadow-sm hover:rotate-180 transition-all duration-500"
        >
          <RefreshCcw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{card.title}</p>
                <h3 className="text-3xl font-black mt-1 text-gray-800 dark:text-white">{card.value}</h3>
              </div>
              <div className={`${card.bg} p-3 rounded-2xl`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-yellow-600" /> User Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                  {userStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Roles Breakdown */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border shadow-sm flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-600" /> Roles Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <span className="font-bold text-gray-600 dark:text-gray-300">Super Admin</span>
              <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-black">{data?.totalSuperAdmin}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <span className="font-bold text-gray-600 dark:text-gray-300">Admins</span>
              <span className="bg-yellow-800 text-white px-3 py-1 rounded-full text-xs font-black">{data?.totalAdmin}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <span className="font-bold text-gray-600 dark:text-gray-300">Total Users</span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-black">{data?.totalUserCount}</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-center text-gray-400 italic">
            * System wide account distribution across all roles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminState;