import React from 'react';
import { useHistory } from 'react-router-dom';
import './Transport.css';

const Transport = (props) => {
    console.log(props);
    const {name, img } = props.transport;

    const history = useHistory();

    const handleRide = (name) => {
        history.push(`/destination/${name}`);
    }

    return (
        <div className = 'column col-lg-4 col-sm-12'>
                <div className = 'card'>
                    <img src={img} alt=""/>
                    <button onClick={() => handleRide(name)} className = 'btn btn-primary button'>RIDE FOR {name}</button>
                </div>
            </div>
    );
};

export default Transport;