"use client";
const LinkedinIcon = ({ primaryColor, secundaryColor }) => {
  return (
    <svg
      width="86"
      height="86"
      viewBox="0 0 86 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-size"
    >
      <rect width="86" height="86" rx="43" fill={secundaryColor} />
      <path
        d="M65.0002 62.0006V46.9843C65.0002 39.6043 63.4114 33.9668 54.8014 33.9668C50.6502 33.9668 47.8827 36.2218 46.7552 38.3743H46.6527V34.633H38.5039V62.0006H47.0114V48.4193C47.0114 44.8318 47.6777 41.3981 52.0852 41.3981C56.4414 41.3981 56.4927 45.4468 56.4927 48.6243V61.9493H65.0002V62.0006Z"
        fill={primaryColor}
      />
      <path
        d="M24.666 34.6328H33.1735V62.0004H24.666V34.6328Z"
        fill={primaryColor}
      />
      <path
        d="M28.92 21C26.2038 21 24 23.2038 24 25.92C24 28.6363 26.2038 30.8913 28.92 30.8913C31.6363 30.8913 33.84 28.6363 33.84 25.92C33.84 23.2038 31.6363 21 28.92 21Z"
        fill={primaryColor}
      />
    </svg>
  );
};

export default LinkedinIcon;
