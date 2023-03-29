import React from 'react';
import { useSelector } from 'react-redux';

export default function AnnouncementItemDetails(props) {
  let announcementItemDetails = useSelector((state) => state.announcement_reducer.announcementItemDetails);  

  if (announcementItemDetails) {
    return (
      <>
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
          {
            Object.keys(announcementItemDetails).map((key, index) => {
              return (
                <div key={index} style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden'  }}>
                  <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', width: 'auto', minWidth: '250px'}}>
                    {key}:
                  </div>
                  <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>{announcementItemDetails[key]}</div>
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