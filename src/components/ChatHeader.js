// components/ChatHeader.js
import React from "react";
import Image from "next/image";

const ChatHeader = ({ status = "Online", onCallClick, onVideoClick }) => {
  const hostAvatarUrl = "https://i.ibb.co/HLWP814v/foto-perfil2.png";

  return (
    <div className="flex items-center justify-between w-full h-14 bg-[#005E54] text-white fixed top-0 left-0 z-50 px-3 shadow-md">
      {/* Left section: Back arrow, Avatar, Name & Status */}
      <div className="flex items-center flex-1 min-w-0">
        <div className="mr-3 cursor-pointer text-2xl sm:text-xl">
          <i className="zmdi zmdi-arrow-left"></i>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={hostAvatarUrl}
            alt="Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col ml-3 overflow-hidden min-w-0">
          <div className="flex items-center text-base font-semibold truncate">
            <span className="truncate">Sua Safadinha</span>
            <span
              data-testid="psa-verified"
              data-icon="psa-verified"
              className="ml-1 flex-shrink-0"
            >
              <svg
                viewBox="0 0 18 18"
                height="18"
                width="18"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
              >
                <polygon
                  fill="#00DA60"
                  points="9,16 7.1,16.9 5.8,15.2 3.7,15.1 3.4,13 1.5,12 2.2,9.9 1.1,8.2 2.6,6.7 2.4,4.6 4.5,4 5.3,2 7.4,2.4 9,1.1 10.7,2.4 12.7,2 13.6,4 15.6,4.6 15.5,6.7 17,8.2 15.9,9.9 16.5,12 14.7,13 14.3,15.1 12.2,15.2 10.9,16.9"
                ></polygon>
                <polygon
                  fill="#FFFFFF"
                  points="13.1,7.3 12.2,6.5 8.1,10.6 5.9,8.5 5,9.4 8,12.4"
                ></polygon>
              </svg>
            </span>
          </div>
          <span className="text-sm font-normal opacity-80 truncate">
            {status}
          </span>
        </div>
      </div>

      {/* Right section: Video call, Voice call, More options */}
      <div className="flex items-center space-x-4 ml-auto">
        <div
          className="cursor-pointer text-2xl sm:text-xl"
          onClick={onVideoClick}
        >
          <i className="zmdi zmdi-videocam"></i>
        </div>
        <div
          className="cursor-pointer text-2xl sm:text-xl"
          onClick={onCallClick}
        >
          <i className="zmdi zmdi-phone"></i>
        </div>
        <div className="cursor-pointer text-2xl sm:text-xl">
          <i className="zmdi zmdi-more-vert"></i>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
