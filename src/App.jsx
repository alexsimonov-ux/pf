import React, { useState, useRef, useEffect } from 'react';
import './index.css';

// Simple SVG Icons implementation to match the screenshot pixel-perfectly without dependencies
const Icons = {
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Tasks: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>,
  People: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Calendar: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Recruitment: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M16 21v-2a4 4 0 00-8 0v2"></path><circle cx="12" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>,
  Performance: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 000-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0012 0V2z"></path></svg>,
  Requests: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Attendance: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Surveys: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M21.21 15.89A10 10 0 118 2.83"></path><path d="M22 12A10 10 0 0012 2v10z"></path></svg>,
  Courses: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  Documents: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path></svg>,
  Assets: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Benefits: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>,
  Cases: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg>,
  SafeSpeak: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>,
  KnowledgeBase: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
  Workflows: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 012 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>,
  Reports: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><path d="M21.21 15.89A10 10 0 118 2.83"></path><path d="M22 12A10 10 0 0012 2v10z"></path></svg>, // Duplicating pie chart style
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>,
  HelpCenter: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-1"></path><path d="M12 8a2 2 0 012 2c0 1.5-2 2-2 2"></path><rect x="11.5" y="15" width="1" height="1" fill="currentColor"></rect></svg>, // Info style
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-item-right-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  ChevronDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><polyline points="6 9 12 15 18 9"></polyline></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="top-search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Runner: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><circle cx="16" cy="5" r="2"></circle><path d="M12 9l-2-2-3 1"></path><path d="M12 9l2 3 4-1"></path><path d="M12 9v6l2 2"></path><path d="M11 15l-3 6"></path><path d="M14 17l1 5"></path></svg>,
  PlusMenu: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  XIcon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><polyline points="20 6 9 17 4 12"></polyline></svg>,
  Droplet: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  LogoIcon: () => (
    <svg viewBox="0 0 32 32" fill="none" className="logo-icon">
      <path d="M11 16a5 5 0 100-10 5 5 0 000 10z" fill="#00829B" opacity="0.9" />
      <path d="M21 21a5 5 0 100-10 5 5 0 000 10z" fill="#2BBC66" opacity="0.9" />
      <path d="M12 26a3 3 0 100-6 3 3 0 000 6z" fill="#00829B" opacity="0.6" />
      <path d="M11 16c0 3.314-2.686 6-6 6v4a10 10 0 0010-10h-4z" fill="#00829B" />
      <path d="M21 21c0 2.761-2.239 5-5 5v3a8 8 0 008-8h-3z" fill="#2BBC66" />
      <path d="M16 16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#E2E8F0" opacity="0.5" />
    </svg>
  ),
  Collapse: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
};

const MAIN_NAV_ITEMS = [
  { label: 'Home', icon: 'Home' },
  { label: 'Tasks', icon: 'Tasks' },
  { label: 'People', icon: 'People' },
  { label: 'Calendar', icon: 'Calendar' },
  { label: 'Recruitment', icon: 'Recruitment', hasSubmenu: true },
  { label: 'Performance', icon: 'Performance', hasSubmenu: true },
  { label: 'Requests', icon: 'Requests' },
  { label: 'Attendance', icon: 'Attendance' },
  { label: 'Surveys', icon: 'Surveys' },
  { label: 'Courses', icon: 'Courses' },
  { label: 'Documents', icon: 'Documents' },
  { label: 'Assets', icon: 'Assets' },
  { label: 'Benefits', icon: 'Benefits' },
  { label: 'Cases', icon: 'Cases' },
  { label: 'Safe speak', icon: 'SafeSpeak' },
  { label: 'Knowledge base', icon: 'KnowledgeBase' },
  { label: 'Workflows', icon: 'Workflows' },
  { label: 'Reports', icon: 'Reports' },
];

const SidebarItem = ({ label, icon, hasSubmenu, isActive }) => {
  const IconComponent = Icons[icon];
  return (
    <a className={`nav-item ${isActive ? 'active' : ''}`} href="#">
      <IconComponent />
      <span>{label}</span>
      {hasSubmenu && <Icons.ChevronRight />}
    </a>
  );
};

export default function App() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const quickAddRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (quickAddRef.current && !quickAddRef.current.contains(event.target)) {
        setIsQuickAddOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsHireModalOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
        </div>

        <nav className="sidebar-nav">
          {MAIN_NAV_ITEMS.map((item, idx) => (
            <SidebarItem
              key={idx}
              label={item.label}
              icon={item.icon}
              hasSubmenu={item.hasSubmenu}
              isActive={item.label === 'Home'} // Since Home might be conceptually standard default, or no item selected
            />
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="collapse-btn">
            <Icons.Collapse />
          </div>
          <SidebarItem label="Settings" icon="Settings" />
          <SidebarItem label="Help center" icon="HelpCenter" />
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-area">
        {/* Top Navbar */}
        <header className="top-nav">
          <div className="top-search-area">
            <Icons.Search />
            <input type="text" placeholder="Search" className="top-search-input" />
            <span className="top-search-shortcut">⌘ K</span>
          </div>

          <div className="top-nav-right">
            <div className="round-btn-container">
              <Icons.Droplet />
            </div>

            <div className="quick-add-wrapper" ref={quickAddRef} style={{ position: 'relative' }}>
              <button
                className={`quick-add-btn ${isQuickAddOpen ? 'active' : ''}`}
                onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              >
                <Icons.PlusMenu />
                Quick add
                <Icons.ChevronDown />
              </button>

              {isQuickAddOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.Runner /></span>
                    Request time-off
                  </div>
                  <div className="dropdown-separator"></div>
                  <div className="dropdown-item" onClick={() => { setIsHireModalOpen(true); setIsQuickAddOpen(false); }}>
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Hire
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Candidate
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    1:1
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Kudos
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Feedback
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Task
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Case
                  </div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon"><Icons.PlusMenu /></span>
                    Request
                  </div>
                  <div className="dropdown-separator"></div>
                  <div className="dropdown-item">
                    <span className="dropdown-item-icon" style={{ fontSize: '14px', lineHeight: 1 }}>💡</span>
                    Submit a suggestion
                  </div>
                </div>
              )}
            </div>

            <div className="vertical-divider"></div>

            <div className="notification-container">
              <Icons.Bell />
              <span className="notification-badge">12</span>
            </div>

            <div className="vertical-divider"></div>

            <div className="profile-container">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="John Smith" className="avatar" />
              <div className="profile-info">
                <span className="profile-name">John Smith</span>
                <span className="profile-role">CEO</span>
              </div>
              <Icons.ChevronDown />
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="content-body">
          {/* Main content will go here, currently matched to empty space in the prototype */}
        </div>
      </main>

      {/* Hire Modal */}
      {isHireModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsHireModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add a new hire to PeopleForce</h2>
              <button className="modal-close-btn" onClick={() => setIsHireModalOpen(false)}>
                <Icons.XIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Form</label>
                <div className="modal-select-wrapper">
                  <select className="modal-select" defaultValue="">
                    <option value="" disabled hidden>Select</option>
                    <option value="1">Standard Hire Form</option>
                  </select>
                  <div className="modal-select-icon">
                    <Icons.ChevronDown />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn-cancel" onClick={() => setIsHireModalOpen(false)}>
                <Icons.XIcon /> Cancel
              </button>
              <button className="modal-btn-next" onClick={() => { setIsHireModalOpen(false); }}>
                <Icons.Check /> Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
