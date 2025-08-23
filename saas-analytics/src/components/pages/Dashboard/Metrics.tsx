'use client';

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { Metric } from "@/components/widgets/Metric/Main";
import { MetricSkeleton } from "@/components/widgets/Metric/Main";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Activity 
} from 'lucide-react';
import type { DashboardData } from "./Types";
import type { DashboardMetrics } from "./Types";


export default function MetricCards () {
    const [data, setData] = useState<DashboardMetrics>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        const fetchData = async () => {
            const mockData: DashboardMetrics = {
                totalRevenue: 124563,
                newUsers: 2453,
                conversions: 12.4,
            }
            setData(mockData)
        }

        fetchData();
        return () => clearTimeout(timer);
    }, []);

    if (loading || !data) {
        return (
            <>
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
            </>
        );
    }

    return (
        <>
            <Metric
                title="Total Revenue"
                value={data.totalRevenue}
                change={12.5}
                icon={<DollarSign size={20} />}
                format="currency"
            />
            <Metric
                title="New Users"
                value={data.newUsers}
                change={8.2}
                icon={<Users size={20} />}
            />
            <Metric
                title="Conversion Rate"
                value={data.conversions}
                change={-3.1}
                icon={<TrendingUp size={20} />}
                format="percent"
            />
        </>
    );
}