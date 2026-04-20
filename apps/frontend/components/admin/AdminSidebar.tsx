import Link from "next/link";
import { ADMIN_NAV_LINKS } from "@/constants/brand";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4">
      <div className="mb-4 font-semibold">Admin Panel</div>
      <nav className="space-y-2">
        {ADMIN_NAV_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="block text-sm hover:text-primary">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
