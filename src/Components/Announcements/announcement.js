import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAnnouncements } from '../../Redux/Actions';
import { useNavigate } from "react-router-dom";

export default function Announcements() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { announcementsList } = useSelector(state => ({ announcementsList: state.announcement_reducer.announcementsList }));
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };
  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);


  return  <div style={{ display: 'flex', background: '#9FFF33', flexDirection: 'column', opacity: '0.8', margin: 'auto', marginTop:'10px', width: '700px' }}>
    {
      announcementsList && announcementsList.map((d, index) => {
        if (d.Hidden === 0)
          return (<div
            key={index}
            onMouseEnter={(e) => handleMouseEnter(e, d)}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              if (d.PageUrl)
                navigate('/' + d.PageUrl);
              else
                if (d.Url)
                  window.open(d.Url, '_blank', 'noreferrer');
            }}
            className={hoveredKey === d ? 'hovereditem' : 'announceitem'}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: '0.05', marginLeft: '15px' }}>
                {index + 1}.
              </div>
              <div style={{ flex: '1', marginLeft: '15px' }}>
                {d.Name}
              </div>
            </div>
          </div>
          )
        else <></>
      })
    }
  </div>
}