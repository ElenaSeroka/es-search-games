import React from 'react';
import { useState } from 'react';

const GamesCompareJapanEUPAL = (props) => {
    const [data, setData] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    // const handleClick = async () => {
    //     setIsLoading(true);

    //     try {
    //         const response = await fetch('http://localhost:5000/api/games-per-year', {
    //             method: 'GET',
    //             headers: {
    //                 Accept: 'application/json',
    //             },
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Error! status: ${response.status}`);
    //         }

    //         const result = await response.json();

    //         console.log('result is: ', JSON.stringify(result, null, 4));

    //         setData(result);
    //     } catch (err) {
    //         setErr(err.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    console.log(data);

    return (
        <div>
            {err && <h2>{err}</h2>}

            <button onClick={props.clickAction}>Compare data Japan and EU</button>

            {isLoading && <h2>Loading...</h2>}

            {data.data.map(person => {
                return (
                    <div key={person.id}>
                        {/* <h2>{person.email}</h2> */}

                        <br />
                    </div>
                );
            })}
        </div>
    );
};

export default GamesCompareJapanEUPAL;