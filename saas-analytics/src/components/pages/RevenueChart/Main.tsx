'use client'

import { useEffect, useRef } from 'react'
import { ChartProps } from '@/components/widgets/Chart/Types'
import { Chart } from 'chart.js/auto';
import './Main.css'

interface RevenueChartProps {
  data: ChartProps['data']
  metric: 'revenue' | 'customers' | 'arpu'
}

const chartColors = [
  '#3b82f6',
  '#ef4444',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899'
]

export const RevenueChart = ({ data, metric }: RevenueChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart | null>(null)

  useEffect(() => {
    const initChart = async () => {
      if (typeof window !== 'undefined') {
        const ChartJS = (await import('chart.js/auto')).default
        const ctx = canvasRef.current?.getContext('2d')
        
        if (ctx && data) {
          if (chartRef.current) {
            chartRef.current.destroy()
          }

          const gridColor = 'rgba(200, 200, 200, 0.4)'
          const textColor = '#333333'

          chartRef.current = new ChartJS(ctx, {
            type: 'line',
            data: {
              labels: data.labels,
              datasets: data.datasets.map((dataset, i) => {
                const color = chartColors[i % chartColors.length]
                return {
                  ...dataset,
                  borderColor: color,
                  backgroundColor: color + '33',
                  borderWidth: 2,
                  fill: true,
                  tension: 0.4,
                  pointBackgroundColor: color,
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2,
                  pointRadius: 4,
                  pointHoverRadius: 6
                }
              })
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: textColor,
                    usePointStyle: true,
                    padding: 20
                  }
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: '#2a2a72',
                  titleColor: '#fff',
                  bodyColor: '#f5f5f5',
                  borderColor: '#4c4cff',
                  borderWidth: 1
                }
              },
              scales: {
                x: {
                  grid: {
                    color: gridColor
                  },
                  ticks: {
                    color: textColor
                  }
                },
                y: {
                  grid: {
                    color: gridColor
                  },
                  ticks: {
                    color: textColor,
                    callback: function (value) {
                      if (metric === 'revenue') {
                        return '$' + value.toLocaleString()
                      } else if (metric === 'customers') {
                        return value.toLocaleString()
                      } else {
                        return '$' + value
                      }
                    }
                  }
                }
              }
            }
          })
        }
      }
    }

    initChart()

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, metric])

  return (
    <div className="revenue-chart-container">
      <canvas ref={canvasRef} />
    </div>
  )
}
