import React from 'react';
import { useSelector } from 'react-redux';

export default function MediaItemDetails(props) {
  let mediaItemDetails = useSelector((state) => state.media_reducer.mediaItemDetails);  

  if (mediaItemDetails) {
    return (
      <>
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
          {
            Object.keys(mediaItemDetails).map((key, index) => {
              return (
                <div key={index} style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden' }}>
                  <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', width: '150px' }}>
                    {key}:
                  </div>
                  <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>{mediaItemDetails[key]}</div>
                </div>
              );
            })
          }
        </div>
      </>
    )
  } else
    return <></>
}