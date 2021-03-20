import React from 'react';
import { useParams } from 'react-router-dom';
import Map from '../Map/Map';
import './Destination.css';


const Destination = () => {
    const { name } = useParams();
    return (
        <div class="container">
            <div class="row">
                <div class="search-card col-xs-6">
                    <h4 class="text-center">Let's book a {name} Ride</h4>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputpickpoint" class="form-label">Pick From</label>
                            <input type="name" class="form-control" id="exampleInputEmail1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputpickpoint" class="form-label">Pick To</label>
                            <input type="name" class="form-control" id="exampleInputEmail1" />
                        </div>
                        <br />
                        <button type="submit" class="btn btn-primary">
                            Search
                        </button>
                    </form>
                </div>
                <div class="col-xs-6">
                    <Map></Map>
                </div>
            </div>
        </div>
    );
};

export default Destination;