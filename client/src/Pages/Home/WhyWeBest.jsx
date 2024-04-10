import React from 'react';
import './WhyWeBest.css'
import { ImCross } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";


const WhyWeBest = () => {
    return (
        <section className='best'>

            <h1 className="gradText">Why are we the best</h1>

            <table cellSpacing={0}>

                <tr>

                    <th style={{ width: '52%' }}>Features</th>

                    <th style={{ width: '14%' }}>Recorded<br />Class<br />Platform </th>

                    <th style={{ width: '14%' }}>Live<br />class<br />Platform </th>

                    <th style={{ width: '14%' }}>Ecera Training</th>

                </tr>

                <tr>

                    <td>Affordability</td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                </tr>

                <tr>

                    <td>Learning Flexibility</td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                </tr>

                <tr>

                    <td>Instant Doubt Solving</td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                </tr>

                <tr>

                    <td>Personal Mentorship</td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                </tr>

                <tr>

                    <td>Dedicated Projects</td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                </tr>

                <tr>

                    <td>Placement Opportunity After Training</td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        <ImCross className='cross' />
                    </td>

                    <td>
                        < FaCheckCircle className='checktick' />
                    </td>

                </tr>

            </table>

        </section>
    );
}

export default WhyWeBest;
