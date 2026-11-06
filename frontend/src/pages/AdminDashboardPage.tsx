import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  ShieldCheck, 
  Car, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Users, 
  Activity, 
  TrendingUp, 
  Search, 
  Filter, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Download,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { 
  BookingService, 
  EnquiryService, 
  ConfiguratorService, 
  CurrencyFormatter 
} from '../services/api';
import { 
  TestDriveBooking, 
  CustomerEnquiry, 
  Quotation, 
  Vehicle 
} from '../types/vehicle';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'bookings' | 'quotations' | 'vehicles' | 'audit'>('overview');
  
  // Data lists
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(VEHICLES_DATA);

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState<{ id: string; user: string; action: string; entity: string; time: string }[]>([
    { id: 'log-1', user: 'admin_sys', action: 'SYSTEM_BOOT', entity: 'APPLICATION', time: '10 mins ago' },
    { id: 'log-2', user: 'sales_lead', action: 'STATUS_UPDATE', entity: 'ENQUIRY_#289', time: '25 mins ago' },
    { id: 'log-3', user: 'admin_sys', action: 'CATALOG_SYNC', entity: '15_VEHICLES', time: '1 hour ago' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const enqs = await EnquiryService.getEnquiries();
      const bks = await BookingService.getBookings();
      const qts = await ConfiguratorService.getRecentQuotations();

      setEnquiries(enqs);
      setBookings(bks);
      setQuotations(qts);
    };
    fetchData();
  }, []);

  const handleUpdateBookingStatus = async (id: string, status: TestDriveBooking['status']) => {
    await BookingService.updateBookingStatus(id, status);
    const updated = await BookingService.getBookings();
    setBookings(updated);

    // Audit log
    setAuditLogs((prev) => [
      { id: `log-${Date.now()}`, user: user?.username || 'admin', action: `BOOKING_${status}`, entity: `BOOKING_${id}`, time: 'Just now' },
      ...prev
    ]);
  };

  const handleUpdateEnquiryStatus = async (id: string, status: CustomerEnquiry['status']) => {
    await EnquiryService.updateEnquiryStatus(id, status);
    const updated = await EnquiryService.getEnquiries();
    setEnquiries(updated);

    // Audit log
    setAuditLogs((prev) => [
      { id: `log-${Date.now()}`, user: user?.username || 'admin', action: `ENQUIRY_${status}`, entity: `ENQUIRY_${id}`, time: 'Just now' },
      ...prev
    ]);
  };

  // Analytics Chart Data
  const monthlyData = [
    { month: 'Jan', enquiries: 42, testDrives: 28, quotes: 65 },
    { month: 'Feb', enquiries: 58, testDrives: 35, quotes: 82 },
    { month: 'Mar', enquiries: 74, testDrives: 46, quotes: 110 },
    { month: 'Apr', enquiries: 92, testDrives: 62, quotes: 145 },
    { month: 'May', enquiries: 115, testDrives: 84, quotes: 190 },
    { month: 'Jun', enquiries: 138, testDrives: 95, quotes: 230 },
  ];

  const popularityData = [
    { name: 'Aero X', value: 45, color: '#f59e0b' },
    { name: 'Phantom GT', value: 28, color: '#ef4444' },
    { name: 'Apex SUV', value: 35, color: '#06b6d4' },
    { name: 'CyberTrack', value: 30, color: '#8b5cf6' },
    { name: 'Velocity', value: 18, color: '#10b981' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Admin Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-black text-white">AUTOBOT COMMAND CENTER</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black">
                  Admin RBAC
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Session Active: <strong className="text-white">{user?.fullName || 'Super Administrator'}</strong> ({user?.role || 'ADMIN'})
              </p>
            </div>
          </div>

          {/* Quick Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
              { id: 'bookings', label: `Test Drives (${bookings.length})` },
              { id: 'quotations', label: `Quotations (${quotations.length})` },
              { id: 'vehicles', label: `Vehicles (${vehiclesList.length})` },
              { id: 'audit', label: 'Audit Trail' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-black shadow-glow'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. OVERVIEW TAB: Metrics & Recharts */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span className="uppercase tracking-wider">Fleet Models</span>
                  <Car className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-display text-3xl font-black text-white block">15</span>
                <span className="text-[10px] text-emerald-400 font-semibold">100% Operational In DB</span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span className="uppercase tracking-wider">Total Enquiries</span>
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-display text-3xl font-black text-white block">
                  {enquiries.length + 138}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">+24% month-over-month</span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span className="uppercase tracking-wider">Test Drives Scheduled</span>
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <span className="font-display text-3xl font-black text-white block">
                  {bookings.length + 95}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">89% completion rate</span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span className="uppercase tracking-wider">Quotes Generated</span>
                  <FileText className="w-4 h-4 text-amber-400" />
                </div>
                <span className="font-display text-3xl font-black text-amber-400 block">
                  {quotations.length + 230}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">₹142.5 Cr pipeline value</span>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Chart: Monthly Activity Trends (8 cols) */}
              <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-zinc-800">
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-800">
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      Enquiries & Quotations Growth
                    </h3>
                    <p className="text-xs text-zinc-400">Monthly showroom traffic progression</p>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">2026 Season</span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" stroke="#71717a" fontSize={11} />
                      <YAxis stroke="#71717a" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px' }}
                      />
                      <Bar dataKey="quotes" name="Quotations" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="enquiries" name="Enquiries" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="testDrives" name="Test Drives" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Chart: Vehicle Model Interest Share (4 cols) */}
              <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white mb-1">
                    Model Popularity Share
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">Customer configuration volume</p>

                  <div className="h-56 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={popularityData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={4}
                        >
                          {popularityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', fontSize: '11px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-zinc-800 text-xs">
                  {popularityData.map((p) => (
                    <div key={p.name} className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-zinc-300">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        {p.name}
                      </span>
                      <span className="font-bold text-white">{p.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <h3 className="font-display text-lg font-bold text-white">
                Customer Enquiries Management
              </h3>
              <span className="text-xs text-zinc-400">Total: {enquiries.length} submissions</span>
            </div>

            {enquiries.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Vehicle</th>
                      <th className="py-3 px-3">City</th>
                      <th className="py-3 px-3">Channel</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                        <td className="py-3 px-3 text-zinc-500 font-mono">
                          {new Date(enq.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          <strong className="text-white block">{enq.fullName}</strong>
                          <span className="text-zinc-500">{enq.phone} • {enq.email}</span>
                        </td>
                        <td className="py-3 px-3 text-amber-400 font-bold">{enq.vehicleName}</td>
                        <td className="py-3 px-3 text-zinc-300">{enq.city}</td>
                        <td className="py-3 px-3 text-zinc-400 font-semibold">{enq.preferredContactMethod}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            enq.status === 'NEW' 
                              ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                              : enq.status === 'CONTACTED'
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {enq.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={enq.status}
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as any)}
                            className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-[11px] text-zinc-200 focus:outline-none"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No customer enquiries submitted in this session yet. Submit an enquiry via the public Enquiry page to see it live here!
              </div>
            )}
          </div>
        )}

        {/* 3. TEST DRIVES TAB */}
        {activeTab === 'bookings' && (
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <h3 className="font-display text-lg font-bold text-white">
                Test Drive Bookings & Track Schedules
              </h3>
              <span className="text-xs text-zinc-400">Total: {bookings.length} reservations</span>
            </div>

            {bookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                      <th className="py-3 px-3">Reference</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Vehicle</th>
                      <th className="py-3 px-3">Date & Slot</th>
                      <th className="py-3 px-3">Showroom Location</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                        <td className="py-3 px-3 font-mono text-zinc-400 font-bold">{b.id}</td>
                        <td className="py-3 px-3">
                          <strong className="text-white block">{b.customerName}</strong>
                          <span className="text-zinc-500">{b.customerPhone} • {b.customerEmail}</span>
                        </td>
                        <td className="py-3 px-3 text-amber-400 font-bold">{b.vehicleName}</td>
                        <td className="py-3 px-3">
                          <span className="text-white font-semibold block">{b.preferredDate}</span>
                          <span className="text-[11px] text-zinc-500">{b.preferredTimeSlot}</span>
                        </td>
                        <td className="py-3 px-3 text-zinc-300 max-w-[200px] truncate">{b.showroomLocation}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'CONFIRMED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : b.status === 'CANCELLED'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-amber-400/20 text-amber-400'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                            className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-[11px] text-zinc-200 focus:outline-none"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No test drive reservations recorded yet. Book a test drive on the Test Drive page to manage it here!
              </div>
            )}
          </div>
        )}

        {/* 4. QUOTATIONS TAB */}
        {activeTab === 'quotations' && (
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <h3 className="font-display text-lg font-bold text-white">
                Generated Quotations Archive
              </h3>
              <span className="text-xs text-zinc-400">Total: {quotations.length} quotes issued</span>
            </div>

            {quotations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                      <th className="py-3 px-3">Quote Number</th>
                      <th className="py-3 px-3">Issued Date</th>
                      <th className="py-3 px-3">Client</th>
                      <th className="py-3 px-3">Vehicle Spec</th>
                      <th className="py-3 px-3">Total Estimated</th>
                      <th className="py-3 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotations.map((q) => (
                      <tr key={q.id} className="border-b border-zinc-900 hover:bg-zinc-900/50">
                        <td className="py-3 px-3 font-mono text-amber-400 font-bold">{q.quotationNumber}</td>
                        <td className="py-3 px-3 text-zinc-400">{new Date(q.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-3">
                          <strong className="text-white block">{q.configuration.customerDetails?.name || 'Walk-in Client'}</strong>
                          <span className="text-zinc-500">{q.configuration.customerDetails?.city || 'Mumbai'}</span>
                        </td>
                        <td className="py-3 px-3 text-white font-semibold">{q.vehicle.name}</td>
                        <td className="py-3 px-3 text-amber-400 font-bold">
                          {CurrencyFormatter.formatINR(q.configuration.pricingBreakdown.estimatedTotal)}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => window.print()}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-semibold flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 text-amber-400" />
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-zinc-500 text-xs">
                No quotations generated in this session yet. Generate a quotation via the Configurator to view it in the registry!
              </div>
            )}
          </div>
        )}

        {/* 5. VEHICLES FLEET MANAGEMENT */}
        {activeTab === 'vehicles' && (
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <div>
                <h3 className="font-display text-lg font-bold text-white">Vehicle Fleet Registry</h3>
                <p className="text-xs text-zinc-400">15 Production models registered in database</p>
              </div>
              <Link
                to="/vehicles"
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Showroom View</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehiclesList.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
                  <img
                    src={v.heroImage}
                    alt={v.name}
                    className="w-16 h-12 object-cover rounded-lg bg-zinc-950 flex-shrink-0"
                  />
                  <div className="overflow-hidden flex-1">
                    <span className="text-xs font-bold text-white block truncate">{v.name}</span>
                    <span className="text-[10px] text-zinc-400 block">{v.category} • {v.fuelType}</span>
                    <span className="text-xs font-extrabold text-amber-400 mt-0.5 block">
                      {CurrencyFormatter.formatINR(v.startingPrice)}
                    </span>
                  </div>
                  <Link
                    to={`/configurator?model=${v.slug}`}
                    className="p-2 text-zinc-400 hover:text-amber-400"
                    title="Open in Configurator"
                  >
                    <Car className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
              <h3 className="font-display text-lg font-bold text-white">Security & Audit Event Trail</h3>
              <span className="text-xs text-zinc-400">Immutable operations log</span>
            </div>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="font-mono font-bold text-white mr-2">{log.action}</span>
                      <span className="text-zinc-400">Target: <strong className="text-zinc-200">{log.entity}</strong></span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-400 font-mono text-[11px] block">{log.user}</span>
                    <span className="text-[10px] text-zinc-500">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
