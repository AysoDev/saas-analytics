import { CustomersFilters } from '../Customers/Types'

export interface CustomerFiltersProps {
  filters: CustomersFilters
  onFilterChange: (filters: Partial<CustomersFilters>) => void
  onClearFilters: () => void
}