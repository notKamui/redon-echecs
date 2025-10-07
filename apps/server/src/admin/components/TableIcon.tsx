import type { SVGProps } from 'react';

const TableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M3 9h18M3 14h18M8 4v16M16 4v16" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export default TableIcon;
