import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { inputTextfieldStyle } from '../Styles/styles'

export default function CreatePageComment(props) {
  const dispatch = useDispatch();
  let pageInfo = useSelector((state) => state.page_reducer.pageInfo);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const classes = inputTextfieldStyle();

  if (pageInfo.CanComment === 1)
    return <form style={{ display: 'flex', flexDirection: 'column', border: '1px dashed blue', padding: '10px'}}>
      <div style={{ marginTop: '10px' }}>
        <TextField
          required
          type="text"
          label="Στοιχεία Χρήστη"
          variant='outlined'
          value={name}
          style={{width: '800px'}}
          onChange={(e) => { setName(e.target.value); }}
          className={classes.root}
          inputProps={{ className: classes.root }}
        />
      </div>
      <div style={{ marginTop: '30px' }}>
        <ReactQuill          
          value={value}
          onChange={setValue} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button
          disabled={false}
          type='submit'
          style={{ fontSize: '18px', textAlign: 'center', backgroundColor: 'blue', color: 'white' }}>
          ΔΗΜΙΟΥΡΓΙΑ NEOY ΣΧΟΛΙΟΥ
        </Button>
      </div>
    </form>
  else
    <></>
}