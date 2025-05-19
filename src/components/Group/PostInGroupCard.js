import React from "react";

const PostInGroupCard = () => {
  return (
    <div className="w-[40%] h-[562px] bg-slate-300 rounded-[10px]">
      <div className="p-4">
        <div className="h-10 flex">
          <div className="flex gap-2">
            <div className="rounded-[50px]">
              <img
                className="rounded-full w-[40px] h-[40px] object-fill"
                src={
                  "https://i.pinimg.com/originals/d0/28/68/d0286806706a508645e8763c6b3f8cea.jpg"
                }
                alt="avatar"
              />
            </div>
            <div className="flex flex-col items-start justify-center font-medium text-sm">
              <div className="flex gap-1 ">
                <p className="text-[#088DD0]">Phuong Nam</p>
                <p className="text-[#000000] opacity-50">posted in</p>
                <p>MXMU group</p>
              </div>
              <div className="text-[#000000] opacity-50">
                July 26 2018, 01:03pm
              </div>
            </div>
          </div>
          <div>
            {/* <img className="text-white font-medium" src={moreIcon} alt=""/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInGroupCard;
