import React from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const FAQItem = ({ question, answer, index, indexFaq, setIndexFaq }) => {
  return (
    <li className="p-4 bg-violet-50 rounded">
      <div
        onClick={() => setIndexFaq(prev => (prev !== index ? index : 0))}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="text-lg font-medium text-gray-800">{question}</h2>
        <span className="w-8 h-8 text-gray-800 relative">
          <MdKeyboardArrowDown
            className={`absolute inset-0 text-3xl duration-500 ${
              indexFaq === index ? 'opacity-0 invisible rotate-90' : 'opacity-100 visible rotate-0'
            }`}
          />
          <MdKeyboardArrowUp
            className={`absolute inset-0 text-3xl duration-500 ${
              indexFaq === index ? 'opacity-100 visible rotate-0' : 'opacity-0 invisible rotate-90'
            }`}
          />
        </span>
      </div>
      <div className={`overflow-hidden maxH-0 pl-5 ${indexFaq === index ? 'maxH-full' : ''}`}>
        <p className="text-base text-gray-600 mt-2">{answer}</p>
      </div>
    </li>
  );
};

export default FAQItem;
