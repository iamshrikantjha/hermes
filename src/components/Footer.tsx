
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#242526] border-t border-gray-200 dark:border-[#393a3b] text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Hermes</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Open-source, decentralized collaboration platform built for privacy and speed. No trackers, no databases, just code.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Project</h3>
              <a href="https://github.com/iamshrikantjha/hermes" className="text-sm hover:text-primary">Source Code</a>
              <a href="https://github.com/iamshrikantjha/hermes/issues" className="text-sm hover:text-primary">Report Issues</a>
              <a href="#" className="text-sm hover:text-primary">Documentation</a>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Legal</h3>
              <span className="text-sm text-gray-500">GNU GPLv3</span>
              <span className="text-sm text-gray-500">Privacy Policy</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-[#393a3b] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Hermes Open Source.</span>
          <div className="flex gap-4">
            <span>v1.0.0</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}