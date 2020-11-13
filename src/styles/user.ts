import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useUserStyles = makeStyles((theme: Theme) =>
 createStyles({
  loginBox: {
   marginTop: theme.spacing(8),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   '& > h1': {
    fontSize: '1.3rem',
   }
  },
  loginError: {
   width: '100%',
  },
  loginAvatar: {
   margin: theme.spacing(1),
   backgroundColor: theme.palette.secondary.main,
  },
  loginForm: {
   width: '100%', // Fix IE 11 issue.
   marginTop: theme.spacing(1),
   '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
   }
  },
  loginSubmit: {
   margin: theme.spacing(3, 0, 2),
  },
 })
);