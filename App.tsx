
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './store';
import { Layout } from './components/Layout';
import { ToolCard } from './components/ToolCard';
import { OrderModal } from './components/OrderModal';
import { TOOLS, TRANSLATIONS } from './constants';
import { Language, AITool, OrderStatus, User } from './types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const HomePage: React.FC<{ onSelect: (tool: AITool) => void }> = ({ onSelect }) => {
  const { state } = useApp();
  const t = TRANSLATIONS[state.language];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          {t.heroTitle}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t.heroSub}
        </p>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOOLS.map(tool => (
          <ToolCard key={tool.id} tool={tool} onSelect={onSelect} />
        ))}
      </section>

      <section className="mt-24 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6">Why choose us?</h2>
          <ul className="space-y-4">
            {[
              "Instant delivery after manual verification",
              "100% genuine premium shared/private accounts",
              "Full warranty during subscription period",
              "Dedicated 24/7 support in Bengali"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 w-full">
           <img src="https://picsum.photos/seed/aisub/600/400" className="rounded-2xl shadow-xl w-full object-cover h-64" alt="Banner" />
        </div>
      </section>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { state } = useApp();
  const userOrders = state.orders.filter(o => o.userId === state.user?.id);
  const activeSubs = userOrders.filter(o => o.status === OrderStatus.ACTIVE || o.status === OrderStatus.VERIFIED);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              {state.user?.name.charAt(0)}
            </div>
            <h3 className="font-bold text-lg">{state.user?.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{state.user?.email}</p>
            <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full border border-green-100">VERIFIED USER</span>
          </div>
        </aside>

        <main className="flex-1 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <p className="opacity-80 text-sm">Active Subscriptions</p>
              <h2 className="text-3xl font-bold">{activeSubs.length}</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold">{userOrders.length}</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm">Reward Points</p>
              <h2 className="text-3xl font-bold text-orange-500">240</h2>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-xl font-bold">Active Subscriptions</h3>
            </div>
            <div className="p-6">
              {activeSubs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">No active subscriptions found.</div>
              ) : (
                <div className="grid gap-6">
                  {activeSubs.map(order => {
                    const tool = TOOLS.find(t => t.id === order.toolId);
                    return (
                      <div key={order.id} className="p-6 border border-gray-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{tool?.icon}</div>
                          <div>
                            <h4 className="font-bold">{tool?.name}</h4>
                            <p className="text-sm text-gray-500">Order: {order.id}</p>
                          </div>
                        </div>
                        <div className="text-center md:text-right">
                          <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full mb-1 inline-block">
                            {order.status}
                          </div>
                          <p className="text-xs text-gray-400">Expires: {order.credentials?.expiry || 'Awaiting Details'}</p>
                        </div>
                        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold">Manage Account</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-xl font-bold">Recent Order History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Tool</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {userOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                      <td className="px-6 py-4 font-semibold">{TOOLS.find(t => t.id === order.toolId)?.name}</td>
                      <td className="px-6 py-4">{order.amount} BDT</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          order.status === OrderStatus.PENDING ? 'bg-yellow-50 text-yellow-600' :
                          order.status === OrderStatus.REJECTED ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { state, updateOrder, addNotification } = useApp();
  const pendingOrders = state.orders.filter(o => o.status === OrderStatus.PENDING);
  
  const handleVerify = (orderId: string) => {
    updateOrder(orderId, { 
      status: OrderStatus.ACTIVE,
      credentials: {
        email: 'user' + Math.floor(Math.random() * 1000) + '@aisubbd.com',
        pass: 'Premium' + Math.random().toString(36).substring(7),
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    });
    addNotification({
      title: 'Subscription Activated',
      message: `Account credentials sent for Order ${orderId}`,
      type: 'success'
    });
  };

  const handleReject = (orderId: string) => {
    updateOrder(orderId, { status: OrderStatus.REJECTED });
    addNotification({
      title: 'Order Rejected',
      message: `Verification failed for Order ${orderId}`,
      type: 'error'
    });
  };

  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  const pieData = [
    { name: 'ChatGPT', value: 400 },
    { name: 'Claude', value: 300 },
    { name: 'Midjourney', value: 300 },
    { name: 'Canva', value: 200 },
  ];

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <div className="flex gap-4">
          <button className="bg-gray-100 px-4 py-2 rounded-lg font-bold">Export CSV</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Add Tool</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Sales Trend (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Tool Popularity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold">Pending Verification ({pendingOrders.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Tool</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold">{TOOLS.find(t => t.id === order.toolId)?.name}</div>
                    <div className="text-xs text-gray-400">{order.amount} BDT</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-pink-500">{order.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold">TxID: {order.transactionId}</div>
                    <div className="text-xs text-gray-500">From: {order.senderNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleVerify(order.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">Verify</button>
                      <button onClick={() => handleReject(order.id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
              {pendingOrders.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-gray-400">All caught up! No pending orders.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AuthPage: React.FC<{ type: 'login' | 'register', onSuccess: () => void }> = ({ type, onSuccess }) => {
  const { setUser, addNotification } = useApp();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(7),
      name: name || 'User ' + email.split('@')[0],
      email,
      phone: '01XXXXXXXXX',
      role: email.includes('admin') ? 'admin' : 'user',
      isVerified: true
    };
    setUser(mockUser);
    addNotification({
      title: type === 'login' ? 'Login Successful' : 'Registration Successful',
      message: `Welcome ${mockUser.name}!`,
      type: 'success'
    });
    onSuccess();
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none" required />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold mb-1">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none" required />
        </div>
        <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg mt-4">
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        {type === 'login' ? "Don't have an account?" : "Already have an account?"} 
        <button className="text-blue-600 font-bold ml-1">Click here</button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <AppProvider>
      <Layout onNavigate={navigate}>
        {currentPage === 'home' && <HomePage onSelect={setSelectedTool} />}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'admin' && <AdminPage />}
        {currentPage === 'login' && <AuthPage type="login" onSuccess={() => navigate('home')} />}
        {currentPage === 'register' && <AuthPage type="register" onSuccess={() => navigate('home')} />}
        
        {selectedTool && (
          <OrderModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </Layout>
    </AppProvider>
  );
};

export default App;
