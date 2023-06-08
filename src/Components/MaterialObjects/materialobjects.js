import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';

export function getSelectFieldWithTooltip(tl, id, label, values, isRequired, style, setValue) {

  return (<Tooltip
    placement="top"
    title={tl}>
    {getSelectField(id, label, values, isRequired, style, setValue)}
  </Tooltip>)
}

const StyledTooltip = withStyles({
  tooltip: {
    color: 'black',
    backgroundColor: 'grey',
    border: '1px solid black',
    transform: document.getElementById('root').style.transform
  }
})(Tooltip);

export function getSelectField(id, label, values, selectedValue, isRequired, style, setValue) {

  return <TextField
    required={isRequired}
    select
    id={id}
    value={selectedValue}
    label={label}
    style={style}
    onChange={setValue}
    InputProps={{ style: { fontSize: 14 } }}
    SelectProps={{ native: true }}
    variant="outlined">
    <option />
    {values}
  </TextField>
}

export function getTextFieldWithTooltip(tl, type, id, label, variant, stateValue, isRequired, style, isDisabled, inputProps, inputLabelProps, setValue) {

  return (<StyledTooltip
    placement="top"
    disableHoverListener={true}
    title={
      <React.Fragment>
        <Typography
          color="transparent"
          style={{
            background: "transparent",
            padding: "0px",
            margin: "0px",
            transform: document.getElementById('root').style.transform
          }}>
          {tl}
        </Typography>
      </React.Fragment>
    }>
    {getTextField(type, id, label, variant, stateValue, isRequired, style, isDisabled, inputProps, inputLabelProps, setValue)}
  </StyledTooltip>)
  // return (<Tooltip
  //   placement="top"
  //   disableHoverListener={true}
  //   style={{
  //     width:'auto',
  //     padding: "0px",
  //     margin: "0px"
  //   }}
  //   title={
  //     <React.Fragment>
  //       <Typography
  //         color="transparent"
  //         style={{
  //           background: "transparent",
  //           padding: "0px",
  //           margin: "0px",
  //           transform: document.getElementById('root').style.transform
  //         }}>
  //         {tl}
  //       </Typography>
  //     </React.Fragment>
  //   }>
  //   {getTextField(type, id, label, variant, stateValue, isRequired, style, isDisabled, inputProps, inputLabelProps, setValue)}
  // </Tooltip>)
}

export function getTextFieldMultiline(rows, type, id, label, variant, stateValue, isRequired, style, isDisabled, inputProps, inputLabelProps, setValue) {

  return <TextField
    multiline={true}
    rows={rows}
    disabled={isDisabled}
    required={isRequired}
    type={type}
    id={id}
    label={label}
    value={stateValue}
    variant={variant}
    style={style}
    onChange={setValue}
    InputProps={inputProps}
    InputLabelProps={inputLabelProps} />
}

export function getTextField(type, id, label, variant, stateValue, isRequired, style, isDisabled, inputProps, inputLabelProps, onChange) {

  return <TextField
    disabled={isDisabled}
    required={isRequired}
    type={type}
    id={id}
    label={label}
    value={stateValue}
    variant={variant}
    style={style}
    onChange={onChange}
    InputProps={inputProps}
    InputLabelProps={inputLabelProps}
    size='small'
  />
}

export function getCheckboxField(id, label, stateValue, style, setValue) {

  return (<FormControlLabel style={style} control={
    <Checkbox
      id={id}
      checked={stateValue}
      onChange={setValue}
      color="primary"
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  }
    label={label} />)

}

export function getSnackbar(state, duration, handleClose, vertical, horizontal, padding, fontSize, style) {
  return (<Snackbar
    anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
    open={state.openMessage}
    autoHideDuration={duration}
    onClose={handleClose}
    style={style} >
    <SnackbarContent
      onClose={handleClose}
      message={state.message}
      style={{ backgroundColor: state.bgColorMessage, color: state.fgColorMessage, padding: padding, fontSize: fontSize, maxWidth: 450 }}
    />
  </Snackbar>)
}

export function getButton(variant, size, color, style, onclick, label, icon, disabled) {
  return (<Button
    disabled={disabled}
    variant={variant ? variant : ''}
    size={size ? size : ''}
    color={color ? color : ''}
    style={style}
    onClick={onclick}>
    {label}
    {icon}
  </Button>)
}

export function getSubmitButton(variant, color, style, onclick, label, icon, disabled) {
  return (<Button
    type='submit'
    disabled={disabled}
    variant={variant}
    color={color}
    style={style}
    onClick={onclick}>
    {label}
    {icon}
  </Button>)
}

