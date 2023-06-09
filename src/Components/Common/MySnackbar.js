import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning'
import { successBgColor, successFgColor, errorBgColor, errorFgColor, infoBgColor, infoFgColor } from '../Common/colors';

import { getHeaderHeight, getFooterHeight } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';

const variantBgColor = {
  'success': successBgColor(),
  'warning': 'yellow',
  'error': errorBgColor(),
  'info': infoBgColor(),
};
const variantFgColor = {
  'success': successFgColor(),
  'warning': 'yellow',
  'error': errorFgColor(),
  'info': infoFgColor(),
};

const styles = {
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9
  },
  message: {
    display: 'flex',
    alignItems: 'left',
  },
};

function getIcon(variant) {

  if (variant === 'success')
    return <CheckCircleIcon className={clsx(styles.icon, styles.iconVariant)} />
  else if (variant === 'warning')
    return <WarningIcon className={clsx(styles.icon, styles.iconVariant)} />
  else if (variant === 'error')
    return <ErrorIcon className={clsx(styles.icon, styles.iconVariant)} />
  else if (variant === 'info')
    return <InfoIcon className={clsx(styles.icon, styles.iconVariant)} />
  else
    return <></>

}

export default function MySnackbar(props) {

  const [duration, setDuration] = useState(10000);
  const { screenDimensions } = useSelector(state => ({ screenDimensions: state.parametricdata_reducer.screenDimensions }));
  const { snackBarInfo } = useSelector(state => ({ snackBarInfo: state.parametricdata_reducer.snackBarInfo }));

  let width = 10;
  // let left = screenDimensions ? screenDimensions.width - (width + 50) : 0;
  // let top = screenDimensions.height - (getHeaderHeight() + getFooterHeight() + 150);
  // let left = screenDimensions ? screenDimensions.width - (width + 50) : 0;

  let top = screenDimensions ? (screenDimensions.height - (getHeaderHeight() + getFooterHeight())) / 2 : 0;
  let left = screenDimensions ? screenDimensions.width / 2 : 0;
  let style = { width: '0px', position: 'absolute', left: left, top: top }
  
  const bgColor = variantBgColor[snackBarInfo?.variant || ''];
  const fgColor = variantFgColor[snackBarInfo?.variant || ''];

  return (
    <Snackbar
      anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
      open={snackBarInfo?.openMessage || false}
      autoHideDuration={duration}
      onClose={() => {
        var snackbarInfo = {};
        snackbarInfo.openMessage = false;
        snackbarInfo.message = '';
        snackbarInfo.variant = '';
        store.dispatch({ type: 'CLOSE_SNACKBAR', payload: snackbarInfo });
      }}
      style={style}>
      <SnackbarContent
        message={
          <div style={{ display: 'flex', flex: '1', flexFlow: 'row' }}>
            {getIcon(snackBarInfo?.variant || '')}
            <div style={{ flexGrow: '1', flexFlow: 'column', paddingLeft: '5px', paddingRight: '5px', wrap: true }}>
              {snackBarInfo?.message || ''}
            </div>
          </div>
        }
        style={{ backgroundColor: bgColor, color: fgColor, padding: '20px', fontSize: '20px', textAlign: 'left' }}
      />
    </Snackbar>
  )
}