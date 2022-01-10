/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import Navigation from './Components/Navigation.jsx';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Курсы', href: route('learning'), current: true },
  { name: 'Admin', href: route('admin.index'), current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];

const userNavigation = [
  { name: 'Профайл', href: '/profile' },
  { name: 'Настройки', href: '/admin' },
  { name: 'Выход', href: '/logout' },
];

export default function Layout(children) {
  // useEffect(() => {
  //     document.title = title;
  // }, [title])
  const currentLocation = location.href;
  navigation.forEach((navItem) => {
    currentLocation.includes(navItem.href)
      ? navItem.current = true
      : navItem.current = false;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation navigation={navigation} user={user} userNavigation={userNavigation} />

      <div className="py-10">
        {children}
      </div>
    </div>
  );
}
