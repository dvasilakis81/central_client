import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function CategoryItemDetails(props) {
  // const { pageItemsList } = useSelector(state => ({ pageItemsList: state.page_reducer.pageItemsList }));
  const { categoryItemDetails } = useSelector((state) => ({ categoryItemDetails: state.categories_reducer.categoryItemDetails }));
  if (categoryItemDetails) {
    return (<div style={{ overflowY: 'scroll' }}>
      {renderDetail('Όνομα', categoryItemDetails.Name, { isText: true })}      
      {renderDetail('Έχει υποκατηγορίες', categoryItemDetails.HasSubCategories, { isCheckbox: true })}
      {renderDetail('Είναι υποκατηγορία', categoryItemDetails.ParentId > 0, { isCheckbox: true })}
      {/* {renderDetail('Πρώτη σελίδα', categoryItemDetails.Showonfirstpage, { isCheckbox: true })}
      {renderDetail('Δημιουργήθηκε', categoryItemDetails.Created, { isDate: true })}
      {renderDetail('Ενημερώθηκε', categoryItemDetails.Updated, { isDate: true })} */}
    </div>)
  } else
    return <></>
}