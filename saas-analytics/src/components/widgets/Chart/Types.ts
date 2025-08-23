export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
}

export interface ChartProps {
  data: ChartData
  type: 'bar' | 'line' | 'pie'
  title?: string
  height?: number
}