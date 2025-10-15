const GhostKingSVG = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Royal cape/cloak - ghostly */}
      <ellipse
        cx="50"
        cy="85"
        rx="35"
        ry="25"
        fill="#E6E6FA"
        stroke="#D3D3D3"
        strokeWidth="2"
        opacity="0.6"
      />
      <ellipse cx="50" cy="85" rx="32" ry="22" fill="#F0E6FF" opacity="0.6" />

      {/* Body/chest */}
      <rect
        x="35"
        y="60"
        width="30"
        height="35"
        fill="#E6E6FF"
        stroke="#D3D3D3"
        strokeWidth="2"
        rx="5"
        opacity="0.6"
      />

      {/* Royal tunic details */}
      <rect x="40" y="65" width="20" height="25" fill="#FFFACD" opacity="0.5" />
      <rect x="42" y="67" width="16" height="3" fill="#FFE4E1" opacity="0.5" />
      <rect x="42" y="72" width="16" height="3" fill="#FFE4E1" opacity="0.5" />
      <rect x="42" y="77" width="16" height="3" fill="#FFE4E1" opacity="0.5" />

      {/* Head */}
      <circle
        cx="50"
        cy="45"
        r="15"
        fill="#F5F5F5"
        stroke="#D3D3D3"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* Ghostly Crown */}
      <rect
        x="38"
        y="32"
        width="24"
        height="10"
        fill="#FFFACD"
        stroke="#DDD"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <polygon
        points="38,32 44,18 50,32"
        fill="#FFFACD"
        stroke="#DDD"
        strokeWidth="1"
        opacity="0.6"
      />
      <polygon
        points="50,32 56,15 62,32"
        fill="#FFFACD"
        stroke="#DDD"
        strokeWidth="1"
        opacity="0.6"
      />
      <polygon
        points="44,32 48,25 52,32"
        fill="#FFFACD"
        stroke="#DDD"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Sad eyes */}
      <circle cx="45" cy="42" r="2.5" fill="#666" opacity="0.5" />
      <circle cx="55" cy="42" r="2.5" fill="#666" opacity="0.5" />

      {/* Downturned mouth */}
      <path
        d="M 42 52 Q 50 48 58 52"
        stroke="#666"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Ghostly beard */}
      <ellipse cx="50" cy="58" rx="10" ry="8" fill="#E6E6FA" opacity="0.5" />

      {/* Arms */}
      <ellipse cx="25" cy="70" rx="6" ry="12" fill="#F5F5F5" opacity="0.5" />
      <ellipse cx="75" cy="70" rx="6" ry="12" fill="#F5F5F5" opacity="0.5" />

      {/* Broken scepter */}
      <rect x="80" y="60" width="3" height="20" fill="#D3D3D3" opacity="0.4" />
      <rect x="83" y="55" width="2" height="8" fill="#D3D3D3" opacity="0.3" />
    </svg>
  );
};
export default GhostKingSVG;
