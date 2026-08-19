import React from 'react';
import NavbarClient from './NavbarClient';
import { getNavbarSetting } from '@/lib/strapi';

export default async function Navbar() {
  const data = await getNavbarSetting();
  return <NavbarClient initialData={data} />;
}
