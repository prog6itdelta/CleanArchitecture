import React from "react";

export default function ColumnFilter({column}){
    const {filterValue, setFilter} = column
    return(
        <span>
            Найти:{' '}
            <input type="text" value={filterValue || ''} onChange={(e)=>setFilter(e.target.value)} className="w-40 bg-white border border-gray-300 rounded-md shadow-sm h-4 text-left" />
        </span>
    )
}

export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        value={filterValue}
        className="bg-white border border-gray-300 rounded-md shadow-sm h-4 text-left cursor-default"
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="" className="text-xs font-normal ml-3 block truncate h-4">All</option>
        {options.map((option, i) => (
          <option key={i} value={option} className="text-xs font-normal ml-3 block truncate">
            {option}
          </option>
        ))}
      </select>
    )
  }