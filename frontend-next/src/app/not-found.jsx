import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | Imagetech Industries',
  description: "Oops! The page you are looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 pt-32 text-center animate-[fadeIn_0.5s_ease-out]">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-slate-600 max-w-md mx-auto mb-8 font-medium">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
}
