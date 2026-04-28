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
  { key: 'home',      href: '/' },
  { key: 'mission',   href: '/mission' },
  { key: 'founder',   href: '/founder' },
  { key: 'constitution', href: '/constitution.pdf', newTab: true },
  { key: 'projects',  href: '/projects' },
  { key: 'community', href: '/community' },
  { key: 'gallery',   href: '/gallery' },
  { key: 'news',      href: '/news' },
  { key: 'contact',   href: '/contact' },
  { key: 'about',     href: '/about' },
] as const;

export type NavLinkKey = (typeof NAV_LINKS)[number]['key'];

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard',    href: '/admin',                icon: 'LayoutDashboard' },
  { label: 'CMS Pages',    href: '/admin/cms',            icon: 'FileText' },
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

