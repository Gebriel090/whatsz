// components/ChoiceButtons.js
import React from "react";

const ChoiceButtons = ({ choices, onSelectChoice }) => {
  return (
    <div className="choice-buttons-overlay absolute bottom-20 left-0 right-0 p-3 flex flex-col gap-3 z-50">
      {choices.map((choice, index) => (
        <button
          key={index}
          className="choice-button bg-whatsappButton text-white py-3 px-4 rounded-5rem text-center cursor-pointer border-none text-base transition-colors duration-200 hover:bg-whatsappButtonHover focus:outline-none"
          onClick={() => onSelectChoice(choice.content)}
        >
          {choice.content}
        </button>
      ))}
    </div>
  );
};

export default ChoiceButtons;
