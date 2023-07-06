import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SAMPLE_EVENTS } from '../../models/Product';
import { NFTUtils } from '../../utils/NFTUtils';

function EventDetail() {
  const {eventId} = useParams();
  const event = SAMPLE_EVENTS.find(value => value.slug === eventId)!;
  const [destinationAddress, setDestinationAddress] = useState('0x27F7e8d7C63C414Eae2BB07E1a9B9057a1D382cf');

  const transferNFT = async (event: React.MouseEvent<HTMLButtonElement>, nftAddress: string, tokenId: string) => {
    event.preventDefault();
    await NFTUtils.transferNFT(nftAddress, tokenId, destinationAddress);
  };

  return (
    <div className='EventDetail container card shadow my-5 p-5'>
      <h1 className='text-center mb-3'>
        {event.title}
      </h1>
      <div className="container">
        <div className="card shadow-sm">
          <img src={event.image} width={300} alt={event.title} />

          <div className="card-body">
            <p className="card-text">
              {event.description}
            </p>
            
            <input
              type="text"
              placeholder="Enter Destination Address"
              value={destinationAddress}
              onChange={e => setDestinationAddress(e.target.value)}
              className="form-control mb-3"
            />
            
            <button className='btn btn-primary m-3' onClick={clickEvent => transferNFT(clickEvent, event.address, event.tokenId)}>
              Transfer NFT
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EventDetail;
