import type { CSSProperties, JSX } from 'react';

/**
 * Conjunto de ícones do Talk2Me (linha, 24x24, strokeLinecap/join round).
 * Portado de docs/design-system-bundle/project/screens-shared.jsx.
 * Ícones são decorativos por padrão (aria-hidden); quando um ícone carregar
 * significado sozinho, passe `title` (vira <title> + role="img").
 */
const PATHS: Record<string, JSX.Element> = {
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v4" />
    </>
  ),
  micOff: (
    <>
      <path d="M9 9v3a3 3 0 0 0 5 2" />
      <path d="M15 4v3" />
      <rect x="9" y="2" width="6" height="12" rx="3" fill="none" />
      <path d="M3 3l18 18" />
      <path d="M5 11a7 7 0 0 0 11 5.7" />
    </>
  ),
  cam: (
    <>
      <rect x="3" y="6" width="14" height="12" rx="2" />
      <path d="M21 9l-4 3 4 3z" />
    </>
  ),
  camOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M21 9l-4 3 4 3z" />
      <path d="M17 18H5a2 2 0 0 1-2-2V8" />
      <path d="M17 6h0a0 0 0 0 1 0 0v8" />
    </>
  ),
  play: <polygon points="6,4 20,12 6,20" fill="currentColor" stroke="none" />,
  stop: (
    <rect
      x="5"
      y="5"
      width="14"
      height="14"
      rx="2"
      fill="currentColor"
      stroke="none"
    />
  ),
  pause: (
    <>
      <rect
        x="6"
        y="5"
        width="4"
        height="14"
        fill="currentColor"
        stroke="none"
      />
      <rect
        x="14"
        y="5"
        width="4"
        height="14"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  repeat: (
    <>
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" />
    </>
  ),
  check: <polyline points="5,12 10,17 19,7" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  chev: <polyline points="9,6 15,12 9,18" />,
  chevD: <polyline points="6,9 12,15 18,9" />,
  chevL: <polyline points="15,6 9,12 15,18" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v.01" />
      <path d="M11 12h1v5h1" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v4M12 17v.01" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M1 21a8 8 0 0 1 16 0" />
      <circle cx="17" cy="6" r="3" />
      <path d="M23 17a6 6 0 0 0-6-6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </>
  ),
  a11y: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M3 9h18M9 22l3-9 3 9M12 13V8" />
    </>
  ),
  hand: (
    <path d="M8 10V5a2 2 0 0 1 4 0v5M12 10V4a2 2 0 0 1 4 0v8M16 8a2 2 0 0 1 4 0v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3a2 2 0 0 1 4 0" />
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.13-1.32l2.04-1.6-2-3.46-2.4.92a7 7 0 0 0-2.29-1.32l-.36-2.55h-4l-.36 2.55a7 7 0 0 0-2.29 1.32l-2.4-.92-2 3.46 2.04 1.6A7 7 0 0 0 5 12c0 .45.05.89.13 1.32l-2.04 1.6 2 3.46 2.4-.92a7 7 0 0 0 2.29 1.32l.36 2.55h4l.36-2.55a7 7 0 0 0 2.29-1.32l2.4.92 2-3.46-2.04-1.6c.08-.43.13-.87.13-1.32z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  wifi: (
    <>
      <path d="M2 8a16 16 0 0 1 20 0" />
      <path d="M5 12a11 11 0 0 1 14 0" />
      <path d="M8.5 15.5a6 6 0 0 1 7 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  swap: (
    <>
      <path d="M7 4l-4 4 4 4" />
      <path d="M3 8h14a4 4 0 0 1 4 4" />
      <path d="M17 20l4-4-4-4" />
      <path d="M21 16H7a4 4 0 0 1-4-4" />
    </>
  ),
  send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />,
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h3M21 14v3M14 17v4M17 21h4" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M2 10h20M6 15h3" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 12H7z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <path d="M8 13h8M8 17h8M8 9h2" />
    </>
  ),
  money: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M9 9h4a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h4" />
    </>
  ),
  cancel: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M4.93 4.93l14.14 14.14" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17v.01" />
    </>
  ),
  arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
  sparkle: (
    <path
      d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"
      fill="currentColor"
      stroke="none"
    />
  ),
  print: (
    <>
      <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.37 1.78.72 2.6a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.82.35 1.7.59 2.6.72A2 2 0 0 1 22 16.92z" />
  ),
  shop: (
    <path d="M3 9l1.5-5h15L21 9M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M3 9h18M8 14h8" />
  ),
  maximize: (
    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
  ),
  minimize: (
    <path d="M8 3v3a2 2 0 0 1-2 2H3M16 3v3a2 2 0 0 0 2 2h3M21 16h-3a2 2 0 0 0-2 2v3M3 16h3a2 2 0 0 1 2 2v3" />
  ),
};

export type IconName = keyof typeof PATHS;

export interface IconProps {
  name: IconName;
  size?: number;
  /** strokeWidth do traço. */
  stroke?: number;
  /** Cor do traço (default herda currentColor). */
  color?: string;
  /** Se fornecido, o ícone vira semântico (role="img" + <title>). */
  title?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({
  name,
  size = 18,
  stroke = 2,
  color = 'currentColor',
  title,
  className,
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
