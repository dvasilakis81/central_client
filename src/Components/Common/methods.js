import store from '../../Redux/Store/store';
import { getDateFormat, renderHtml } from '../../Helper/helpermethods';

export function setOpenChangePassword(payload) {
  store.dispatch({ type: 'OPEN_CHANGE_PASSWORD', payload: payload });
}
export function setSelectedCentralMenuItem(menuitem) {
  store.dispatch({ type: 'SET_SELECTED_CENTRAL_MENU', payload: menuitem })
}
export function setHeaderTitle(headerTitle) {
  store.dispatch({ type: 'SET_HEADER_TITLE', payload: headerTitle })
}
export function showSnackbarMessage(response, message) {
  var snackbarInfo = {};
  snackbarInfo.openMessage = true;
  if (response) {
    if (response.value.success === true) {
      snackbarInfo.message = message;
      snackbarInfo.variant = 'success';
    } else {
      snackbarInfo.message = 'H προσπάθεια απέτυχε! ' + (response.value.message || '');
      snackbarInfo.variant = 'error';
    }
  } else {
    snackbarInfo.message = message;
    snackbarInfo.variant = 'info';
  }

  store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
}
export function showSnackbarInfoMessage(message) {
  var snackbarInfo = {};
  snackbarInfo.openMessage = true;
  snackbarInfo.message = message;
  snackbarInfo.variant = 'info';

  store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
}
export function showFailedConnectWithServerMessage(error) {
  var snackbarInfo = {};
  snackbarInfo.openMessage = true;
  snackbarInfo.message = 'Αποτυχία σύνδεσης στον διακομιστή!';
  snackbarInfo.variant = 'error';
  store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
}
export function renderComments2(pageItemDetails, selectedTab, showActions, renderApprovedButton, renderRejectedButton) {
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
          <div style={{ display: 'flex', flexDirection: 'row', flex: '1', background: '#0072A0', fontWeight: 'bold', fontSize: '1rem', padding: '5px' }}>
            <i className='fa fa-person' style={{ color: 'white', fontSize: '40px', padding: '5px' }}></i>
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1', background: '#0072A0', padding: '0px', fontWeight: 'bold' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>{item.firstname} {item.lastname} {item.direction && item.department ? ',' : ''} {item.direction || ''} {item.direction ? '-' : ''} {item.department || ''}</span>
              <div style={{ display: 'flex', flex: '1', justifyContent: 'start', color: 'white', marginleft: '15px', fontSize: '16px' }}><i>{getDateFormat(item.created)}</i></div>
            </div>
          </div>
          <span style={{ margin: '20px' }}>
            {renderHtml(item.content)}
          </span>
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
function renderSignature(item) {
  if (item.firstname || item.lastname || item.direction || item.department)
    return <span style={{ marginLeft: '5px' }}>| {item.firstname} {item.lastname} {item.direction && item.department ? ',' : ''} {item.direction || ''} {item.direction ? '-' : ''} {item.department || ''}</span>
  else
    return <span style={{ marginLeft: '5px' }}>| Ανώνυμος</span>;
}
function divComments(pageItemDetails, commentsToRender, showActions, renderApprovedButton, renderRejectedButton) {
  return commentsToRender.map((item, index) => {
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={index % 2 === 0 ? 'comment-item-event' : 'comment-item'}>
        <div className='comment-user'>
          <span>{getDateFormat(item.created)}</span>
          {renderSignature(item)}
        </div>
        <div style={{ marginTop: '5px' }}>
          {renderHtml(item.content)}
        </div>
        {showActions === true ? <div className="flex-row">
          {renderApprovedButton(pageItemDetails, item)}
          <span style={{ marginLeft: '15px' }}></span>
          {renderRejectedButton(pageItemDetails, item)}
        </div> : <></>
        }
      </div>
    </div>
  })
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

    if (commentsToRender && commentsToRender.length > 0) {
      return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div class='comment-nav'>{commentsToRender.length} Σχόλια</div>
        {divComments(pageItemDetails, commentsToRender, showActions, renderApprovedButton, renderRejectedButton)}
      </div>
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