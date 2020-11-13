import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useHomeStyles = makeStyles((theme: Theme) =>
 createStyles({
  header: {
   display: 'flex',
   flexDirection: 'row-reverse',
   alignItems: 'center',
   padding: theme.spacing(1, 2),
   '& > h2': {
    fontSize: '1.1rem',
    marginRight: theme.spacing(1),
   }
  },

  list: {
   backgroundColor: theme.palette.background.paper,
  },
  listItem: {
   listStyle: 'none',
   padding: theme.spacing(1, 0, 1, 2),
   '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '1.2rem',
   }
  },

  add: {
   padding: theme.spacing(1, 2),
  }
 }),
);
