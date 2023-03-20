import React, { Component } from 'react';
import ConsultationsPageBody from './ConsultationsPageBody';
import Header from '../Header/header'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const toggleDrawer = (anchor, open) => (event) => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
  }

  //setState({ ...state, [anchor]: open });
};

const list = (anchor) => (
  <div
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </div>
);

class InitialPage extends Component {

  render() {
    // console.log('asdfsdf asdf ');
    // return <div style={{ width: '100%', height: '100%', background: "red" }}>
    //   asdf
    // </div>    
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Header
          title="Διαβουλεύσεις"
          showAdministrationOption={true}/>
          
        <InitialPageBody style={{ overflowY: 'hidden' }} />
      </div>
    );
  }
}

export default InitialPage;