'use client';

import React, { useState, useEffect } from 'react';
import { mockShowcases, ShowcaseItem } from '../../lib/mockData';
import {
  loginAdmin,
  logoutAdmin,
  getAdminAnalytics,
  getAdminShowcases,
  createShowcase,
  updateShowcase,
  deleteShowcase,
  getAdminLeads,
  updateLeadStatus,
  deleteLead,
  getAdminSeoPaths,
  updateSeoPath
} from '../../lib/api';
import {
  LayoutDashboard,
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  Mail,
  ArrowRight,
  Globe,
  FileSpreadsheet,
  PlusCircle,
  X,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [loginEmail, setLoginEmail] = useState('admin@thesoftwareguys.com');
  const [loginPassword, setLoginPassword] = useState('secure-super-brutal-admin-pass-2026');
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Connection mode indicator
  const [isApiSandbox, setIsApiSandbox] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Active workspace tab
  const [activeTab, setActiveTab] = useState<'overview' | 'showcases' | 'leads' | 'seo'>('overview');

  // Leads list state
  const [leads, setLeads] = useState<any[]>([
    {
      id: 'lead-1',
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sjenkins@nexus-corp.com',
      projectType: 'saas',
      message: 'Looking for a high-performance telemetry dashboard using NestJS backend monolith and Neon PostgreSQL. Need complete STRIDE modeling.',
      status: 'PENDING',
      createdAt: '2026-05-20',
    },
    {
      id: 'lead-2',
      firstName: 'Yousef',
      lastName: 'Al-Mansoori',
      email: 'yousef@riyadh-logis.sa',
      projectType: 'mobile',
      message: 'تطبيق هاتف مع تتبع مباشر للخرائط ودعم كامل للغة العربية. الميزانية ممتازة والجدول الزمني مضغوط.',
      status: 'REVIEWED',
      createdAt: '2026-05-19',
    },
    {
      id: 'lead-3',
      firstName: 'Marcus',
      lastName: 'Vance',
      email: 'm.vance@electric-foundry.com',
      projectType: 'design',
      message: 'Need a unified brutalist theme platform extracted directly from our custom Stitch prototypes.',
      status: 'CONTACTED',
      createdAt: '2026-05-18',
    }
  ]);

  // Showcase state (local or dynamic CRUD)
  const [showcaseList, setShowcaseList] = useState<any[]>(mockShowcases);
  const [isEditingShowcase, setIsEditingShowcase] = useState(false);
  const [currentShowcase, setCurrentShowcase] = useState<Partial<any>>({});

  // SEO metadata tracker state
  const [seoList, setSeoList] = useState<any[]>([
    { path: '/', metaTitle: 'The Software Guys | Custom SaaS & Monolith backends', metaDescription: 'Production-ready Neo-Brutalist SaaS development with Neon PostgreSQL database connections.', isOptimized: true },
    { path: '/services', metaTitle: 'Engineering Services | NestJS Modular Monolith Pipelines', metaDescription: 'We build database triggers, class DTO inputs validation, and STRIDE security systems.', isOptimized: true },
    { path: '/showcases', metaTitle: 'Enterprise Portfolios | Shipped Systems Live in Production', metaDescription: 'See our high-performance bilingual SaaS telemetry platforms, mobile layouts, and OSS CLI tools.', isOptimized: false },
    { path: '/contact', metaTitle: 'Let\'s Discuss | Connect Direct with Lead Engineers', metaDescription: 'Transmit your project specifications directly to our senior developer guys.', isOptimized: true }
  ]);

  // Analytics Aggregation State
  const [analytics, setAnalytics] = useState({
    totalLeads: 3,
    pendingLeads: 1,
    totalShowcases: 4,
    featuredShowcases: 2,
    newsletterSubscribers: 0,
  });

  const [newPath, setNewPath] = useState('');
  const [newSeoTitle, setNewSeoTitle] = useState('');
  const [newSeoDesc, setNewSeoDesc] = useState('');

  // Load secure active session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('tsg_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      loadAllData(savedToken);
    }
  }, []);

  const loadAllData = async (activeToken: string) => {
    setIsLoadingData(true);
    try {
      // 1. Fetch Analytics
      const stats = await getAdminAnalytics(activeToken);
      setAnalytics(stats);

      // 2. Fetch Showcases
      const showcases = await getAdminShowcases(activeToken);
      setShowcaseList(showcases);

      // 3. Fetch Leads
      const leadsList = await getAdminLeads(activeToken);
      setLeads(leadsList);

      // 4. Fetch SEO
      const seoItems = await getAdminSeoPaths(activeToken);
      setSeoList(seoItems);

      setIsApiSandbox(false);
    } catch (err) {
      console.warn('Backend API connection failed, continuing in static sandbox mode:', err);
      setIsApiSandbox(true);
      // Keep static local state hydrated
    } finally {
      setIsLoadingData(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmittingAuth(true);

    try {
      const res = await loginAdmin({ email: loginEmail, password: loginPassword });
      if (res && res.token) {
        localStorage.setItem('tsg_admin_token', res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        loadAllData(res.token);
      } else {
        setAuthError('Authentication rejected. Token missing.');
      }
    } catch (err: any) {
      console.warn('API authentication failed, checking static fallback rules:', err);
      if (loginEmail === 'admin@thesoftwareguys.com' && loginPassword === 'secure-super-brutal-admin-pass-2026') {
        setIsLoggedIn(true);
        setIsApiSandbox(true);
        setToken('sandbox-mock-jwt-token-2026');
      } else {
        setAuthError(err.message || 'Invalid credentials. Access Denied.');
      }
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      if (token && !isApiSandbox) {
        await logoutAdmin(token);
      }
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      localStorage.removeItem('tsg_admin_token');
      setToken('');
      setIsLoggedIn(false);
    }
  };

  // Change lead status
  const handleLeadStatusChange = async (id: string, newStatus: string) => {
    // Optimistically update UI state
    setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
    if (isApiSandbox) return;

    try {
      await updateLeadStatus(token, id, newStatus);
      // Reload analytics to update pending count
      const stats = await getAdminAnalytics(token);
      setAnalytics(stats);
    } catch (err) {
      console.error('Failed to update lead status on database:', err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    if (isApiSandbox) return;

    try {
      await deleteLead(token, id);
      const stats = await getAdminAnalytics(token);
      setAnalytics(stats);
    } catch (err) {
      console.error('Failed to delete lead from database:', err);
    }
  };

  // Open Add Showcase Form
  const openAddShowcase = () => {
    setCurrentShowcase({
      title: '',
      subtitle: '',
      slug: '',
      description: '',
      category: 'saas',
      clientName: '',
      projectUrl: '',
      mainImage: '',
      isFeatured: false,
      isPublished: true,
      technologies: [],
      breakdown: '',
      testimonial: { quote: '', author: '', role: '' }
    });
    setIsEditingShowcase(true);
  };

  // Open Edit Showcase Form
  const openEditShowcase = (item: any) => {
    // Map backend relational properties to standard flat inputs safely
    const formattedTechs = item.technologies ? item.technologies.map((t: any) => t.name || t) : [];
    setCurrentShowcase({
      ...item,
      technologies: formattedTechs
    });
    setIsEditingShowcase(true);
  };

  // Delete Showcase
  const handleDeleteShowcase = async (id: string) => {
    setShowcaseList(showcaseList.filter(item => item.id !== id));
    if (isApiSandbox) return;

    try {
      await deleteShowcase(token, id);
      const stats = await getAdminAnalytics(token);
      setAnalytics(stats);
    } catch (err) {
      console.error('Failed to delete showcase from database:', err);
    }
  };

  // Save Showcase CRUD Form
  const handleSaveShowcase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentShowcase) return;

    const slugified = currentShowcase.slug || currentShowcase.title?.toLowerCase().replace(/ /g, '-') || 'showcase-slug';

    // Prepare standard object
    const rawShowcaseData = {
      title: currentShowcase.title || 'New Project Title',
      subtitle: currentShowcase.subtitle || 'System Subtitle',
      slug: slugified,
      description: currentShowcase.description || 'System detailed summary',
      category: currentShowcase.category || 'saas',
      clientName: currentShowcase.clientName || 'Client Name',
      projectUrl: currentShowcase.projectUrl || 'https://example.com',
      mainImage: currentShowcase.mainImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      isFeatured: currentShowcase.isFeatured || false,
      isPublished: currentShowcase.isPublished ?? true,
      technologies: Array.isArray(currentShowcase.technologies) ? currentShowcase.technologies : [],
      breakdown: currentShowcase.breakdown || 'Architecture summary breakdown',
      testimonial: currentShowcase.testimonial || { quote: '', author: '', role: '' }
    };

    if (isApiSandbox) {
      // Local sandbox save
      const cleanShowcase = {
        ...rawShowcaseData,
        id: currentShowcase.id || `showcase-${Date.now()}`,
        categoryLabel: rawShowcaseData.category === 'saas' ? 'Custom SaaS Platform' :
                       rawShowcaseData.category === 'mobile' ? 'Mobile Application' :
                       rawShowcaseData.category === 'design' ? 'Design System & UX' : 'Developer Tooling',
      };
      if (currentShowcase.id) {
        setShowcaseList(showcaseList.map(item => item.id === cleanShowcase.id ? cleanShowcase : item));
      } else {
        setShowcaseList([cleanShowcase, ...showcaseList]);
      }
    } else {
      // Push to Live backend API
      try {
        if (currentShowcase.id) {
          await updateShowcase(token, currentShowcase.id, rawShowcaseData);
        } else {
          await createShowcase(token, rawShowcaseData);
        }
        await loadAllData(token);
      } catch (err) {
        console.error('Failed to submit showcase database transaction:', err);
      }
    }

    setIsEditingShowcase(false);
    setCurrentShowcase({});
  };

  // Add SEO path tracker
  const handleAddSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPath || !newSeoTitle || !newSeoDesc) return;

    const seoData = {
      path: newPath,
      metaTitle: newSeoTitle,
      metaDescription: newSeoDesc,
      isOptimized: true
    };

    if (isApiSandbox) {
      setSeoList([...seoList, seoData]);
    } else {
      try {
        await updateSeoPath(token, seoData);
        const seoItems = await getAdminSeoPaths(token);
        setSeoList(seoItems);
      } catch (err) {
        console.error('Failed to save SEO metadata path to database:', err);
      }
    }

    setNewPath('');
    setNewSeoTitle('');
    setNewSeoDesc('');
  };

  // Toggle optimization check on SEO
  const toggleSeoOptimization = async (path: string) => {
    const existing = seoList.find(s => s.path === path);
    if (!existing) return;

    const toggled = { ...existing, isOptimized: !existing.isOptimized };

    if (isApiSandbox) {
      setSeoList(seoList.map(item => item.path === path ? toggled : item));
    } else {
      try {
        await updateSeoPath(token, toggled);
        const seoItems = await getAdminSeoPaths(token);
        setSeoList(seoItems);
      } catch (err) {
        console.error('Failed to update path optimization status on database:', err);
      }
    }
  };

  // Render Login Page
  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[80vh] bg-brand-bg flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white border-[3px] border-brand-dark shadow-brutal p-8 text-start">
          <div className="flex flex-col gap-3 items-center text-center mb-8">
            <div className="bg-brand-primary text-white border-[3px] border-brand-dark px-3 py-1 font-black text-2xl tracking-tighter uppercase shadow-[3px_3px_0px_0px_#1A1C1C]">
              TSG ADMIN
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-brand-dark mt-2">
              ADMINISTRATIVE ACCESS LOCKOUT
            </h1>
            <p className="text-xs font-semibold text-brand-dark/50 leading-relaxed max-w-xs">
              Complete authentication below. Under constant STRIDE security monitoring.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-xs tracking-wider text-brand-dark">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3.5 border-[3px] border-brand-dark bg-brand-bg font-bold text-sm text-brand-dark placeholder-brand-dark/40 shadow-brutal-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#003EC7] transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-black uppercase text-xs tracking-wider text-brand-dark">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border-[3px] border-brand-dark bg-brand-bg font-bold text-sm text-brand-dark placeholder-brand-dark/40 shadow-brutal-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#003EC7] transition-all"
                />
              </div>
            </div>

            {authError && (
              <div className="border-[2px] border-brand-error-border bg-brand-error-bg text-brand-error-text px-4 py-3 font-bold text-xs uppercase text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full flex items-center justify-center gap-2 font-black uppercase border-[3px] border-brand-dark bg-brand-primary text-white py-3.5 shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#1A1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingAuth ? 'DECRYPTING LOCKOUT ACCESS...' : 'DECRYPT LOCKOUT ACCESS'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 border-t-[3px] border-brand-dark/10 pt-4 flex justify-between text-[9px] font-black text-brand-dark/40 uppercase">
            <span>AUDIT ORIGIN LOGGED</span>
            <span>SYSTEM CONTROL V1.0</span>
          </div>
        </div>
      </div>
    );
  }

  // Render Logged In Workspace
  return (
    <div className="w-full bg-brand-bg min-h-screen">
      {/* SECONDARY DASHBOARD HEADER */}
      <div className="bg-brand-dark text-white border-b-[4px] border-brand-dark px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-start">
        <div className="flex items-center gap-4">
          <div className="bg-brand-primary text-white border-[3px] border-white px-3 py-1 font-black text-xl tracking-tighter uppercase">
            TSG LOCKOUT
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter leading-none flex items-center gap-2">
              ADMIN CONTROL CENTER
              {isLoadingData && <span className="animate-ping h-2.5 w-2.5 rounded-full bg-brand-primary border border-white" />}
            </h1>
            <span className="text-[10px] font-bold text-brand-secondaryAlt uppercase tracking-wider">
              {isApiSandbox 
                ? 'DEMO SANDBOX ACTIVE // STATIC OFFLINE WORKSPACE MODE'
                : 'ESTABLISHED SECURE NEON SESSION // ROLE: SUPERADMIN // ADMIN@THESOFTWAREGUYS.COM'
              }
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="font-black uppercase text-xs border-[3px] border-white bg-transparent text-white px-5 py-2 hover:bg-white hover:text-brand-dark transition-all"
        >
          TERMINATE SECURE SESSION
        </button>
      </div>

      {isApiSandbox && (
        <div className="bg-brand-secondaryAlt border-b-[4px] border-brand-dark px-4 md:px-8 py-3.5 flex items-center gap-3 text-start font-black text-xs text-brand-dark uppercase">
          <AlertTriangle size={18} className="shrink-0" />
          <span>WARNING: API OFFLINE or DATABASE SANDBOXED. Synchronizing edits in localized state container.</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3 flex flex-col gap-3 text-start">
          <button
            onClick={() => { setActiveTab('overview'); setIsEditingShowcase(false); }}
            className={`w-full flex items-center gap-3 font-black uppercase text-xs tracking-wider border-[3px] border-brand-dark px-4 py-3.5 transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] ${
              activeTab === 'overview' ? 'bg-brand-primary text-white' : 'bg-white text-brand-dark'
            }`}
          >
            <LayoutDashboard size={16} />
            OVERVIEW INDEX
          </button>

          <button
            onClick={() => { setActiveTab('showcases'); setIsEditingShowcase(false); }}
            className={`w-full flex items-center gap-3 font-black uppercase text-xs tracking-wider border-[3px] border-brand-dark px-4 py-3.5 transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] ${
              activeTab === 'showcases' ? 'bg-brand-primary text-white' : 'bg-white text-brand-dark'
            }`}
          >
            <Briefcase size={16} />
            PROJECT CRUD MANAGER
          </button>

          <button
            onClick={() => { setActiveTab('leads'); setIsEditingShowcase(false); }}
            className={`w-full flex items-center gap-3 font-black uppercase text-xs tracking-wider border-[3px] border-brand-dark px-4 py-3.5 transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] ${
              activeTab === 'leads' ? 'bg-brand-primary text-white' : 'bg-white text-brand-dark'
            }`}
          >
            <Mail size={16} />
            CONTACT LEADS ({leads.length})
          </button>

          <button
            onClick={() => { setActiveTab('seo'); setIsEditingShowcase(false); }}
            className={`w-full flex items-center gap-3 font-black uppercase text-xs tracking-wider border-[3px] border-brand-dark px-4 py-3.5 transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] ${
              activeTab === 'seo' ? 'bg-brand-primary text-white' : 'bg-white text-brand-dark'
            }`}
          >
            <Globe size={16} />
            SEO METADATA TRACKER
          </button>
        </aside>

        {/* WORKSPACE WORK AREA */}
        <main className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8 text-start">
              {/* Analytics grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-brand-secondaryAlt border-[3px] border-brand-dark p-5 shadow-brutal flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-brand-dark/50">TOTAL INCOMING LEADS (PENDING: {analytics.pendingLeads})</span>
                  <span className="font-black text-4xl text-brand-dark">{leads.length}</span>
                </div>
                <div className="bg-blue-100 border-[3px] border-brand-dark p-5 shadow-brutal flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-brand-dark/50">ACTIVE SHOWCASES (FEATURED: {analytics.featuredShowcases})</span>
                  <span className="font-black text-4xl text-brand-dark">{showcaseList.length}</span>
                </div>
                <div className="bg-green-100 border-[3px] border-brand-dark p-5 shadow-brutal flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-brand-dark/50">NEWSLETTER SUBSCRIBERS / STATUS</span>
                  <span className="font-black text-4xl text-green-700 flex items-center gap-2">
                    {analytics.newsletterSubscribers} / <span className="text-lg text-green-700">100% OK</span>
                  </span>
                </div>
              </div>

              {/* Recent leads table */}
              <div className="bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal">
                <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark mb-6 border-b-[3px] border-brand-dark/10 pb-3 flex items-center justify-between">
                  <span>RECENT CONTACT INQUIRIES</span>
                  <span className="px-2 py-0.5 bg-brand-primary text-white font-mono text-[10px] font-bold">SECURE CHANNEL</span>
                </h2>

                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b-[3px] border-brand-dark font-black uppercase text-brand-dark/60 tracking-wider">
                        <th className="pb-3 pr-4 font-black">LEAD SENDER</th>
                        <th className="pb-3 px-4 font-black">DEVELOPER EMAIL</th>
                        <th className="pb-3 px-4 font-black">PROJECT TYPE</th>
                        <th className="pb-3 pl-4 font-black">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-[2px] divide-brand-dark/10 font-semibold text-brand-dark">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-brand-surface/40">
                          <td className="py-4 pr-4 font-black text-sm uppercase">{lead.firstName} {lead.lastName}</td>
                          <td className="py-4 px-4 font-mono">{lead.email}</td>
                          <td className="py-4 px-4 font-black text-[10px] uppercase">
                            <span className="px-2 py-0.5 border-[2px] border-brand-dark bg-brand-surface shadow-[1px_1px_0px_0px_#1A1C1C]">
                              {lead.projectType}
                            </span>
                          </td>
                          <td className="py-4 pl-4 font-black">
                            <span className={`px-2 py-0.5 border-[2px] border-brand-dark shadow-[1px_1px_0px_0px_#1A1C1C] ${
                              lead.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                              lead.status === 'REVIEWED' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO CRUD */}
          {activeTab === 'showcases' && (
            <div className="flex flex-col gap-6 text-start">
              {isEditingShowcase ? (
                /* CRUD FORM */
                <div className="bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal">
                  <div className="flex justify-between items-center border-b-[3px] border-brand-dark/10 pb-4 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark flex items-center gap-2">
                      <PlusCircle size={20} className="text-brand-primary" />
                      {currentShowcase?.id ? 'MODIFY ACTIVE SHOWCASE' : 'CONSTRUCT NEW SHOWCASE'}
                    </h2>
                    <button
                      onClick={() => setIsEditingShowcase(false)}
                      className="p-1 border-[2px] border-brand-dark bg-brand-surface shadow-[2px_2px_0px_0px_#1A1C1C]"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveShowcase} className="flex flex-col gap-5 text-xs font-semibold">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="flex flex-col gap-2">
                        <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Project Title</label>
                        <input
                          type="text"
                          required
                          value={currentShowcase?.title || ''}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, title: e.target.value })}
                          className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                        />
                      </div>
                      {/* Slug */}
                      <div className="flex flex-col gap-2">
                        <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Slug Path</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. nexus-analytics"
                          value={currentShowcase?.slug || ''}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, slug: e.target.value })}
                          className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Client Name */}
                      <div className="flex flex-col gap-2">
                        <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Client Corporate</label>
                        <input
                          type="text"
                          required
                          value={currentShowcase?.clientName || ''}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, clientName: e.target.value })}
                          className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                        />
                      </div>
                      {/* Live Demo url */}
                      <div className="flex flex-col gap-2">
                        <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Live Systems Demo URL</label>
                        <input
                          type="url"
                          required
                          value={currentShowcase?.projectUrl || ''}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, projectUrl: e.target.value })}
                          className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Category Selection */}
                      <div className="flex flex-col gap-2">
                        <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">System Category</label>
                        <select
                          value={currentShowcase?.category || 'saas'}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, category: e.target.value as ShowcaseItem['category'] })}
                          className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface font-black uppercase text-[10px] cursor-pointer"
                        >
                          <option value="saas">Custom SaaS Platform</option>
                          <option value="mobile">Mobile Application</option>
                          <option value="design">Design System & UX</option>
                          <option value="dev">Developer Tooling</option>
                        </select>
                      </div>

                      {/* Cover Image URL */}
                      <div className="flex flex-col gap-2">
                        <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Main Image Cover URL</label>
                        <input
                          type="text"
                          required
                          value={currentShowcase?.mainImage || ''}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, mainImage: e.target.value })}
                          className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className="flex flex-col gap-2">
                      <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Brief Catchy Subtitle</label>
                      <input
                        type="text"
                        required
                        value={currentShowcase?.subtitle || ''}
                        onChange={(e) => setCurrentShowcase({ ...currentShowcase, subtitle: e.target.value })}
                        className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                      <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Detailed Overview Description</label>
                      <textarea
                        required
                        rows={3}
                        value={currentShowcase?.description || ''}
                        onChange={(e) => setCurrentShowcase({ ...currentShowcase, description: e.target.value })}
                        className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none resize-none"
                      />
                    </div>

                    {/* Architecture breakdown */}
                    <div className="flex flex-col gap-2">
                      <label className="font-black uppercase text-[10px] tracking-wider text-brand-dark">Architecture & Relational Schema Breakdown</label>
                      <textarea
                        required
                        rows={4}
                        value={currentShowcase?.breakdown || ''}
                        onChange={(e) => setCurrentShowcase({ ...currentShowcase, breakdown: e.target.value })}
                        className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none resize-none"
                      />
                    </div>

                    {/* Testimonial details */}
                    <div className="border-[2px] border-brand-dark p-4 bg-brand-surface flex flex-col gap-3">
                      <span className="font-black uppercase text-[9px] text-brand-dark/50">INCORPORATED CLIENT TESTIMONY</span>
                      <div className="flex flex-col gap-2">
                        <label className="font-black text-[9px] uppercase">Quote</label>
                        <input
                          type="text"
                          required
                          value={currentShowcase.testimonial?.quote || ''}
                          onChange={(e) => setCurrentShowcase({
                            ...currentShowcase,
                            testimonial: {
                              quote: e.target.value,
                              author: currentShowcase.testimonial?.author || '',
                              role: currentShowcase.testimonial?.role || ''
                            }
                          })}
                          className="px-3 py-1.5 border-[2px] border-brand-dark bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-black text-[9px] uppercase">Author</label>
                          <input
                            type="text"
                            required
                            value={currentShowcase.testimonial?.author || ''}
                            onChange={(e) => setCurrentShowcase({
                              ...currentShowcase,
                              testimonial: {
                                quote: currentShowcase.testimonial?.quote || '',
                                author: e.target.value,
                                role: currentShowcase.testimonial?.role || ''
                              }
                            })}
                            className="px-3 py-1.5 border-[2px] border-brand-dark bg-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-black text-[9px] uppercase">Role</label>
                          <input
                            type="text"
                            required
                            value={currentShowcase.testimonial?.role || ''}
                            onChange={(e) => setCurrentShowcase({
                              ...currentShowcase,
                              testimonial: {
                                quote: currentShowcase.testimonial?.quote || '',
                                author: currentShowcase.testimonial?.author || '',
                                role: e.target.value
                              }
                            })}
                            className="px-3 py-1.5 border-[2px] border-brand-dark bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {/* Featured checkbox */}
                      <label className="flex items-center gap-2 font-black uppercase text-[10px] tracking-wider text-brand-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentShowcase?.isFeatured || false}
                          onChange={(e) => setCurrentShowcase({ ...currentShowcase, isFeatured: e.target.checked })}
                          className="w-4 h-4 border-[2px] border-brand-dark cursor-pointer bg-white"
                        />
                        Featured on Hero
                      </label>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 mt-2">
                      <button
                        type="submit"
                        className="flex-grow font-black uppercase text-xs border-[3px] border-brand-dark bg-brand-primary text-white py-3 shadow-[4px_4px_0px_0px_#1A1C1C]"
                      >
                        DEPOSIT CHANGES TO DATABASE
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingShowcase(false)}
                        className="font-black uppercase text-xs border-[3px] border-brand-dark bg-transparent text-brand-dark px-6 py-3"
                      >
                        DISCARD
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* SHOWCASE LIST WORKSPACE */
                <div className="bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-[3px] border-brand-dark/10 pb-4 mb-6">
                    <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark">
                      PORTFOLIO SHOWCASE REGISTRY
                    </h2>
                    <button
                      onClick={openAddShowcase}
                      className="flex items-center gap-2 font-black uppercase text-xs border-[3px] border-brand-dark bg-brand-secondaryAlt text-brand-dark px-4 py-2.5 shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1A1C1C] transition-all"
                    >
                      <Plus size={16} />
                      CONSTRUCT NEW SHOWCASE
                    </button>
                  </div>

                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b-[3px] border-brand-dark font-black uppercase text-brand-dark/60 tracking-wider">
                          <th className="pb-3 pr-4 font-black">PROJECT SYSTEM</th>
                          <th className="pb-3 px-4 font-black">CLIENT</th>
                          <th className="pb-3 px-4 font-black">CATEGORY</th>
                          <th className="pb-3 px-4 font-black text-center">FEATURED</th>
                          <th className="pb-3 pl-4 font-black text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-[2px] divide-brand-dark/10 font-semibold text-brand-dark">
                        {showcaseList.map((item) => (
                          <tr key={item.id} className="hover:bg-brand-surface/40">
                            <td className="py-4 pr-4 font-black text-sm uppercase">
                              <div>{item.title}</div>
                              <span className="font-mono text-[10px] text-brand-primary">/{item.slug}</span>
                            </td>
                            <td className="py-4 px-4 font-bold uppercase text-[10px]">{item.clientName}</td>
                            <td className="py-4 px-4 font-black text-[9px] uppercase">
                              <span className="px-2 py-0.5 border-[2px] border-brand-dark bg-brand-surface shadow-[1px_1px_0px_0px_#1A1C1C]">
                                {item.categoryLabel}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center font-black text-xs">
                              {item.isFeatured ? (
                                <span className="text-green-700 font-bold">YES</span>
                              ) : (
                                <span className="text-brand-dark/30 font-bold">NO</span>
                              )}
                            </td>
                            <td className="py-4 pl-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditShowcase(item)}
                                  className="p-2 border-[2px] border-brand-dark bg-blue-50 text-blue-700 shadow-[1px_1px_0px_0px_#1A1C1C]"
                                  title="Edit Showcase"
                                >
                                  <Edit2 size={12} />
                                </button>
                                <button
                                  onClick={() => handleDeleteShowcase(item.id)}
                                  className="p-2 border-[2px] border-brand-dark bg-brand-error-bg text-brand-error-text shadow-[1px_1px_0px_0px_#1A1C1C]"
                                  title="Delete Showcase"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT LEADS */}
          {activeTab === 'leads' && (
            <div className="flex flex-col gap-6 text-start">
              <div className="bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal">
                <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark mb-6 border-b-[3px] border-brand-dark/10 pb-4">
                  INCOMING TRANSMITTED LEADS
                </h2>

                <div className="flex flex-col gap-6">
                  {leads.map((lead) => (
                    <div key={lead.id} className="border-[3px] border-brand-dark bg-brand-surface p-6 shadow-brutal-sm flex flex-col gap-4 relative">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[2px] border-brand-dark/10 pb-3">
                        <div>
                          <span className="font-mono text-[9px] font-bold text-brand-primary">{lead.id} // Date: {lead.createdAt}</span>
                          <h3 className="text-lg font-black uppercase tracking-tighter text-brand-dark">
                            {lead.firstName} {lead.lastName}
                          </h3>
                          <span className="font-mono text-xs font-semibold text-brand-dark/60">{lead.email}</span>
                        </div>

                        {/* Dropdown status modifier */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-black text-[9px] uppercase tracking-wide">STATUS:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                            className="px-2.5 py-1.5 border-[2px] border-brand-dark bg-white font-black text-[9px] uppercase cursor-pointer"
                          >
                            <option value="PENDING">PENDING REVIEW</option>
                            <option value="REVIEWED">REVIEWED</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                        </div>
                      </div>

                      {/* Lead Message */}
                      <p className="text-sm font-semibold text-brand-dark/80 leading-relaxed bg-white p-4 border-[2px] border-brand-dark">
                        "{lead.message}"
                      </p>

                      <div className="flex justify-between items-center text-[10px] font-black uppercase text-brand-dark">
                        <span className="px-2 py-0.5 border-[2px] border-brand-dark bg-brand-secondaryAlt">
                          PROJECT TYPE: {lead.projectType}
                        </span>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="flex items-center gap-1 font-black text-brand-error-text hover:underline"
                        >
                          <Trash2 size={12} />
                          DELETE INQUIRY
                        </button>
                      </div>
                    </div>
                  ))}

                  {leads.length === 0 && (
                    <div className="text-center py-16 border-[3px] border-dashed border-brand-dark bg-brand-surface max-w-md mx-auto">
                      <FileSpreadsheet className="mx-auto text-brand-dark/40 mb-4" size={40} />
                      <h3 className="font-black uppercase text-sm text-brand-dark">NO CONTACT LEADS REGISTERED</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO METADATA TRACKER */}
          {activeTab === 'seo' && (
            <div className="flex flex-col gap-6 text-start">
              {/* Path metadata form */}
              <div className="bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal">
                <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark mb-6 border-b-[3px] border-brand-dark/10 pb-4">
                  DEPOSIT SEO PATH SCHEMAS
                </h2>

                <form onSubmit={handleAddSeo} className="flex flex-col gap-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-black uppercase text-[9px]">Routing Path</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. /showcases/nexus-analytics"
                        value={newPath}
                        onChange={(e) => setNewPath(e.target.value)}
                        className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-black uppercase text-[9px]">Meta Title Tag</label>
                      <input
                        type="text"
                        required
                        placeholder="Page Meta Title..."
                        value={newSeoTitle}
                        onChange={(e) => setNewSeoTitle(e.target.value)}
                        className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-black uppercase text-[9px]">Meta Description Tag</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Page Meta Description..."
                      value={newSeoDesc}
                      onChange={(e) => setNewSeoDesc(e.target.value)}
                      className="px-3 py-2 border-[2px] border-brand-dark bg-brand-surface focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full font-black uppercase text-xs border-[3px] border-brand-dark bg-brand-primary text-white py-3 shadow-[4px_4px_0px_0px_#1A1C1C]"
                  >
                    REGISTER SEO PATH METADATA
                  </button>
                </form>
              </div>

              {/* Path metadata list */}
              <div className="bg-white border-[3px] border-brand-dark p-6 md:p-8 shadow-brutal">
                <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark mb-6 border-b-[3px] border-brand-dark/10 pb-4">
                  REGISTERED PATH METADATA MAP
                </h2>

                <div className="flex flex-col gap-4">
                  {seoList.map((seo, idx) => (
                    <div key={idx} className="border-[3px] border-brand-dark bg-brand-surface p-5 shadow-brutal-sm flex flex-col gap-3">
                      <div className="flex justify-between items-center border-b-[2px] border-brand-dark/10 pb-2">
                        <span className="font-mono text-sm font-black text-brand-primary">{seo.path}</span>
                        <button
                          onClick={() => toggleSeoOptimization(seo.path)}
                          className={`px-2 py-0.5 border-[2px] border-brand-dark font-black text-[9px] uppercase shadow-[1px_1px_0px_0px_#1A1C1C] ${
                            seo.isOptimized ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {seo.isOptimized ? 'OPTIMIZED' : 'NEEDS OPTIMIZATION'}
                        </button>
                      </div>
                      <div className="flex flex-col gap-1.5 font-semibold text-xs text-brand-dark">
                        <div>
                          <span className="text-[10px] font-black uppercase text-brand-dark/50">TITLE: </span>
                          <span className="font-bold">{seo.metaTitle}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-brand-dark/50">DESCRIPTION: </span>
                          <p className="text-brand-dark/70 font-semibold">{seo.metaDescription}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
