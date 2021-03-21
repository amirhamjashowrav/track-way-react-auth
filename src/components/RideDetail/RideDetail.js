import React from 'react';
import Map from '../Map/Map';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/Data';

const RideDetail = () => {
    const { id } = useParams();
    const detail = fakeData.find(detail=> detail.id === id)

    const cardStyle = {
        marginTop: '50px',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 0 10px black',
        height: '350px',
        width: '350px'
    }
    
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-4" style={cardStyle}>
                    
                   
                </div>
                <div class="col-md-8">
                    <Map></Map>
                </div>
            </div>
        </div>
    );
};

export default RideDetail;