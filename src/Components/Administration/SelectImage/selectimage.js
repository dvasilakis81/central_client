import { useState } from 'react';
import { useSelector} from 'react-redux';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import { addHostUrl } from '../../../Helper/helpermethods';

export function SelectOption(props) {
  const { mediaItemsList } = useSelector(state => ({
    mediaItemsList: state.media_reducer.mediaItemsList
  }));
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const popoverid = open ? 'simple-popover' : undefined;
  const selectIcon = (item) => {
    console.log(item.Name);
    props.setImage(item.Url);
    //props.setUrl(item.Url);
  };
  const handleOpenSelectIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSelectIcon = () => {
    setAnchorEl(null);
  };
  // const [icons, setIcons] = useState([]);
  // useEffect(() => {
  //   axios.get("fontawesome.json").then((res) => {
  //     console.log('icons: ' + res.data);
  //     res.data && res.data.map((item) => {
  //       console.log(item.label);});
  //     //setIcons(res.data); 
  //   }).catch((err) => console.log(err));
  // }, []);

  return <><div onClick={handleOpenSelectIcon}>ΕΠΙΛΟΓΗ</div>
    <Popover
      id={popoverid}
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseSelectIcon}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      background='green' >
      <div style={{ width: '350px', maxHeight: '500px' }}>
        {
          props.imagetype === 1 ? mediaItemsList && mediaItemsList.map((item) => {
            return (<div style={{ display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f6f7' }} onClick={(e) => { selectIcon(item) }}>
              <img src={addHostUrl(item.Url)} style={{ padding: '10px' }} width={50} height={50} />
              <div key={item.Id} style={{ width: 'auto', background: 'none', display: 'flex', justifyContent: 'center', padding: '10px' }}>
                {item.Name}
              </div>
            </div>)
          }) :
            (<div style={{ display: 'flex', flex: '1', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f6f7' }}>
              Επισκεφθείτε το <a href="https://fontawesome.com/v5/search?o=r&m=free" target="_blank">FontAwesome</a>
            </div>)
        }
      </div>
    </Popover>
  </>
}

export default function SelectImage(props) {
  //console.log('props.image: ' + JSON.stringify(props.image));
  return <>
    <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 5, flex: '1' }}>
      <TextField
        type="text"
        variant='outlined'
        label={props.label}
        value={props.image}
        isRequired={true}
        onChange={props.setImage}
        style={props.customstyle}
        InputLabelProps={{ shrink: true }}
        inputProps={{ style: { textAlign: 'Left' } }}
        InputProps={{ endAdornment: <SelectOption setImage={props.setImage} imagetype={props.imagetype} /> }}
      />
      {/* <Button variant="contained" onClick={handleOpenSelectIcon}
        style={{
          flex: '0.1',
          height: '40px',  
          background: 'blue',
          color: 'white',          
          textAlign: 'center',
          fontSize: '16px',
          padding: '0px',
          justifyContent: 'center',
          verticalAlign: 'center'          
        }}>
        Επιλογή
      </Button> */}
    </div>

  </>
}