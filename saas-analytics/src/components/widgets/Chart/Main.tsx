'use client'

import { useEffect, useRef } from 'react'
import { ChartProps } from './Types'
import './Main.css'

export const Chart = ({ data, type, title, height = 300 }: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import Chart.js to avoid SSR issues
    const initChart = async () => {
      if (typeof window !== 'undefined') {
        const ChartJS = (await import('chart.js/auto')).default
        const ctx = canvasRef.current?.getContext('2d')
        
        if (ctx && data) {
          if (chartRef.current) {
            chartRef.current.destroy()
          }

          chartRef.current = new ChartJS(ctx, {
            type,
            data: {
              labels: data.labels,
              datasets: data.datasets.map((dataset, i) => ({
                ...dataset,
                borderRadius: 4,
                borderColor: 'transparent',
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(`--chart-${(i % 5) + 1}`) || '#3b82f6',
                // For line charts, set borderColor
                ...(type === 'line' && {
                  borderColor: getComputedStyle(document.documentElement).getPropertyValue(`--chart-${(i % 5) + 1}`) || '#3b82f6',
                  backgroundColor: 'transparent'
                })
              }))
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--card-foreground'),
                    usePointStyle: true,
                    padding: 20,
                    font: {
                      family: getComputedStyle(document.documentElement).getPropertyValue('--font-family') || 'Segoe UI, Roboto, Ubuntu, sans-serif',
                      size: 14,
                      weight: 500
                    }
                  }
                },
                title: {
                  display: !!title,
                  text: title,
                  color: getComputedStyle(document.documentElement).getPropertyValue('--card-foreground'),
                  font: {
                    family: getComputedStyle(document.documentElement).getPropertyValue('--font-family') || 'Segoe UI, Roboto, Ubuntu, sans-serif',
                    size: 16,
                    weight: 600
                  }
                },
                tooltip: {
                  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--card'),
                  titleColor: getComputedStyle(document.documentElement).getPropertyValue('--card-foreground'),
                  bodyColor: getComputedStyle(document.documentElement).getPropertyValue('--card-foreground'),
                  borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border'),
                  borderWidth: 1,
                  padding: 12,
                  cornerRadius: 8,
                  titleFont: {
                    family: getComputedStyle(document.documentElement).getPropertyValue('--font-family') || 'Segoe UI, Roboto, Ubuntu, sans-serif',
                    size: 14,
                    weight: 'bold'
                  },
                  bodyFont: {
                    family: getComputedStyle(document.documentElement).getPropertyValue('--font-family') || 'Segoe UI, Roboto, Ubuntu, sans-serif',
                    size: 13
                  },
                  callbacks: {
                    label: function(context) {
                      const label = context.dataset.label || '';
                      let value = context.parsed.y ?? context.parsed;
                      if (label === 'Revenue') {
                        return `${label}: $${value.toLocaleString()}`;
                      }
                      return `${label}: ${value}`;
                    }
                  }
                }
              },
              scales: type !== 'pie' ? {
                x: {
                  grid: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                  },
                  ticks: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground'),
                    font: {
                      family: getComputedStyle(document.documentElement).getPropertyValue('--font-family') || 'Segoe UI, Roboto, Ubuntu, sans-serif',
                      size: 13
                    }
                  }
                },
                y: {
                  grid: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                  },
                  ticks: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground'),
                    font: {
                      family: getComputedStyle(document.documentElement).getPropertyValue('--font-family') || 'Segoe UI, Roboto, Ubuntu, sans-serif',
                      size: 13
                    }
                  }
                }
              } : undefined
            }
          })
        }
      }
    }

    initChart()

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, type, title])

  return (
    <div className="chart-container" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  )
}