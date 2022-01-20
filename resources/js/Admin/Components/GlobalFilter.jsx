import React from "react";

export default function GlobalFilter({filter,setFilter}) {
    return(
        <div>
            Найти:{' '}
            <input value={filter || ''} onChange={(e)=>setFilter(e.target.value)} className="w-1/2 h-8 my-4 border" />
        </div>
    )
}