import React from "react";
import useStore from "../../store";

const colors: string[] = [
  "#DFFFE0",
  "#D6F0FF",
  "#E9E3FF",
  "#BEE3F8",
  "#D2F4F4",
  "#FFE0E6",
  "#FFE5B4",
  "#FFD5C2",
  "#FFEDCC",
  "#FFEFD5",
  "#FFF7D6",
  "#F5F5DC",
  "#E6E6D0",
  "#FFFACD",
];

const getColor = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getInitials = (email: string) => {
  return email.slice(0, 2).toUpperCase();
};

const Avatar: React.FC = () => {
  const { user } = useStore()

  return (
    <div
      style={{ backgroundColor: getColor(user.email) }}
      className="flex items-center justify-center rounded-full h-10 w-10 bg-red-500"
    >
      <span className="font-semibold">{getInitials(user.email)}</span>
    </div>
  );
};

export default Avatar;
