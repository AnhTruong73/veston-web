import React from 'react'



// data đây là component mà t muốn nhận data.
function BoxComponent({ children, data }) {

    return (
        <>
            {children}
            <br />
            <div className='mt-2 p-2 bg-gray-50 shadow-md rounded'>
                {data.map(e => {
                    return (<>
                        <div className='mb-2 py-2 border-b-2 border-gray-800 h-auto w-auto'>
                            {e}
                        </div>
                    </>)
                })}
            </div>
        </>
    )
}

export default BoxComponent