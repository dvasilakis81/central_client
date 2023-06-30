import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-input": {
      color: 'blue',
      backgroundColor: 'white',
      fontSize: '22px'
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: 'blue',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: '1px solid blue'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid blue",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '2px solid blue'
    }
  }
});

const searchBarColor = '#00008b';
export const searchBarStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: '2px solid ' + searchBarColor
    },
    "& .MuiInputAdornment-root ": {
      color: searchBarColor
    },
    "& .MuiIconButton-root ": {
      color: searchBarColor
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid " + searchBarColor,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '4px solid ' + searchBarColor
    },
    "& .MuiInputBase-input": {
      color: searchBarColor,
      fontSize: '24px'
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: searchBarColor,
      fontSize: '18px',
      fontWeight: 'normal'
    },
    "& .MuiSvgIcon-root": {
      width: '2rem',
      height: '2rem'
    },
    "& .MuiFormLabel-root": {
      fontSize: '18px',
      fontWeight: 'bolder'
    }
  }
});

export const inputTextfieldStyle = makeStyles({ 
  root: {
    "& .MuiInputLabel-root":{
      color: 'blue'
    },
    "& .MuiInputBase-input": {
      color: 'blue',
      backgroundColor: 'white',
      fontSize: '22px'
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      color: 'blue',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: '1px solid blue'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid blue",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '2px solid blue'
    },
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "gray"
        },
        color: "white", // if you also want to change the color of the input, this is the prop you'd use
      }
    }
  }
});
