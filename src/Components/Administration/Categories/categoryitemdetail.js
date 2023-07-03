import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function CategoryItemDetails(props) {
  const { categoriesList } = useSelector(state => ({ categoriesList: state.categories_reducer.categoriesList }));
  const { categoryItemDetails } = useSelector((state) => ({ categoryItemDetails: state.categories_reducer.categoryItemDetails }));
  function renderParentCategoryName(parentId) {
    var ret = '';

    if (parentId > 0) {
      if (categoriesList) {
        for (var i = 0; i < categoriesList.length; i++) {
          var item = categoriesList[i]
          if (item.Id === parentId) {
            ret = item.Name;
            break;
          }
        }
      }
    }

    return ret;
  }
  if (categoryItemDetails) {
    return (<div style={{ overflowY: 'scroll' }}>
      {renderDetail('Όνομα ', categoryItemDetails.Name, { isText: true })}
      {renderDetail('Έχει υποκατηγορίες ', categoryItemDetails.HasSubCategories, { isCheckbox: true })}
      {renderDetail('Είναι υποκατηγορία ', categoryItemDetails.ParentId > 0, { isCheckbox: true })}
      {categoryItemDetails.ParentId > 0 ? renderDetail('Κάτω από ', renderParentCategoryName(categoryItemDetails.ParentId), { isText: true }) : <></>}      
      {renderDetail('Δημιουργήθηκε', categoryItemDetails.Created, { isDate: true })}
      {renderDetail('Ενημερώθηκε', categoryItemDetails.Updated, { isDate: true })}
    </div>)
  } else
    return <></>
}