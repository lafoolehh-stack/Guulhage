
import React, { useState } from 'react';
import { Reel } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
  onAdminUpdateUser: (userId: string, action: 'GIVE_PRO' | 'VERIFY_CONSULTANT' | 'RESET_STREAK') => void;
  onAddReel: (reel: Reel) => void;
}

type AdminSubView = 'dashboard' | 'users' | 'reels' | 'consultants' | 'payments';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onAdminUpdateUser, onAddReel }) => {
  const [activeTab, setActiveTab] = useState<AdminSubView>('dashboard');
  
  // Reels Upload State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Users Management State
  const [searchUser, setSearchUser] = useState('');
  const [mockUsers, setMockUsers] = useState([
    { id: 'curr-user', name: 'Nur Admin', isPro: true, streak: 45, isVerified: true },
    { id: 'user-456', name: 'Abdi Hassan', isPro: false, streak: 5, isVerified: false },
    { id: 'user-789', name: 'Zahra Cali', isPro: true, streak: 12, isVerified: false },
  ]);

  // Consultants State
  const [pendingConsultants, setPendingConsultants] = useState([
    { id: 'id123', name: 'Nur Abdi Jim’ale', expertise: 'Investment', status: 'Pending' },
    { id: 'id124', name: 'Sahra Cali', expertise: 'Mindset', status: 'Pending' },
  ]);

  const stats = {
    totalUsers: 12450,
    revenue: 4200,
    activePro: 1200,
    conversions: '9.4%'
  };

  const handleUploadVideo = async () => {
    if (!videoTitle.trim()) return alert("Fadlan geli cinwaanka muuqaalka.");
    
    setIsUploading(true);
    
    // Simulate Video Upload to Firebase Storage and metadata to Firestore
    // Reference from user request: await db.collection('reels').add({ ... })
    setTimeout(() => {
      const newReel: Reel = {
        id: `reel-${Date.now()}`,
        lawTitle: videoTitle,
        description: videoDesc,
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        likes: '0',
        comments: '0',
        createdAt: new Date().toISOString(),
        xpValue: 50
      };
      
      onAddReel(newReel);
      setIsUploading(false);
      setVideoTitle('');
      setVideoDesc('');
      alert("Muuqaalka waa la baahiyay! (Firestore metadata updated)");
    }, 2000);
  };

  const handleVerifyConsultant = (id: string) => {
    // Simulating db.collection('users').doc(id).update({ isVerified: true, ... })
    setPendingConsultants(prev => prev.filter(c => c.id !== id));
    onAdminUpdateUser(id, 'VERIFY_CONSULTANT');
  };

  const handleUserAction = (userId: string, action: 'GIVE_PRO' | 'RESET_STREAK') => {
    setMockUsers(prev => prev.map(u => {
      if (u.id === userId) {
        if (action === 'GIVE_PRO') return { ...u, isPro: true };
        if (action === 'RESET_STREAK') return { ...u, streak: 0 };
      }
      return u;
    }));
    onAdminUpdateUser(userId, action);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans animate-fade-in">
      {/* Sidebar Nav */}
      <div className="w-64 bg-gray-900 p-8 border-r border-gray-800 flex flex-col sticky top-0 h-screen">
        <div className="mb-12">
          <h1 className="text-2xl font-black text-yellow-500 italic tracking-tighter">GUULHAGE ADMIN</h1>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-1">Control Center v2.5</p>
        </div>
        
        <nav className="space-y-2 flex-1">
          <AdminNavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="fa-chart-line" label="Dashboard" />
          <AdminNavItem active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon="fa-users" label="Users Manager" />
          <AdminNavItem active={activeTab === 'reels'} onClick={() => setActiveTab('reels')} icon="fa-play-circle" label="Reels/Video Upload" />
          <AdminNavItem active={activeTab === 'consultants'} onClick={() => setActiveTab('consultants')} icon="fa-user-tie" label="Consultants" />
          <AdminNavItem active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} icon="fa-credit-card" label="Payments" />
        </nav>

        <button onClick={onBack} className="mt-auto p-4 bg-gray-800 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all flex items-center gap-3 text-xs font-black uppercase tracking-widest">
          <i className="fas fa-arrow-left"></i> App Mode
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            {activeTab.toUpperCase()} PANEL
          </h2>
          <div className="bg-green-500/10 text-green-500 text-[10px] font-black px-4 py-2 rounded-full border border-green-500/20 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SERVER STABLE
          </div>
        </header>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} sub="+124 today" />
          <StatCard label="Revenue" value={`$${stats.revenue.toLocaleString()}`} sub="MTN / E-Dahab" color="text-green-500" />
          <StatCard label="Active Pro" value={stats.activePro.toLocaleString()} sub="Premium" color="text-yellow-500" />
          <StatCard label="Conversions" value={stats.conversions} sub="Target 12%" />
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
             <div className="lg:col-span-2 bg-gray-900 p-8 rounded-[2.5rem] border border-gray-800 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-yellow-500 italic">Recent System Activity</h3>
                <div className="space-y-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-950 rounded-2xl border border-gray-800 text-xs text-gray-400 hover:border-gray-600 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${i % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                      <p>User <strong>ID-{4567 + i}</strong> {i % 2 === 0 ? 'purchased Yearly Premium' : 'completed Law 9'}.</p>
                      <span className="ml-auto opacity-30">{i*3}m ago</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="space-y-10">
                <div className="bg-gray-800 p-8 rounded-[2.5rem] border border-gray-700 flex flex-col items-center justify-center text-center">
                  <i className="fas fa-shield-halved text-5xl text-gray-600 mb-4"></i>
                  <h3 className="text-lg font-black uppercase tracking-tighter mb-2">Security Hub</h3>
                  <p className="text-xs text-gray-500 font-medium mb-6">No unauthorized access attempts detected in the last 24 hours.</p>
                  <button className="px-8 py-3 bg-gray-900 border border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-white transition-all">Run Full Audit</button>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-transparent p-8 rounded-[2.5rem] border border-yellow-500/20">
                  <h3 className="text-lg font-black text-yellow-500 italic uppercase tracking-tighter mb-4">Quick Tip</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium italic">"Macaamiisha leh PRO status waxay 3x ka badan yihiin kuwa kale dhanka isticmaalka Shorts-ka."</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-900 p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h3 className="text-xl font-bold text-white italic">Manage Users Directory</h3>
              <div className="relative w-full md:w-64">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"></i>
                <input 
                  type="text" 
                  placeholder="Search by name or ID..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-2 text-xs text-white focus:border-yellow-500 outline-none"
                  value={searchUser}
                  onChange={e => setSearchUser(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-800">
                    <th className="pb-4">User Identity</th>
                    <th className="pb-4">Membership Status</th>
                    <th className="pb-4">Daily Streak</th>
                    <th className="pb-4 text-right">Admin Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {mockUsers.filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase())).map(user => (
                    <tr key={user.id} className="group hover:bg-white/5 transition-all">
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                            <i className="fas fa-user"></i>
                          </div>
                          <div>
                            <p className="font-bold text-sm text-white">{user.name}</p>
                            <p className="text-[10px] text-gray-600 font-mono">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center gap-2">
                           <span className={`text-[9px] font-black px-2 py-0.5 rounded ${user.isPro ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-gray-500'}`}>
                             {user.isPro ? 'MASTERY PRO' : 'STANDARD'}
                           </span>
                           {user.isVerified && <i className="fas fa-check-circle text-blue-500 text-xs"></i>}
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="font-black italic text-orange-500 flex items-center gap-1">
                          {user.streak} <i className="fas fa-fire-flame-curved text-xs"></i>
                        </span>
                      </td>
                      <td className="py-5 text-right space-x-2">
                        <button 
                          onClick={() => handleUserAction(user.id, 'GIVE_PRO')} 
                          disabled={user.isPro}
                          className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition-all text-[10px] font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          GIVE PRO
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, 'RESET_STREAK')} 
                          className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase"
                        >
                          RESET STREAK
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reels' && (
          <div className="max-w-3xl bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 shadow-2xl">
            <h3 className="text-2xl font-black text-yellow-500 italic mb-8 uppercase tracking-tighter">Publish New Success Reel</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Video Title (e.g. Qaanuunka 10aad)</label>
                  <input 
                    type="text" 
                    placeholder="Geli cinwaanka..." 
                    className="w-full bg-gray-800 p-4 rounded-xl border border-gray-700 outline-none focus:border-yellow-500 transition-all font-bold text-white placeholder:text-gray-600"
                    value={videoTitle}
                    onChange={e => setVideoTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Video Content (MP4/90 Sec)</label>
                  <div className="relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full bg-gray-800 p-3.5 rounded-xl border border-gray-700 text-xs text-gray-500 flex items-center gap-3">
                      <i className="fas fa-file-video text-yellow-500"></i>
                      <span>Choose local file...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Description & XP Value</label>
                <textarea 
                  placeholder="Describe the lesson in Somali..." 
                  className="w-full bg-gray-800 p-4 rounded-xl border border-gray-700 outline-none h-40 resize-none focus:border-yellow-500 transition-all font-medium text-sm text-white placeholder:text-gray-600"
                  value={videoDesc}
                  onChange={e => setVideoDesc(e.target.value)}
                ></textarea>
              </div>
              <button 
                onClick={handleUploadVideo}
                disabled={isUploading}
                className="w-full bg-yellow-500 text-black font-black py-5 rounded-2xl hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-500/20 uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i> UPLOADING TO STORAGE...
                  </>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt"></i> PUBLISH TO LIVE FEED
                  </>
                )}
              </button>
            </div>
            <p className="mt-6 text-[10px] text-center text-gray-600 font-bold uppercase tracking-widest">Muuqaalku wuxuu dhex muuqan doonaa qaybta Shorts-ka (Simulated Firestore Upload).</p>
          </div>
        )}

        {activeTab === 'consultants' && (
          <div className="bg-gray-900 p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl">
            <h3 className="text-xl font-bold mb-8 text-blue-500 italic flex items-center gap-3">
              <i className="fas fa-shield-check"></i> Pending Consultant Verifications
            </h3>
            <table className="w-full text-left">
                <thead>
                    <tr className="text-gray-500 text-[10px] font-black uppercase border-b border-gray-800">
                        <th className="pb-6">Expert Name</th>
                        <th className="pb-6">Area of Expertise</th>
                        <th className="pb-6">Application Status</th>
                        <th className="pb-6 text-right">Administrative Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {pendingConsultants.length > 0 ? pendingConsultants.map(c => (
                      <tr key={c.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-all group">
                        <td className="py-6 font-black italic uppercase tracking-tight text-white">{c.name}</td>
                        <td className="py-6 text-gray-400 font-bold">{c.expertise}</td>
                        <td className="py-6">
                          <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                            {c.status}
                          </span>
                        </td>
                        <td className="py-6 text-right">
                            <button 
                              onClick={() => handleVerifyConsultant(c.id)}
                              className="bg-blue-500/10 text-blue-500 px-6 py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-blue-500 hover:text-white transition-all border border-blue-500/20 shadow-lg"
                            >
                              Verify & Give Badge
                            </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-gray-600 font-bold uppercase tracking-widest italic">Ma jiraan codsiyo cusub hadda.</td>
                      </tr>
                    )}
                </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payments' && (
           <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 text-center flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 text-3xl">
                <i className="fas fa-receipt"></i>
              </div>
              <div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Finance Logs (MTN/E-Dahab)</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-2">Diiwaanka lacagaha lagu bixiyo WaafiPay ama E-Dahab. Kaliya xubnaha Admin-ka ayaa arki kara.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                 <div className="p-6 bg-gray-800 rounded-3xl border border-gray-700">
                    <span className="block text-[10px] text-gray-500 font-black uppercase mb-1">Weekly Growth</span>
                    <span className="text-xl font-black text-green-500">+18.5%</span>
                 </div>
                 <div className="p-6 bg-gray-800 rounded-3xl border border-gray-700">
                    <span className="block text-[10px] text-gray-500 font-black uppercase mb-1">Average Ticket</span>
                    <span className="text-xl font-black text-yellow-500">$12.40</span>
                 </div>
              </div>
              <button className="px-10 py-4 bg-gray-800 text-gray-400 font-black uppercase tracking-widest text-xs rounded-2xl border border-gray-700 hover:bg-white hover:text-black transition-all">
                Export Financial Report (.CSV)
              </button>
           </div>
        )}
      </div>
    </div>
  );
};

const AdminNavItem: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
      active 
        ? 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20' 
        : 'text-gray-500 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-black/10 text-black' : 'bg-gray-800 text-yellow-500'}`}>
      <i className={`fas ${icon} text-lg`}></i>
    </div>
    <span className="text-xs font-black italic uppercase tracking-widest">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 bg-black rounded-full"></div>}
  </button>
);

const StatCard: React.FC<{ label: string; value: string; sub: string; color?: string }> = ({ label, value, sub, color = "text-white" }) => (
  <div className="bg-gray-900 p-6 rounded-[2rem] border border-gray-800 shadow-xl hover:border-gray-700 transition-all group">
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{label}</p>
    <h2 className={`text-3xl font-black italic tracking-tighter mb-1 ${color}`}>{value}</h2>
    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{sub}</p>
  </div>
);

export default AdminDashboard;
