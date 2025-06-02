import React from "react";

const ReactionPopup = ({ onReact }) => {
  const reactions = [
    {
      name: "Like",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Flike.png?alt=media&token=343a9dfc-1cb8-47bd-8e3b-83bc2456fb62",
    },
    {
      name: "Unlike",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Funlike.png?alt=media&token=ec74a35c-56c3-4421-b7f3-46564a537125",
    },
    {
      name: "Love",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fheart.png?alt=media&token=5a0a3fd1-9c48-4ed9-9a58-578e6a11c27b",
    },
    {
      name: "Haha",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fhaha.png?alt=media&token=a9ac49a3-8be8-4ca3-88f8-8fdab2480301",
    },
    {
      name: "Wow",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fwow.png?alt=media&token=af301bc2-ca4c-43eb-aff8-c4a92ce0923b",
    },
    {
      name: "Sad",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fsad.png?alt=media&token=71dba6ea-5aad-41a8-b988-419c643e01a6",
    },
    {
      name: "Angry",
      icon: "https://firebasestorage.googleapis.com/v0/b/prn221-69738.appspot.com/o/image%2Fangry.png?alt=media&token=bbf39d35-837d-4ef6-ab61-a7fb4ec2ae53",
    },
  ];

  return (
    <div className="absolute z-20 flex gap-0 p-1 -top-12 bg-white rounded-lg shadow-lg border border-gray-200">
      {reactions.map((reaction) => (
        <button
          key={reaction.name}
          onClick={() => onReact(reaction.name)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:scale-125 transition-transform duration-200"
          title={reaction.name}
        >
          <img src={reaction.icon} alt={reaction.name} className="w-9 h-9" />
        </button>
      ))}
    </div>
  );
};

export default ReactionPopup;