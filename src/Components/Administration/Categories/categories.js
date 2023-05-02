import { useSelector } from 'react-redux';

import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import store from '../../../Redux/Store/store';

export default function Categories() {
  const { opencategories } = useSelector(state => ({ opencategories: state.parametricdata_reducer.opencategories }));
  const { screenDimensions } = useSelector(state => ({ screenDimensions: state.parametricdata_reducer.screenDimensions }));
  console.log('render categories');

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ background: 'red', width: '500px', height: '500' }}>
      <Popover
        open={opencategories}
        onClose={() => { store.dispatch({ type: 'CLOSE_CATEGORIES', payload: false }) }}
        anchorReference="anchorPosition"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        style={{ transform: document.getElementById('root').style.transform, width: '500px', height: '500px', background: 'red' }}>
        asdfsadfasdf

        asdfsadfas
        dateFormatas
        dateFormatasdf
      </Popover>
    </div>
  </div>
}