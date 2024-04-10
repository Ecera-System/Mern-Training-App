import React from 'react';
import './Technologies.css'
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { SiMongodb } from "react-icons/si";


const Technologies = () => {
  return (
    <div className='techsWrapper'>
      <div className='text'>
        <h1>Grow Your Career By Learning <span>Powerful Skills.</span></h1>
      </div>
      <div className='box'>
        <div>
            <div>
                <FaReact className='icon' />
            </div>
            <h1>React</h1>
            <p>A declarative, component-based JavaScript library for building user interfaces.</p>
        </div>
        <div>
            <div>
                <FaNodeJs className='icon' />
            </div>
            <h1>Node</h1>
            <p>Server-side JavaScript runtime enabling fast, scalable network applications.</p>
        </div>
        <div>
            <div>
                <SiExpress className='icon' />
            </div>
            <h1>Express</h1>
            <p>Minimalistic Node.js web application framework simplifying server-side development.</p>
        </div>
        <div>
            <div>
                <SiMongodb className='icon' />
            </div>
            <h1>MongoDB</h1>
            <p>An scalable NoSQL database storing data in JSON-like documents.</p>
        </div>
      </div>
    </div>
  )
}

export default Technologies
