import type { Metadata } from "next";

import { WaitlistAdmin } from "@/components/waitlist/waitlist-admin";

export const metadata: Metadata = {
  title: "Waitlist Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WaitlistAdminPage() {
  return <WaitlistAdmin />;
}
