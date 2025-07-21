export const maleAvatars = [
    "/images/avatarf1.png",
    "/images/avatarf2.png",
    "/images/avatarf3.png",
  ];
  
  export const femaleAvatars = [
    "/images/avatarm1.png",
    "/images/avatarm2.png",
    "/images/avatarm3.png",
  ];
  
  export const getRandomAvatar = (gender: "male" | "female"): string => {
    const avatarList = gender === "male" ? maleAvatars : femaleAvatars;
    const index = Math.floor(Math.random() * avatarList.length);
    return avatarList[index];
  };
  