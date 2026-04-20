export const BRAND_COLORS = {
  primary:    '#C0272D',
  primaryDark:'#9B1B20',
  secondary:  '#1A3A8F',
  secondaryDark:'#0F1F5C',
  accent:     '#1A7A3C',
  navy:       '#0F1F5C',
  background: '#F8FAFC',
} as const;

export const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { label: 'Projects',  href: '/projects' },
  { label: 'Healthcare',href: '/healthcare' },
  { label: 'Education', href: '/education' },
  { label: 'Community', href: '/community' },
  { label: 'Gallery',   href: '/gallery' },
  { label: 'News',      href: '/news' },
  { label: 'Contact',   href: '/contact' },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard',    href: '/admin',                icon: 'LayoutDashboard' },
  { label: 'Projects',     href: '/admin/projects',       icon: 'FolderKanban' },
  { label: 'Hospitals',    href: '/admin/hospitals',      icon: 'Building2' },
  { label: 'News',         href: '/admin/news',           icon: 'Newspaper' },
  { label: 'Events',       href: '/admin/events',         icon: 'Calendar' },
  { label: 'Gallery',      href: '/admin/gallery',        icon: 'Images' },
  { label: 'Donations',    href: '/admin/donations',      icon: 'HandHeart' },
  { label: 'Volunteers',   href: '/admin/volunteers',     icon: 'Users' },
  { label: 'Appointments', href: '/admin/appointments',   icon: 'CalendarCheck' },
  { label: 'Contacts',     href: '/admin/contacts',       icon: 'Mail' },
  { label: 'Settings',     href: '/admin/settings',       icon: 'Settings' },
] as const;

export const HOSPITAL_DEPARTMENTS = [
  'General OPD', 'Emergency', 'Gynecology', 
  'Pediatrics', 'Eye Care', 'Dental',
  'Laboratory', 'Radiology', 'Cardiology',
] as const;

