import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimatedRGBBorder from '../common/AnimatedRGBBorder';

const DashboardDetailShowcase = ({ dashboardId }) => {
  const tabs = {
    'admin': { 
      title: 'Admin Dashboard', 
      icon: '🏢', 
      laptopImage: '/images/admin/AdminDashBoard%20web.png',
      mobileImage: '/images/admin/AdminDashBoard%20ph.png',
      tagline: 'Complete Control at Your Fingertips',
      placeholderText: 'The Admin Dashboard provides full visibility and control over your society. Manage residents, billing, complaints, and security from one centralized command center.',
      features: [
        {
          title: 'Residents & Units Management',
          desc: 'Easily manage all resident profiles, unit allocations, and KYC approvals in one place. Keep track of owners, tenants, and their respective vehicles.',
          webImg: '/images/admin/AdminResidentsWeb.png',
          phImg: '/images/admin/AdminResidentPh.png'
        },
        {
          title: 'Automated Invoicing & Billing',
          desc: 'Generate maintenance invoices, track payments, and manage society accounting effortlessly. Send automated reminders to residents for pending dues.',
          webImg: '/images/admin/AdminInvoiceWeb.png',
          phImg: '/images/admin/AdminInvoicePh.png'
        },
        {
          title: 'Helpdesk & Complaints',
          desc: 'Track and resolve resident complaints efficiently. Assign tickets to maintenance staff, monitor resolution times, and keep residents updated.',
          webImg: '/images/admin/AdminComplaints%20web.png',
          phImg: '/images/admin/AdminComplainPh.png'
        },
        {
          title: 'Notices & Communication',
          desc: 'Send instant announcements, digital notices, and event invites to all residents. Ensure important information reaches everyone via the app.',
          webImg: '/images/admin/AdminNoticeWeb.png',
          phImg: '/images/admin/AdminNoticePh.png'
        }
      ]
    },
    'resident': { 
      title: 'Resident App', 
      icon: '👨‍👩‍👧', 
      laptopImage: '/images/Resident/Resident/ResidentProfileWeb.png',
      mobileImage: '/images/Resident/Resident/ResidentHomePh.png',
      tagline: 'Empowering Every Resident',
      placeholderText: 'The Resident App ensures everyone is connected. Communicate with neighbors, manage visitors, pay bills, and book amenities instantly from your smartphone or laptop.',
      features: [
        {
          title: 'Visitor Management',
          desc: 'Approve or deny visitors directly from your phone. Pre-approve guests by generating QR codes for seamless entry at the main gate without the hassle of waiting.',
          webImg: '/images/Resident/Resident/ResidentVisitorWeb.png',
          phImg: '/images/Resident/Resident/ResidentVisitorPh.png'
        },
        {
          title: 'Maintenance Invoices',
          desc: 'View and pay your society maintenance bills online instantly. Keep track of your payment history and download invoices effortlessly.',
          webImg: '/images/Resident/Resident/ResidentInvoiceWeb.png',
          phImg: '/images/Resident/Resident/ResidentInvoicePh.png'
        },
        {
          title: 'Helpdesk & Complaints',
          desc: 'Raise maintenance requests or lodge complaints with ease. Attach photos of the issue, track ticket status, and communicate directly with the facility manager.',
          webImg: '/images/Resident/Resident/ResidentComplainWeb.png',
          phImg: '/images/Resident/Resident/ResidentComplainPh.png'
        },
        {
          title: 'Digital Notice Board',
          desc: 'Never miss an important update. Receive instant notifications for society events, committee announcements, and essential digital notices.',
          webImg: '/images/Resident/Resident/ResidentNoticeWeb.png',
          phImg: '/images/Resident/Resident/ResidentNoticePh.png'
        }
      ]
    },
    'security': { 
      title: 'Security Guard', 
      icon: '🛡️', 
      laptopImage: '/images/Resident/Security%20Guard/GuardDashboardWeb.png',
      mobileImage: '/images/Resident/Security%20Guard/GuardDashBoardPh.png',
      tagline: 'Uncompromised Safety & Tracking',
      placeholderText: 'The Security App empowers your guards to track visitors, verify identities, and handle emergencies seamlessly. It ensures a highly secure environment for the entire community.',
      features: [
        {
          title: 'Walk-In Visitors',
          desc: 'Log and track walk-in visitors easily. Capture photos, verify details, and notify residents instantly for entry approval directly from the gate.',
          webImg: '/images/Resident/Security%20Guard/GuardVisitorWalkINWeb.png',
          phImg: '/images/Resident/Security%20Guard/GuardWalkINPh.png'
        },
        {
          title: 'QR Code Scanning',
          desc: 'Ensure lightning-fast entry for pre-approved guests, delivery agents, and staff. Guards simply scan the QR code to grant immediate access.',
          webImg: '/images/Resident/Security%20Guard/GuardVisitorScanWeb.png',
          phImg: '/images/Resident/Security%20Guard/GuardVisitorScanPh.png'
        },
        {
          title: 'Vehicle Tracking',
          desc: 'Monitor incoming and outgoing vehicles. Maintain a digital log of all resident and visitor vehicles passing through the gates.',
          webImg: '/images/Resident/Security%20Guard/GuardVehicleWeb.png',
          phImg: '/images/Resident/Security%20Guard/GuardVehiclePh.png'
        },
        {
          title: 'Emergency Alerts',
          desc: 'Instant panic button access. Guards receive real-time SOS alerts from residents and can coordinate emergency responses immediately.',
          webImg: '/images/Resident/Security%20Guard/GuardEmergencyWeb.png',
          phImg: '/images/Resident/Security%20Guard/GuardImergencyPh.png'
        }
      ]
    },
    'accounting': { 
      title: 'Accounting', 
      icon: '💰', 
      laptopImage: '/images/generated/acc_web.png',
      mobileImage: '/images/generated/acc_mobile.png',
      tagline: 'Streamlined Financial Management',
      placeholderText: 'Manage billing, payments, and audits effortlessly. SocietyMates provides a powerful, transparent financial dashboard to keep your community running smoothly.',
      features: [
        {
          title: 'Automated Billing & Invoices',
          desc: 'Generate maintenance bills for all residents automatically. Send SMS and email reminders to ensure timely payments.',
          webImg: '/images/generated/acc_web.png',
          phImg: '/images/generated/acc_mobile.png'
        },
        {
          title: 'Expense & Vendor Tracking',
          desc: 'Track every rupee spent by the society. Manage vendor payments, utility bills, and staff salaries in one centralized ledger.',
          webImg: '/images/generated/acc_web.png',
          phImg: '/images/generated/acc_mobile.png'
        }
      ]
    },
    'committee': { 
      title: 'Committee', 
      icon: '👥', 
      laptopImage: '/images/generated/com_web.png',
      mobileImage: '/images/generated/com_mobile.png',
      tagline: 'Collaborative Governance',
      placeholderText: 'The Committee portal allows seamless voting, discussions, and task management. Make decisions faster and keep the community engaged.',
      features: [
        {
          title: 'Digital Polls & Voting',
          desc: 'Conduct society elections or gauge resident opinions on new initiatives with secure, transparent digital polling.',
          webImg: '/images/generated/com_web.png',
          phImg: '/images/generated/com_mobile.png'
        },
        {
          title: 'Meetings & Minutes',
          desc: 'Schedule committee meetings, send calendar invites, and publish the minutes of the meeting directly to the resident app.',
          webImg: '/images/generated/com_web.png',
          phImg: '/images/generated/com_mobile.png'
        }
      ]
    }
  };

  const activeData = tabs[dashboardId];

  if (!activeData) return null;

  return (
    <section className="py-12 lg:py-20 bg-[#f8fafc] relative w-full min-h-screen">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#0b6d4b] font-semibold hover:text-[#075c3f] transition-colors mb-10 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e6f5ef] text-[#0b6d4b] text-[13px] font-bold mb-6">
            <span className="text-lg">{activeData.icon}</span>
            {activeData.title}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.2]">
            {activeData.tagline}
          </h1>
          <p className="text-[16px] sm:text-lg text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
            {activeData.placeholderText}
          </p>
        </div>

        {/* Premium Dual-Mockup Image Showcase with RGB Border */}
        <div className="max-w-[75rem] mx-auto mb-20">
          <AnimatedRGBBorder className="w-full rounded-[2rem] sm:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
            <div className="relative w-full bg-[#f1f5f9] rounded-[1.8rem] sm:rounded-[2.8rem] overflow-hidden p-6 sm:p-10 lg:p-16 flex items-center justify-center min-h-[400px] sm:min-h-[600px]">
              
              {/* Laptop Mockup (Background) */}
              <div className="relative w-full max-w-5xl rounded-t-xl sm:rounded-t-2xl bg-gray-800 p-2 sm:p-3 shadow-2xl mr-8 sm:mr-32 border-b-8 border-gray-900">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-600"></div>
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-white aspect-[16/10]">
                  <img 
                    src={activeData.laptopImage} 
                    alt={`${activeData.title} Laptop View`}
                    className="w-full h-full object-cover object-top animate-[fadeIn_0.6s_ease-out_forwards]"
                  />
                </div>
                {/* Laptop Base */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[115%] h-4 sm:h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-xl sm:rounded-b-3xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1 sm:h-1.5 bg-gray-400 rounded-b-md"></div>
                </div>
              </div>

              {/* Mobile Phone Mockup (Foreground/Overlapping) */}
              <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 right-4 sm:right-12 lg:right-24 z-30 w-[140px] sm:w-[220px] lg:w-[260px] bg-white rounded-[2.2rem] sm:rounded-[2.8rem] p-1.5 sm:p-2.5 border-2 sm:border-4 border-gray-300 shadow-2xl shadow-black/20">
                {/* Phone Notch */}
                <div className="absolute top-1.5 sm:top-2.5 left-1/2 -translate-x-1/2 w-10 sm:w-16 h-3 sm:h-4 bg-gray-300 rounded-b-xl sm:rounded-b-2xl z-40"></div>
                
                {/* Phone Screen */}
                <div className="relative w-full bg-black rounded-[1.8rem] sm:rounded-[2.3rem] overflow-hidden flex items-start justify-center">
                  <img 
                    src={activeData.mobileImage} 
                    alt={`${activeData.title} Mobile View`}
                    className="w-full h-auto animate-[fadeIn_0.8s_ease-out_forwards]"
                  />
                </div>
              </div>

            </div>
          </AnimatedRGBBorder>
        </div>
        
        {/* Dynamic Feature Sections */}
        {activeData.features && activeData.features.length > 0 ? (
          <div className="max-w-[75rem] mx-auto space-y-32 mb-20">
            {activeData.features.map((feat, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                
                {/* Text Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">{feat.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">{feat.desc}</p>
                </div>

                {/* Image Showcase */}
                <div className="lg:w-1/2 relative">
                  <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-gray-100 z-10 w-full sm:w-4/5 mx-auto lg:mr-auto lg:ml-0 overflow-hidden">
                     <img src={feat.webImg} alt={feat.title} className="w-full h-auto rounded-xl shadow-sm" />
                  </div>
                  <div className="absolute -bottom-10 -right-4 sm:-right-10 z-20 w-[120px] sm:w-[160px] bg-white rounded-[2rem] p-1.5 border-2 sm:border-4 border-gray-300 shadow-2xl">
                     <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2 bg-gray-300 rounded-b-lg z-30"></div>
                     <div className="w-full bg-black rounded-[1.5rem] overflow-hidden flex items-start justify-center">
                       <img src={feat.phImg} alt={`${feat.title} Mobile`} className="w-full h-auto" />
                     </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-[2rem] shadow-sm border border-gray-100 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Detailed Features Coming Soon</h3>
            <p className="text-gray-500 italic">This is where you can add your custom paragraphs, text sections, and detailed feature lists.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default DashboardDetailShowcase;
