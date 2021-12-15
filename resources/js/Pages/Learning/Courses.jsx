import React from 'react'
// import Layout from './Layout'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function Courses({ courses }) {

    return (
        <div>
            <header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">Учебный центр</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            {courses.map(item =>
                                <div key={item.id}>
                                    <InertiaLink href={route('course', item.id)}>
                                        {item.id} - {item.name}
                                    </InertiaLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
