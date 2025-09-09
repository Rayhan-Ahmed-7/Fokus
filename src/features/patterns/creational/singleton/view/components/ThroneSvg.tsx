const ThroneSvg = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Throne base */}
      <rect
        x="30"
        y="100"
        width="80"
        height="30"
        fill="#8B4513"
        stroke="#654321"
        strokeWidth="2"
        rx="6"
      />

      {/* Throne back */}
      <rect
        x="35"
        y="50"
        width="70"
        height="60"
        fill="#D2691E"
        stroke="#8B4513"
        strokeWidth="2"
        rx="10"
      />

      {/* Throne arms */}
      <rect
        x="25"
        y="75"
        width="18"
        height="30"
        fill="#D2691E"
        stroke="#8B4513"
        strokeWidth="2"
        rx="4"
      />
      <rect
        x="97"
        y="75"
        width="18"
        height="30"
        fill="#D2691E"
        stroke="#8B4513"
        strokeWidth="2"
        rx="4"
      />

      {/* Ornate back decorations */}
      <polygon
        points="40,50 45,25 50,50"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <polygon
        points="55,50 60,20 65,50"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <polygon
        points="70,50 75,15 80,50"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />
      <polygon
        points="85,50 90,25 95,50"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="1"
      />

      {/* Central crown decoration */}
      <polygon
        points="60,50 70,10 80,50"
        fill="#FFD700"
        stroke="#B8860B"
        strokeWidth="2"
      />
      <circle
        cx="70"
        cy="18"
        r="4"
        fill="#FF0000"
        stroke="#8B0000"
        strokeWidth="1"
      />

      {/* Royal cushion */}
      <ellipse
        cx="70"
        cy="85"
        rx="30"
        ry="15"
        fill="#8B0000"
        stroke="#654321"
        strokeWidth="1"
      />
      <ellipse cx="70" cy="82" rx="28" ry="12" fill="#DC143C" />

      {/* Ornate details on arms */}
      <circle cx="34" cy="85" r="3" fill="#FFD700" />
      <circle cx="106" cy="85" r="3" fill="#FFD700" />

      {/* Base decorations */}
      <rect x="35" y="105" width="70" height="4" fill="#FFD700" />
    </svg>
  );
};
export default ThroneSvg;
