import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/Data';
import Transport from '../../components/Transport/Transport';


const Home = () => {
    const [transports, setTransports] = useState([]);

    useEffect(()=>{
        setTransports(fakeData);
    },[])
    return (
        <div >
           {
               transports.map(transport => <Transport transport={transport}></Transport>)
           }
        </div>
    );
};

export default Home;