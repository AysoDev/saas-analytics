'use client';

import { useState, useEffect } from "react";
import { Metric, MetricSkeleton } from "@/components/widgets/Metric/Main";
import { Users } from "lucide-react";

type MetricsValues = {
    total: number;
    active: number;
    mrr: number;
}

export default function CustomersMetricCards ({ total, active, mrr }: MetricsValues) {

    if (!total || !active || !mrr) {
        return (
            <>
                <MetricSkeleton />
                <MetricSkeleton />
                <MetricSkeleton />
            </>
        )
    }
    return (
        <>
            <Metric
                title="Total Customers"
                value={total}
                icon={<Users size={20} />}
            />
            <Metric
                title="Active Customers"
                value={active}
                change={+12.5}
                icon={<Users size={20} />}
            />
            <Metric
                title="MRR"
                value={mrr}
                change={+8.2}
                icon={<Users size={20} />}
                format="currency"
            />
        </>
    );
}