'use client';

import React from 'react';

export default function WebsiteDropdown() {
  return (
    <select
      className="website-dropdown"
      defaultValue="default"
      aria-label="Select our other websites"
      onChange={(e) => {
        if (e.target.value !== "default") {
          window.open(e.target.value, '_blank', 'noopener,noreferrer');
          e.target.value = "default";
        }
      }}
    >
      <option value="default" disabled>Select our other websites</option>
      <option value="https://muthootcap.com/">Muthoot Capital Services Ltd.</option>
      <option value="https://www.muthoothousing.com/">Muthoot Housing Finance Company Ltd</option>
      <option value="https://www.muthootmicrofin.com/">Muthoot Microfin Ltd.</option>
      <option value="https://muthoot.com/">Muthoot Pappachan Group</option>
      <option value="https://www.muthootfincorp.com/">Muthoot Blue</option>
    </select>
  );
}
