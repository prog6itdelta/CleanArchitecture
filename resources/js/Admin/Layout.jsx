/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import {
  BellIcon,
  CalendarIcon,
  HomeIcon,
  MenuAlt2Icon,
  XIcon,
  AcademicCapIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ClipboardListIcon
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
    name: 'Курсы',
    icon: AcademicCapIcon,
    href: route('admin.courses'),
    current: true
  },
  {
    name: 'Уроки',
    icon: BookOpenIcon,
    href: route('admin.lessons'),
    current: true
  },
  {
    name: 'Вопросы',
    icon: QuestionMarkCircleIcon,
    href: route('admin.questions'),
    current: true
  },
  {
    name: 'Ответы',
    icon: ClipboardListIcon,
    href: route('admin.answers'),
    current: true
  },
  {
    name: 'Департаменты',
    icon: HomeIcon,
    href: route('admin.departments'),
    current: true
  },
];

const userNavigation = [
  { name: 'Профайл', href: '#' },
  { name: 'Настройки', href: '#' },
  { name: 'Выход', href: '/logout' },
];

export default function Layout(children) {
  return (
    <Navigation navigation={navigation}>
      {children}
    </Navigation>
  );
}
