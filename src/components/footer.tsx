// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="sticky bottom-0 py-4 z-50 w-full bg-background border-b border-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} NexaCore All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
