'use client'

import { useEffect, useRef } from 'react'
import { ChartProps } from './Types'
import './Main.css'
import {
  Chart as ChartJS,
  ChartConfiguration,
  ChartDataset,
  ChartType,
  Legend,
  ScriptableContext,
  TooltipItem
} from 'chart.js'

export const Chart = ({ data, type, title, height = 300 }: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<ChartJS<'bar' | 'line' | 'pie'> | null>(null)

  useEffect(() => {
    const initChart = async () => {
      if (typeof window === 'undefined') return

      const ChartJS = (await import('chart.js/auto')).default
      const ctx = canvasRef.current?.getContext('2d')
      if (!ctx || !data) return

      // Plugin for spacing between legend and chart
      const legendSpacingPlugin = {
        id: 'legendSpacing',
        beforeInit(chart: ChartJS) {
          if (!chart.legend) return
          const fit = chart.legend.fit
          chart.legend.fit = function fitWithSpacing(this) {
            fit.bind(this)()
            this.height += 16 // spacing in pixels
          }
        }
      }

      if (chartRef.current) chartRef.current.destroy()

      const chartConfig: ChartConfiguration<'bar' | 'line' | 'pie'> = {
        type,
        data: {
          labels: data.labels,
          datasets: data.datasets.map((dataset, i) => ({
            ...dataset,
            borderRadius: 4,
            borderColor: 'transparent',
            backgroundColor:
              getComputedStyle(document.documentElement).getPropertyValue(`--chart-${(i % 5) + 1}`) || '#3b82f6',
            ...(type === 'line' && {
              borderColor:
                getComputedStyle(document.documentElement).getPropertyValue(`--chart-${(i % 5) + 1}`) || '#3b82f6',
              backgroundColor: 'transparent'
            })
          })) as ChartDataset<'bar' | 'line' | 'pie'>[]
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
                  family:
                    getComputedStyle(document.documentElement).getPropertyValue('--font-family') ||
                    'Segoe UI, Roboto, Ubuntu, sans-serif',
                  size: 14,
                  weight: 500
                }
              }
            },
            title: {
              display: !!title,
              text: title,
              color: getComputedStyle(document.documentElement).getPropertyValue('--card-foreground'),
              padding: { bottom: 6 },
              font: {
                family:
                  getComputedStyle(document.documentElement).getPropertyValue('--font-family') ||
                  'Segoe UI, Roboto, Ubuntu, sans-serif',
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
                family:
                  getComputedStyle(document.documentElement).getPropertyValue('--font-family') ||
                  'Segoe UI, Roboto, Ubuntu, sans-serif',
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                family:
                  getComputedStyle(document.documentElement).getPropertyValue('--font-family') ||
                  'Segoe UI, Roboto, Ubuntu, sans-serif',
                size: 13
              },
              callbacks: {
                label: function (context: TooltipItem<'bar' | 'line' | 'pie'>) {
                  const label = context.dataset.label || ''
                  const value = (context.raw as number) ?? context.parsed.y
                  if (label === 'Revenue') return `${label}: $${value.toLocaleString()}`
                  return `${label}: ${value}`
                }
              }
            }
          },
          scales:
            type !== 'pie'
              ? {
                  x: {
                    grid: {
                      color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                    },
                    ticks: {
                      color: getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground'),
                      font: {
                        family:
                          getComputedStyle(document.documentElement).getPropertyValue('--font-family') ||
                          'Segoe UI, Roboto, Ubuntu, sans-serif',
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
                        family:
                          getComputedStyle(document.documentElement).getPropertyValue('--font-family') ||
                          'Segoe UI, Roboto, Ubuntu, sans-serif',
                        size: 13
                      }
                    }
                  }
                }
              : undefined
        },
        plugins: [legendSpacingPlugin]
      }

      chartRef.current = new ChartJS(ctx, chartConfig)
    }

    initChart()

    return () => {
      chartRef.current?.destroy()
    }
  }, [data, type, title])

  return (
    <div className="chart-container" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
