// Backwards-compatible wrapper — new code should import DataTable directly.
import DataTable from './DataTable';

export default function Table({ columns = [], data = [], onSearch, pagination, ...rest }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchable={typeof onSearch === 'function' || rest.searchable !== false}
      pagination={pagination ? { pageSize: 10 } : undefined}
      {...rest}
    />
  );
}
