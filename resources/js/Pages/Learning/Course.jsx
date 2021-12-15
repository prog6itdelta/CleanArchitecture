import React from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'

export default function Course({ course }) {

    return (
        <div>
            <header>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">{course.name}</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                            {JSON.stringify(course)}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
