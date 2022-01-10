/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import {
  BellIcon,
  CalendarIcon,
  HomeIcon,
  MenuAlt2Icon,
  XIcon
} from '@heroicons/react/outline';
import Navigation from './Navigation.jsx';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  {
    name: 'Admin1',
    icon: HomeIcon,
    href: route('admin.index'),
    current: true
  }
  // { name: 'Admin2', href: route('selectPortal'), current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];

const userNavigation = [
  { name: 'Профайл', href: '#' },
  { name: 'Настройки', href: '#' },
  { name: 'Выход', href: '/logout' },
];

export default function Layout(children) {
  return (
    <Navigation navigation={navigation} user={user} userNavigation={userNavigation}>
      {children}
    </Navigation>
  );
}
