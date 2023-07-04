import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';
import { useNavigate, useLocation } from 'react-router-dom';
import { addCategory, editCategory } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';

const styles = {
  textfield: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '5px',
    width: '100%',
    background: 'white',
    borderRadius: '20px',
    transform: "scale(1)"
  },
  smallTextfield: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '0px',
    width: 'auto',
    background: 'white',
    borderRadius: '20px'
  }
}

export default function CategoryItemNew(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const { categoryItemDetails } = useSelector(state => ({ categoryItemDetails: state.categories_reducer.categoryItemDetails }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.categories_reducer.categoriesList }));
  const { newItemAdded } = useSelector(state => ({ newItemAdded: state.categories_reducer.newItemAdded }));
  const { itemChanged } = useSelector(state => ({ itemChanged: state.categories_reducer.itemChanged }));

  const [id, setId] = useState(location.state.isNew === 2 && categoryItemDetails && categoryItemDetails.Id || '');
  const [name, setName] = useState(location.state.isNew === 2 && categoryItemDetails && categoryItemDetails.Name || '');
  const [hasSubCategories, setHasSubCategories] = useState((location.state.isNew === 2 && categoryItemDetails && categoryItemDetails.HasSubCategories) || false);
  const [isSubCategory, setIsSubCategory] = useState((location.state.isNew === 2 && categoryItemDetails && categoryItemDetails.ParentId > 0) || false);
  const [parentId, setParentId] = useState(location.state.isNew === 2 && categoryItemDetails && categoryItemDetails.ParentId || 0);

  function renderSelectOptions() {

    return categoriesList.map((item, index) => {
      if (item.HasSubCategories === 1) {
        return <option style={{ fontSize: '16px', padding: '10px' }} value={item.Id}>{item.Name}</option>;
      }
    })
  }
  function renderSelectCategories() {
    if (isSubCategory === true)
      return <div style={{ textAlign: 'left' }}>
        <select
          onChange={(e) => { setParentId(e.target.value); }}
          style={{ width: '200px', height: '30px', fontSize: '20px', margin: '10px', marginLeft: '10px' }}
          name='categories'
          id='categories'>
          {renderSelectOptions()}
        </select>
      </div>
  }

  if (newItemAdded === true || itemChanged === true) {
    dispatch({ type: 'SET_ADDED_NEWCATEGORYITEM', payload: false });
    navigate(-1);
  } else {
    return <HomeWrapper>
      <form
        style={{
          background: 'lightyellow',
          height: '100%',
          display: 'flex',
          flexFlow: 'row',
          flex: 1,
          flexWrap: 'wrap',
          overflowY: 'scroll',
          verticalAlign: 'top',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
        onSubmit={(e) => {
          e.preventDefault();

          var data = {};
          data.id = id;
          data.name = name;
          data.hassubcategories = hasSubCategories;
          data.parentid = 0;
          if (isSubCategory === true) {
            if (parentId > 0)
              data.parentid = parentId;
            else {
              for (var i = 0; i < categoriesList.length; i++) {
                var item = categoriesList[i]
                if (item.HasSubCategories === 1) {
                  data.parentid = item.Id;
                  break;
                }
              }
            }
          }

          if (location.state.isNew === 2)
            dispatch(editCategory(data));
          else
            dispatch(addCategory(data));
        }}>
        <div style={{
          overflowX: 'hidden',
          width: '50%',
          padding: '40px'
        }}>
          <div style={{ marginTop: '10px' }}>
            <TextField
              required
              type="text"
              label="Όνομα Κατηγορίας"
              variant='outlined'
              style={styles.textfield}
              value={name}
              onChange={(e) => { setName(e.target.value); }}
              inputProps={{ style: styles.textfield }}
            />
          </div>
          <div style={{ display: 'flex', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', marginTop: '20px' }}>
            <div style={{ fontSize: 24, textAlign: 'left' }}>
              <Checkbox
                defaultChecked={false}
                color='primary'
                checked={hasSubCategories}
                style={{ transform: "scale(2)" }}
                onChange={e => setHasSubCategories(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <span>Έχει υποκατηγορίες</span>
            </div>
            <div style={{ fontSize: 24, marginTop: '20px', textAlign: 'left' }}>
              <Checkbox
                defaultChecked={false}
                color='primary'
                checked={isSubCategory}
                style={{ transform: "scale(2)" }}
                onChange={e => setIsSubCategory(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <span>Είναι υποκατηγορία</span>
              {renderSelectCategories()}
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center', fontSize: '20px', marginLeft: '10px' }}>
              
            </div> */}
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', textAlign: 'right', marginTop: '20px' }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ margin: '5px', textTransform: 'none', fontSize: '16px' }}>
              <SaveAltIcon />
              Αποθήκευση
            </Button>
            <Button
              variant="contained"
              style={{ margin: '5px', background: 'orangered', textTransform: 'none', fontSize: '16px' }}
              onClick={() => { navigate(-1); }}>
              <CancelAltIcon />
              Ακύρωση
            </Button>
          </div>
        </div>
      </form>
    </HomeWrapper>
  }
}