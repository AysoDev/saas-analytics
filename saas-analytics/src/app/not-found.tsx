import Link from 'next/link'
import { Construction, Home, Mail, Github } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="relative inline-flex">
            <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900 rounded-full opacity-75 animate-pulse"></div>
            <div className="relative bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
              <Construction className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off into the digital void. 
          It might be under development or temporarily unavailable.
        </p>

        {/* Under development notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-center mb-2">
            <Construction className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">
              Under Development
            </span>
          </div>
          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
            This feature is currently being built. Check back soon for updates!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Additional help */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-500 text-sm mb-4">
            Need help or want to report an issue?
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:ayso.devops@gmail.com"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Contact Support"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/AysoDev/saas-analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <p className="text-slate-400 dark:text-slate-600 text-xs">
            SaaS Analytics Platform • Built with Next.js
          </p>
        </div>
      </div>
    </div>
  )
}