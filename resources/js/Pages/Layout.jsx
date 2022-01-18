/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import Navigation from './Components/Navigation.jsx';

const navigation = [
  { name: 'Курсы', href: route('learning'), current: true },
  { name: 'Admin', href: route('admin.index'), current: false },
];

const userNavigation = [
  { name: 'Профайл', href: '/profile' },
  { name: 'Настройки', href: '/admin' },
  { name: 'Выход', href: '/logout' },
];

export default function Layout(children) {
  const currentLocation = location.href;
  navigation.forEach((navItem) => {
    currentLocation.includes(navItem.href)
      ? navItem.current = true
      : navItem.current = false;
  });

  return (
    <div className="min-h-screen bg-white grid gap-0 grid-cols-1" style={{ gridTemplateRows: 'min-content auto' }}>
      <Navigation navigation={navigation} userNavigation={userNavigation} />

      {typeof children.children === 'object'
        ? children.children
        : children
      }

    </div>
  );
}
