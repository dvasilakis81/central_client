import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function LogItemDetails(props) {
  const { logItemDetails } = useSelector((state) => ({ logItemDetails: state.logs_reducer.logItemDetails }));

  if (logItemDetails) {
    return (
      <div>
        {renderDetail('Code', logItemDetails.Code, { isText: true })}
        {renderDetail('Errno', logItemDetails.Errno, { isText: true })}
        {renderDetail('Message', logItemDetails.Message, { isText: true })}
        {renderDetail('Sql', logItemDetails.Sql, { isText: true })}
        {renderDetail('SqlMessage', logItemDetails.SqlMessage, { isText: true })}
        {renderDetail('SqlState', logItemDetails.SqlState, { isText: true })}
        {renderDetail('Created', logItemDetails.Created, { isDate: true })}
      </div>
    )
  } else
    return <></>
}