const KingSvg = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Royal cape/cloak */}
      <ellipse
        cx="50"
        cy="85"
        rx="35"
        ry="25"
        fill="#8B0000"
        stroke="#654321"
        strokeWidth="2"
      />
      <ellipse cx="50" cy="85" rx="32" ry="22" fill="#DC143C" />

      {/* Body/chest */}
      <rect
        x="35"
        y="60"
        width="30"
        height="35"
        fill="#4169E1"
        stroke="#000080"
        strokeWidth="2"
        rx="5"
      />

      {/* Royal tunic details */}
      <rect x="40" y="65" width="20" height="25" fill="#FFD700" />
      <rect x="42" y="67" width="16" height="3" fill="#FF6347" />
      <rect x="42" y="72" width="16" height="3" fill="#FF6347" />
      <rect x="42" y="77" width="16" height="3" fill="#FF6347" />

      {/* Head */}
      <circle
        cx="50"
        cy="45"
        r="15"
        fill="#FDBCB4"
        stroke="#D2691E"
        strokeWidth="1.5"
      />

      {/* Majestic Crown */}
      <rect
        x="38"
        y="32"
        width="24"
        height="10"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1.5"
      />
      {/* Crown points */}
      <polygon
        points="38,32 44,18 50,32"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <polygon
        points="50,32 56,15 62,32"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <polygon
        points="44,32 48,25 52,32"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />

      {/* Crown jewels */}
      <circle
        cx="50"
        cy="20"
        r="3"
        fill="#FF0000"
        stroke="#8B0000"
        strokeWidth="1"
      />
      <circle cx="44" cy="28" r="2" fill="#0000FF" />
      <circle cx="56" cy="28" r="2" fill="#008000" />
      <circle cx="50" cy="36" r="2" fill="#800080" />

      {/* Regal eyes */}
      <circle cx="45" cy="42" r="2.5" fill="#000" />
      <circle cx="55" cy="42" r="2.5" fill="#000" />
      <circle cx="45.5" cy="41.5" r="0.8" fill="#FFF" />
      <circle cx="55.5" cy="41.5" r="0.8" fill="#FFF" />

      {/* Noble nose */}
      <ellipse cx="50" cy="47" rx="1.5" ry="2" fill="#E6B8B8" />

      {/* Royal mustache */}
      <ellipse cx="50" cy="50" rx="8" ry="2.5" fill="#8B4513" />

      {/* Majestic beard */}
      <ellipse cx="50" cy="58" rx="10" ry="8" fill="#8B4513" />
      <ellipse cx="50" cy="56" rx="8" ry="6" fill="#A0522D" />

      {/* Arms */}
      <ellipse
        cx="25"
        cy="70"
        rx="6"
        ry="12"
        fill="#FDBCB4"
        stroke="#D2691E"
        strokeWidth="1"
      />
      <ellipse
        cx="75"
        cy="70"
        rx="6"
        ry="12"
        fill="#FDBCB4"
        stroke="#D2691E"
        strokeWidth="1"
      />

      {/* Royal Scepter */}
      <rect x="80" y="55" width="4" height="35" fill="#8B4513" />
      <circle
        cx="82"
        cy="52"
        r="5"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <polygon
        points="77,52 82,45 87,52"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <circle cx="82" cy="49" r="2" fill="#FF0000" />

      {/* Royal medallion */}
      <circle
        cx="50"
        cy="75"
        r="4"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <circle cx="50" cy="75" r="2.5" fill="#FF6347" />
    </svg>
  );
};

export default KingSvg;
