import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VEHICLES_DATA } from '../data/vehiclesData';
import { 
  BookingService, 
  EnquiryService, 
  ConfiguratorService, 
  CurrencyFormatter 
} from '../services/api';
import { TestDriveBooking, CustomerEnquiry, Quotation } from '../types/vehicle';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'bookings' | 'quotations' | 'audit'>('overview');

  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [bookings, setBookings] = useState<TestDriveBooking[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  const [auditLogs, setAuditLogs] = useState<{ id: string; user: string; action: string; entity: string; time: string }[]>([
    { id: 'log-1', user: 'admin_sys', action: 'BOOT_SYSTEM', entity: 'REGISTRY', time: '12m ago' },
    { id: 'log-2', user: 'sales_dir', action: 'STATUS_DISPATCH', entity: 'ENQUIRY_#104', time: '28m ago' },
    { id: 'log-3', user: 'admin_sys', action: 'CATALOG_SYNC', entity: '15_MODELS', time: '1h ago' }
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
    setAuditLogs((prev) => [
      { id: `log-${Date.now()}`, user: user?.username || 'admin', action: `BOOKING_${status}`, entity: `ID_${id}`, time: 'Just now' },
      ...prev
    ]);
  };

  const handleUpdateEnquiryStatus = async (id: string, status: CustomerEnquiry['status']) => {
    await EnquiryService.updateEnquiryStatus(id, status);
    const updated = await EnquiryService.getEnquiries();
    setEnquiries(updated);
    setAuditLogs((prev) => [
      { id: `log-${Date.now()}`, user: user?.username || 'admin', action: `ENQUIRY_${status}`, entity: `ID_${id}`, time: 'Just now' },
      ...prev
    ]);
  };

  const monthlyData = [
    { month: 'JAN', quotes: 65, enquiries: 42, testDrives: 28 },
    { month: 'FEB', quotes: 82, enquiries: 58, testDrives: 35 },
    { month: 'MAR', quotes: 110, enquiries: 74, testDrives: 46 },
    { month: 'APR', quotes: 145, enquiries: 92, testDrives: 62 },
    { month: 'MAY', quotes: 190, enquiries: 115, testDrives: 84 },
    { month: 'JUN', quotes: 230, enquiries: 138, testDrives: 95 },
  ];

  const popularityData = [
    { name: 'Aero X', value: 45, color: '#0055ff' },
    { name: 'Phantom GT', value: 28, color: '#f4f4f6' },
    { name: 'Apex SUV', value: 35, color: '#64748b' },
    { name: 'CyberTrack', value: 30, color: '#282c37' }
  ];

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f6] py-12 px-6 lg:px-12 font-mono">
      <div className="max-w-[1520px] mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-8 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0055ff]" />
              <span className="text-xs uppercase tracking-meta text-[#0055ff]">AUTOBOT // CONTROL TERMINAL</span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl tracking-poster uppercase text-white mt-1">
              COMMAND CENTER<span className="text-[#0055ff]">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-zinc-500 uppercase tracking-technical">
              ACTOR: <strong className="text-white">{user?.username || 'SUPER_ADMIN'}</strong>
            </span>
            <button
              onClick={logout}
              className="text-[#0055ff] hover:underline uppercase tracking-technical"
            >
              [TERMINATE SESSION]
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5 mb-8 text-xs">
          {[
            { id: 'overview', label: '01 / METRICS & CHARTS' },
            { id: 'enquiries', label: `02 / ENQUIRIES (${enquiries.length})` },
            { id: 'bookings', label: `03 / TEST DRIVES (${bookings.length})` },
            { id: 'quotations', label: `04 / QUOTATIONS (${quotations.length})` },
            { id: 'audit', label: '05 / AUDIT LOGS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 uppercase tracking-technical transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-black font-bold'
                  : 'text-zinc-400 hover:text-white hairline-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 bg-[#0f1014] hairline-border">
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block mb-1">REGISTERED MODELS</span>
                <span className="font-display font-black text-3xl text-white block">15</span>
                <span className="text-[10px] text-[#0055ff]">100% IN DATABASE</span>
              </div>

              <div className="p-6 bg-[#0f1014] hairline-border">
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block mb-1">TOTAL ENQUIRIES</span>
                <span className="font-display font-black text-3xl text-white block">{enquiries.length + 138}</span>
                <span className="text-[10px] text-zinc-400">ACTIVE CLIENT INTEREST</span>
              </div>

              <div className="p-6 bg-[#0f1014] hairline-border">
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block mb-1">TEST DRIVES</span>
                <span className="font-display font-black text-3xl text-white block">{bookings.length + 95}</span>
                <span className="text-[10px] text-zinc-400">TRACK APPOINTMENTS</span>
              </div>

              <div className="p-6 bg-[#0f1014] hairline-border">
                <span className="text-zinc-500 uppercase tracking-meta text-[10px] block mb-1">QUOTES GENERATED</span>
                <span className="font-display font-black text-3xl text-[#0055ff] block">{quotations.length + 230}</span>
                <span className="text-[10px] text-zinc-400">PIPELINE DOSSIERS</span>
              </div>
            </div>

            {/* Recharts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 p-6 bg-[#0f1014] hairline-border">
                <div className="flex justify-between items-baseline pb-4 border-b border-white/5 mb-6 text-xs">
                  <span className="uppercase tracking-meta text-white font-bold">MONTHLY PIPELINE THROUGHPUT</span>
                  <span className="text-zinc-500">2026 ARCHIVE</span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                      <YAxis stroke="#64748b" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#090a0c', borderColor: '#282c37', fontSize: '11px' }} />
                      <Bar dataKey="quotes" name="Quotations" fill="#0055ff" />
                      <Bar dataKey="enquiries" name="Enquiries" fill="#f4f4f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 bg-[#0f1014] hairline-border flex flex-col justify-between">
                <div>
                  <div className="pb-4 border-b border-white/5 mb-4 text-xs font-bold text-white uppercase tracking-meta">
                    MODEL VOLUME SHARE
                  </div>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={popularityData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65}>
                          {popularityData.map((e, i) => (
                            <Cell key={`cell-${i}`} fill={e.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#090a0c', borderColor: '#282c37', fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-1 text-xs border-t border-white/5 pt-3">
                  {popularityData.map((p) => (
                    <div key={p.name} className="flex justify-between text-zinc-400">
                      <span>{p.name}</span>
                      <span className="text-white font-bold">{p.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="p-6 bg-[#0f1014] hairline-border">
            <h3 className="font-bold text-sm text-white uppercase tracking-meta mb-4 pb-2 border-b border-white/5">
              CUSTOMER ENQUIRIES ARCHIVE
            </h3>
            {enquiries.length > 0 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px]">
                    <th className="py-3">CLIENT</th>
                    <th className="py-3">VEHICLE</th>
                    <th className="py-3">CITY</th>
                    <th className="py-3">CHANNEL</th>
                    <th className="py-3">STATUS</th>
                    <th className="py-3">UPDATE</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="border-b border-white/5">
                      <td className="py-3">
                        <strong className="text-white block">{enq.fullName}</strong>
                        <span className="text-zinc-500">{enq.phone} • {enq.email}</span>
                      </td>
                      <td className="py-3 text-[#0055ff]">{enq.vehicleName}</td>
                      <td className="py-3 text-zinc-300">{enq.city}</td>
                      <td className="py-3 text-zinc-400">{enq.preferredContactMethod}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-white/5 text-white hairline-border">
                          {enq.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as any)}
                          className="px-2 py-1 bg-[#090a0c] hairline-border text-white text-[11px]"
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
            ) : (
              <div className="py-8 text-center text-zinc-500 text-xs">NO ENQUIRIES LOGGED IN SESSION.</div>
            )}
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="p-6 bg-[#0f1014] hairline-border">
            <h3 className="font-bold text-sm text-white uppercase tracking-meta mb-4 pb-2 border-b border-white/5">
              TEST DRIVE RESERVATIONS
            </h3>
            {bookings.length > 0 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px]">
                    <th className="py-3">CLIENT</th>
                    <th className="py-3">VEHICLE</th>
                    <th className="py-3">DATE / TIME</th>
                    <th className="py-3">SHOWROOM</th>
                    <th className="py-3">STATUS</th>
                    <th className="py-3">UPDATE</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/5">
                      <td className="py-3">
                        <strong className="text-white block">{b.customerName}</strong>
                        <span className="text-zinc-500">{b.customerPhone}</span>
                      </td>
                      <td className="py-3 text-[#0055ff]">{b.vehicleName}</td>
                      <td className="py-3 text-zinc-300">{b.preferredDate} ({b.preferredTimeSlot})</td>
                      <td className="py-3 text-zinc-400">{b.showroomLocation}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-white/5 text-white hairline-border">
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                          className="px-2 py-1 bg-[#090a0c] hairline-border text-white text-[11px]"
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
            ) : (
              <div className="py-8 text-center text-zinc-500 text-xs">NO TEST DRIVES RECORDED IN SESSION.</div>
            )}
          </div>
        )}

        {/* QUOTATIONS TAB */}
        {activeTab === 'quotations' && (
          <div className="p-6 bg-[#0f1014] hairline-border">
            <h3 className="font-bold text-sm text-white uppercase tracking-meta mb-4 pb-2 border-b border-white/5">
              OFFICIAL QUOTATION DOSSIERS
            </h3>
            {quotations.length > 0 ? (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-500 uppercase text-[10px]">
                    <th className="py-3">QUOTE NO.</th>
                    <th className="py-3">CLIENT</th>
                    <th className="py-3">VEHICLE</th>
                    <th className="py-3">TOTAL</th>
                    <th className="py-3">EXPORT</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((q) => (
                    <tr key={q.id} className="border-b border-white/5">
                      <td className="py-3 text-[#0055ff] font-bold">{q.quotationNumber}</td>
                      <td className="py-3 text-white">{q.configuration.customerDetails?.name || 'Client'}</td>
                      <td className="py-3 text-zinc-300">{q.vehicle.name}</td>
                      <td className="py-3 text-white font-bold">
                        {CurrencyFormatter.formatINR(q.configuration.pricingBreakdown.estimatedTotal)}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => window.print()}
                          className="px-2.5 py-1 text-[11px] uppercase hairline-border text-zinc-300 hover:text-white flex items-center gap-1"
                        >
                          <Download className="w-3 h-3 text-[#0055ff]" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-8 text-center text-zinc-500 text-xs">NO QUOTATIONS ISSUED IN SESSION.</div>
            )}
          </div>
        )}

        {/* AUDIT LOG TAB */}
        {activeTab === 'audit' && (
          <div className="p-6 bg-[#0f1014] hairline-border space-y-2">
            <h3 className="font-bold text-sm text-white uppercase tracking-meta mb-4 pb-2 border-b border-white/5">
              IMMUTABLE AUDIT TRAIL
            </h3>
            {auditLogs.map((log) => (
              <div key={log.id} className="flex justify-between py-2 border-b border-white/5 text-xs text-zinc-400">
                <div>
                  <span className="text-[#0055ff] font-bold mr-2">{log.action}</span>
                  <span className="text-zinc-500">ENTITY: {log.entity}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white">{log.user}</span>
                  <span className="text-zinc-600">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
