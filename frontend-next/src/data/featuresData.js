export const featuresData = {
  // --- Security ---
  'visitor-management': {
    title: 'Smart Visitor Management',
    tagline: 'Secure your gates with instant digital approvals',
    description: 'Transform your society gates with a 100% digital, zero-wait visitor management system. Residents get instant notifications and can approve or deny entry with a single tap.',
    icon: 'ShieldCheck',
    stats: [
      { label: 'Faster Entry', value: '3x' },
      { label: 'Security Breaches', value: '0%' },
      { label: 'Uptime', value: '99.9%' }
    ],
    benefits: [
      'Instant App Notifications for guest arrivals',
      'Passcode-based fast-track entry for frequent visitors',
      'Digital logs of all visitor entries and exits',
      'Integrated with security guard devices'
    ],
    faqs: [
      { question: 'What if a resident is not home or offline?', answer: 'Guards can call the resident via IVR, or entry can be granted by an admin/committee member if pre-authorized.' },
      { question: 'Do frequent visitors need approval every time?', answer: 'No, residents can issue a digital passcode (valid for specific dates/times) for frictionless entry without repeated approvals.' },
      { question: 'Is visitor data stored securely?', answer: 'Yes, all data is encrypted and stored on secure cloud servers with strict access controls.' }
    ]
  },
  'qr-vehicle-gate-pass': {
    title: 'QR & Vehicle Gate Pass',
    tagline: 'Frictionless entry for residents and regular staff',
    description: 'Generate secure QR codes for vehicles and domestic help. Scanned at the gate for instant, secure, and touchless entry into the premises.',
    icon: 'QrCode',
    stats: [
      { label: 'Wait Time', value: '<2s' },
      { label: 'Accuracy', value: '100%' },
      { label: 'Ease of Use', value: 'High' }
    ],
    benefits: [
      'Scan-and-go technology for instant access',
      'Automated boom barrier integration',
      'Validity tracking for temporary staff passes',
      'Detailed entry/exit vehicle logs'
    ],
    faqs: [
      { question: 'How do temporary staff get their QR code?', answer: 'Admins can print the QR code as an ID card, or send it directly to the staff member’s WhatsApp.' },
      { question: 'Can QR codes be shared or duplicated?', answer: 'Our dynamic QR codes refresh periodically, preventing unauthorized sharing or screenshot abuse.' },
      { question: 'Does this integrate with existing boom barriers?', answer: 'Yes, we provide hardware integration to automatically lift boom barriers upon a successful QR scan.' }
    ]
  },
  'emergency-sos': {
    title: 'Emergency SOS Alerts',
    tagline: 'Instant help when it matters most',
    description: 'A dedicated SOS button in the resident app instantly alerts security guards, committee members, and family in case of fire, medical, or safety emergencies.',
    icon: 'Siren',
    stats: [
      { label: 'Response Time', value: '<30s' },
      { label: 'Guards Alerted', value: 'All' },
      { label: 'Reliability', value: '100%' }
    ],
    benefits: [
      'One-tap panic button for emergencies',
      'Instant loud alarms on Guard devices',
      'Automatic location sharing within society',
      'Direct integration with local authorities'
    ],
    faqs: [
      { question: 'Who gets notified when the SOS is triggered?', answer: 'The alert is instantly sent to the main security gate, assigned committee members, and your pre-configured emergency family contacts.' },
      { question: 'Can it be accidentally triggered?', answer: 'The SOS button requires a 3-second hold or a confirmation swipe to prevent accidental alarms.' },
      { question: 'Does it work without internet?', answer: 'If the app detects no internet, it automatically falls back to sending an encrypted SMS to trigger the alarm.' }
    ]
  },
  // --- Finance ---
  'maintenance-billing': {
    title: 'Automated Maintenance Billing',
    tagline: 'Error-free, zero-touch society invoicing',
    description: 'Generate customized maintenance bills for hundreds of flats in a single click. Configure penalty rules, taxes, and automatic reminders seamlessly.',
    icon: 'Receipt',
    stats: [
      { label: 'Time Saved', value: '90%' },
      { label: 'Error Rate', value: '0%' },
      { label: 'Collection Up', value: '+40%' }
    ],
    benefits: [
      'Bulk invoice generation in 1 click',
      'Custom penalty calculation for late payments',
      'Automated email and SMS reminders',
      'Downloadable PDF invoices for residents'
    ],
    faqs: [
      { question: 'Can we configure custom penalty rules for late payments?', answer: 'Absolutely. You can set fixed penalty amounts, percentage-based interest, and grace periods.' },
      { question: 'Does it support different billing cycles?', answer: 'Yes, you can generate bills monthly, quarterly, semi-annually, or annually based on your society rules.' },
      { question: 'Are residents notified automatically?', answer: 'Yes, residents receive App push notifications, emails, and SMS alerts when a bill is generated and when it is due.' }
    ]
  },
  'online-payments': {
    title: 'Unified Online Payments',
    tagline: 'Pay society dues securely from anywhere',
    description: 'Enable residents to pay maintenance, amenity booking fees, and event contributions via UPI, Credit Cards, or Net Banking directly through the app.',
    icon: 'CreditCard',
    stats: [
      { label: 'Transactions', value: 'Secured' },
      { label: 'Settlement', value: 'T+1' },
      { label: 'Payment Modes', value: '100+' }
    ],
    benefits: [
      'Zero-hassle UPI and card payments',
      'Instant digital receipts generated automatically',
      'Real-time reconciliation for the admin',
      'Bank-grade secure payment gateway'
    ],
    faqs: [
      { question: 'Are there any hidden transaction charges?', answer: 'We offer zero-convenience-fee options for UPI and RuPay cards. Standard gateway charges apply for credit cards.' },
      { question: 'How quickly is the money settled into the society bank account?', answer: 'Funds are typically settled into the official society bank account on a T+1 (next working day) basis.' },
      { question: 'Is the payment gateway secure?', answer: 'Yes, our payments are routed through PCI-DSS compliant, RBI-approved payment gateways.' }
    ]
  },
  // --- Community ---
  'notices-announcements': {
    title: 'Digital Notices & Announcements',
    tagline: 'Ensure everyone gets the message instantly',
    description: 'Replace paper notice boards with digital announcements. Send important updates via App Push, SMS, and Email to ensure 100% reachability.',
    icon: 'Bell',
    stats: [
      { label: 'Reach', value: '100%' },
      { label: 'Paper Saved', value: 'Trees' },
      { label: 'Read Receipts', value: 'Yes' }
    ],
    benefits: [
      'Multi-channel broadcasting (App, SMS, Email)',
      'Track read receipts to see who viewed the notice',
      'Attach PDFs and images to announcements',
      'Schedule notices for future dates'
    ],
    faqs: [
      { question: 'Can I track who has read the notice?', answer: 'Yes, the admin dashboard provides detailed read-receipts and analytics for every announcement.' },
      { question: 'Can we send notices to specific blocks only?', answer: 'Yes, you can filter recipients by Block, Flat Type, or user role (Owners vs Tenants).' },
      { question: 'Is there a file size limit for attachments?', answer: 'You can attach PDF documents and high-resolution images up to 10MB per notice.' }
    ]
  },
  // --- Maintenance ---
  'complaint-helpdesk': {
    title: 'Resident Complaint Helpdesk',
    tagline: 'Resolve issues faster with digital ticketing',
    description: 'Residents can raise plumbing, electrical, or structural issues directly from the app. Assign tickets to staff and track resolution times.',
    icon: 'Wrench',
    stats: [
      { label: 'Resolution Faster', value: '2x' },
      { label: 'Resident Happy', value: '98%' },
      { label: 'SLA Tracking', value: 'Live' }
    ],
    benefits: [
      'Photo and voice uploads for complaints',
      'Auto-assignment to specific vendors/staff',
      'Real-time status updates for residents',
      'Feedback and rating system post-resolution'
    ],
    faqs: [
      { question: 'Can complaints be automatically assigned to the right staff?', answer: 'Yes, you can create rules to auto-assign plumbing issues to the plumber, electrical to the electrician, etc.' },
      { question: 'How do residents track the status?', answer: 'Residents receive real-time push notifications when their ticket status changes to "Assigned", "In Progress", or "Resolved".' },
      { question: 'Can admins track vendor performance?', answer: 'Yes, the analytics dashboard shows average resolution times and resident ratings for each staff member or vendor.' }
    ]
  },
  // --- Amenities ---
  'amenities-booking': {
    title: 'Smart Amenities Booking',
    tagline: 'Fair and transparent facility management',
    description: 'Digitize the booking of your clubhouse, tennis court, and party halls. Set rules, collect payments, and prevent double bookings automatically.',
    icon: 'CalendarCheck',
    stats: [
      { label: 'Double Bookings', value: '0' },
      { label: 'Convenience', value: 'High' },
      { label: 'Utilization', value: '+60%' }
    ],
    benefits: [
      'Real-time availability calendar',
      'Integrated payment collection for paid amenities',
      'Custom rules (e.g. max 2 bookings per month)',
      'Instant confirmation and digital passes'
    ],
    faqs: [
      { question: 'Can we restrict the number of times a resident books an amenity?', answer: 'Yes, you can configure custom booking quotas per flat (e.g., maximum 3 tennis court bookings per week).' },
      { question: 'Does the system handle paid amenities?', answer: 'Yes, residents must complete the online payment via the app before the booking is confirmed.' },
      { question: 'How do guards verify the booking?', answer: 'The resident receives a digital QR pass on their app, which the guard scans at the amenity entrance.' }
    ]
  },
};

export const getFeatureData = (slug) => {
  if (featuresData[slug]) {
    return featuresData[slug];
  }

  const formattedTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    title: formattedTitle,
    tagline: `Premium ${formattedTitle} tools for modern societies`,
    description: `Digitize and streamline your society's operations with our advanced ${formattedTitle} module. Built for scale, security, and resident satisfaction.`,
    icon: 'Zap',
    stats: [
      { label: 'Efficiency', value: '+85%' },
      { label: 'Reliability', value: '99.9%' },
      { label: 'Setup Time', value: 'Mins' }
    ],
    benefits: [
      'Cloud-based robust infrastructure',
      'Real-time syncing across all devices',
      'Enterprise-grade data encryption',
      '24/7 dedicated customer support'
    ],
    faqs: [
      { question: `How does the ${formattedTitle} module integrate with existing systems?`, answer: 'Our APIs seamlessly connect with your existing ERP, accounting, and security hardware without manual intervention.' },
      { question: 'Is onboarding assistance provided?', answer: 'Yes, our dedicated success managers will help you configure the module to match your exact society bylaws and rules.' },
      { question: 'Can we request custom features?', answer: 'We actively take feedback from committee members and roll out monthly updates that address the most requested features.' }
    ]
  };
};
