import React from 'react'
// import Layout from './Layout'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function Index({portals, currentPortal}) {
    return (
        <div /*title="Добро пожаловать"*/>

            <header>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900 text-center">Выберите портал</h1>
                </div>
            </header>
            <main>
            <div className="flex flex-col place-items-center">
                <div className="my-6 overflow-x-auto sm:-mx-6 lg:-mx-8 max-w-2xl">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <th
                                    scope="col"
                                    className="w-full px-20 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Порталы
                                </th>
                            </thead>
                                <tbody>
                                    {portals.map((portal, portalIdx) =>
                                    <tr key={portal.id} className={portalIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-20 text-sm font-medium text-gray-900 text-center" key={portal.id}>
                                            <InertiaLink method="post" href={route('setPortal', portal.id)}>
                                                {portal.name}
                                            </InertiaLink>
                                            <InertiaLink method="post" href={route('setPortal', portal.id)}>
                                                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                    Выбрать
                                                </button>
                                            </InertiaLink>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>



        </div>
    )
}
