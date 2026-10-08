import React from 'react';
import FooterClient from './FooterClient';
import { getFooterSetting } from '@/lib/strapi';

export default async function Footer() {
  const footerSettings = await getFooterSetting();
  return <FooterClient footerSettings={footerSettings} />;
}
