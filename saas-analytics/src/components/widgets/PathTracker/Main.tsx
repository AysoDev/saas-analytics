'use client';

import { usePathname } from "next/navigation";
import './Main.css';
import { Route, ChevronRight } from "lucide-react";

export default function PathTracker () {
    const pathname = usePathname();

    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav className="path-tracker">
            <div className="ptr-content">
                <span className="ptr-icon">
                    <Route size={18} />
                </span>
                <span className="ptr-breadcrumbs">
                    <span className="ptr-breadcrumb main">Dashboard</span>
                    {segments.slice(1).map((seg, idx) => (
                        <span key={idx} className="ptr-breadcrumb-group">
                            <ChevronRight size={14} className="ptr-separator" />
                            <span className="ptr-breadcrumb">{seg.charAt(0).toUpperCase() + seg.slice(1)}</span>
                        </span>
                    ))}
                </span>
            </div>
        </nav>
    );
}