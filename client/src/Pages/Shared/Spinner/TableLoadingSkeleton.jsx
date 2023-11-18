import React from 'react';
import './Spinner.css'

const TableLoadingSkeleton = ({ tr_count = 8, td_count }) => {
    return (<>
        {
            [...Array(tr_count).keys()].map(item =>
                <tr key={item} className='border-b'>
                    {
                        [...Array(td_count).keys()].map(td =>
                            <td key={td} className={`${td === 0 ? 'px-5' : 'pr-5'} py-3`}>
                                <div className="table_loading">
                                </div>
                            </td>)
                    }
                </tr>
            )
        }
    </>);
};

export default TableLoadingSkeleton;