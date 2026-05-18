import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { TopNavbar } from "@/components/layout/top-navbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(100deg,rgba(56,189,248,0.08),transparent_32%),linear-gradient(255deg,rgba(124,140,255,0.09),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22rem)]" />
      <Sidebar />
      <div className="relative flex min-h-screen flex-col lg:pl-72">
        <TopNavbar />
        <main
          id="main-content"
          className="mx-auto w-full max-w-[1680px] flex-1 px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pb-10 xl:pt-8"
        >
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
