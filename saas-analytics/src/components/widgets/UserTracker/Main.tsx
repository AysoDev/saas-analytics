'use client';

import React, { useState, useEffect } from 'react';
import './Main.css';
import { User } from "lucide-react";

export default function UserTracker() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <UserTrackerSkeleton />;
    }

    return (
        <nav className="user-tracker">
            <div className="ptr-content">
                <span className="ptr-icon">
                    <User size={18} />
                </span>
                <span className="ptr-breadcrumbs">
                    <span className="ptr-breadcrumb main">John Doe</span>
                </span>
            </div>
        </nav>
    );
}

export function UserTrackerSkeleton() {
    return (
        <nav className="user-tracker">
            <div className="ptr-content">
                <span className="ptr-icon shimmer-bg">
                    <User size={18} />
                </span>
                <span className="ptr-breadcrumbs">
                    <span className="ptr-breadcrumb main shimmer-bg" style={{width: 60, height: 20}} />
                    <span className="shimmer-bg" style={{width: 80, height: 20, borderRadius: 6}} />
                </span>
            </div>
        </nav>
    );
}