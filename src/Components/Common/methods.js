import Button from '@material-ui/core/Button';

import store from '../../Redux/Store/store';
import { getDateFormat, renderHtml } from '../../Helper/helpermethods';

export function showSnackbarMessage(response, message) {
  var snackbarInfo = {};
  snackbarInfo.openMessage = true;
  if (response.value.success === true) {
    snackbarInfo.message = message;
    snackbarInfo.variant = 'success';
  } else {
    snackbarInfo.message = 'H προσπάθεια απέτυχε! ' + (response.value.message || '');
    snackbarInfo.variant = 'error';
  }

  store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
}

export function showFailedConnectWithServerMessage(error) {
  var snackbarInfo = {};
  snackbarInfo.openMessage = true;
  snackbarInfo.message = 'Αποτυχία σύνδεσης στον διακομιστή!';
  snackbarInfo.variant = 'error';
  store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
}

export function renderComments(pageItemDetails, selectedTab, showActions, renderApprovedButton, renderRejectedButton) {
  if (pageItemDetails && pageItemDetails.comments) {
    var commentsToRender = [];
    if (selectedTab === 1) {
      if (pageItemDetails.CommentNeedsApproval === 1)
        commentsToRender = pageItemDetails.comments.filter(comment => comment.isapproved === 1)
      else
        commentsToRender = pageItemDetails.comments
    }
    else if (selectedTab === 2)
      commentsToRender = pageItemDetails.comments.filter(comment => comment.isrejected === 1)
    else if (selectedTab === 3)
      commentsToRender = pageItemDetails.comments.filter(comment => comment.isapproved === 0 && comment.isrejected === 0)

    if (commentsToRender) {
      return commentsToRender.map((item, index) => {
        return <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flex: '1', background: '#0072A0', paddisdfng: '5px', fontWeight: 'bold', fontSize: '1rem', padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1', background: '#0072A0', padding: '5px', fontWeight: 'bold' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>{item.firstname} {item.lastname} {item.direction && item.department ? ',' : ''} {item.direction || ''} {item.direction ? '-' : ''} {item.department || ''}</span>
              <div style={{ display: 'flex', flex: '1', justifyContent: 'start', color: 'white', marginleft: '15px', fontSize: '12px' }}><i>{getDateFormat(item.created)}</i></div>
            </div>
          </div>
          <span>{renderHtml(item.content)}</span>
          {showActions === true ? <div className="flex-row">
            {renderApprovedButton(pageItemDetails, item)}
            <span style={{ marginLeft: '15px' }}></span>
            {renderRejectedButton(pageItemDetails, item)}
          </div> : <></>
          }
        </div>
      })
    }
    else
      return <></>
  }
}
// export function renderComments(pageItemDetails, selectedTab) {
//   if (pageItemDetails && pageItemDetails.comments) {
//     return pageItemDetails.comments.map((item, index) => {
//       if (item.isapproved === 1) {
//         return <div style={{ display: 'flex', flexDirection: 'column', flex: '1', marginBottom: '10px' }}>
//           <div style={{ display: 'flex', flexDirection: 'column', flex: '1', background: '#0072A0', padding: '5px', fontWeight: 'bold' }}>
//             <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>{item.firstname} {item.lastname} {item.direction && item.department ? ',' : ''} {item.direction || ''} {item.direction ? '-' : ''} {item.department || ''}</span>
//             <div style={{ display: 'flex', flex: '1', justifyContent: 'start', color: 'white', marginleft: '15px', fontSize: '12px' }}><i>{getDateFormat(item.created)}</i></div>
//           </div>
//           <span>{renderHtml(item.content)}</span>
//         </div>
//       }
//     })
//   }
// }