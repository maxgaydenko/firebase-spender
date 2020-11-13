import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useOutlayStyles = makeStyles((theme: Theme) =>
 createStyles({
  root: {},
  outlayBox: {},
  outlayNav: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingTop: theme.spacing(1),
   paddingBottom: theme.spacing(1),
   paddingRight: theme.spacing(1),
   paddingLeft: theme.spacing(.5),
   borderBottomWidth: 1,
   borderBottomStyle: 'solid',
   borderBottomColor: theme.palette.background.default,
   // backgroundColor: theme.palette.background.paper,
   // '& h1': {
   //  fontSize: '1.5rem',
   // },
   // '& .search': {
   //  // color: theme.palette.primary.main,
   // }
  },
  outlayHeader: {
   display: 'flex',
   alignItems: 'center',
   '& a': {
    // color: theme.palette.primary.main,
    // marginRight: theme.spacing(1),
   },
   '& h1': {
    fontSize: '1.5rem',
    '& a': {
     opacity: 0,
     marginLeft: theme.spacing(1),
     transition: 'opacity 350ms linear',
    }
   },
   '& h1:hover': {
    '& a': {
     opacity: 1,
    }
   }
  },

  outlayFilter: {
   padding: theme.spacing(2),
  },

  outlayList: {
   paddingBottom: '96px !important',
   position: 'relative',
   backgroundColor: theme.palette.background.paper,
   // overflow: 'auto',
   '& > *': {
   }
  },
  outlayListSection: {
   backgroundColor: theme.palette.background.paper,
  },
  outlayListDate: {
   borderBottomWidth: 1,
   borderBottomStyle: 'solid',
   borderBottomColor: theme.palette.background.default,
   // backgroundColor: theme.palette.background.default,
   // backgroundColor: 'pink',
  },
  outlayListRecord: {
   backgroundColor: theme.palette.background.paper,
   listStyle: 'none',
   padding: 0,
  },

  outlaySummary: {
   position: 'fixed',
   zIndex: theme.zIndex.appBar,
   bottom: 0,
   left: 0,
   right: 0,
   backgroundColor: theme.palette.primary.dark,
   color: theme.palette.primary.contrastText,
   paddingTop: theme.spacing(1),
   paddingBottom: theme.spacing(1),
   paddingLeft: 0,
   paddingRight: 0,
  },
  outlaySummaryWrapper: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingLeft: theme.spacing(.5),
   paddingRight: theme.spacing(2),
  },
  outlaySummaryAddButton: {
   // color: '#D00 !important',
   color: theme.palette.primary.contrastText + ' !important',
  },
  outlaySummaryTotal: {
   textAlign: 'right',
   fontSize: '1.3rem',
  },

  outlayRecord: {
   display: 'block',
   position: 'relative',
   paddingTop: 0,
   paddingLeft: theme.spacing(6),
   paddingRight: theme.spacing(1),
   paddingBottom: 0,
   borderBottomWidth: 1,
   borderBottomStyle: 'solid',
   borderBottomColor: theme.palette.background.default,
  },
  outlayRecordAction: {
   position: 'absolute',
   left: theme.spacing(.5),
   marginTop: -15,
   top: '50%',
  },
  outlayRecordBox: {
   padding: theme.spacing(1, 1, 1, 3),
   margin: '0 !important',
  },
  outlayRecordBody: {
   display: 'flex',
   justifyContent: 'space-between',
  },
  outlayRecordPrice: {
   fontSize: '1.3rem',
   whiteSpace: 'nowrap',
   marginLeft: theme.spacing(1),
  },
  outlayRecordChips: {
   display: 'flex',
   justifyContent: 'start',
   flexWrap: 'wrap',
   '& > *': {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
   },
  },

  outlayFormTitle: {
   margin: 0,
   padding: theme.spacing(2),
  },
  outlayFormCloseButton: {
   position: 'absolute',
   right: theme.spacing(1),
   top: theme.spacing(1),
   color: theme.palette.grey[500],
  },
  outlayForm: {
   paddingLeft: theme.spacing(2),
   paddingRight: theme.spacing(2),
  },
  outlayFormItem: {
   marginTop: theme.spacing(1),
   marginBottom: theme.spacing(1.5),
  },
  outlayFormActions: {
   margin: 0,
   paddingTop: theme.spacing(1),
   paddingBottom: theme.spacing(2),
   paddingLeft: 0,
   paddingRight: theme.spacing(2),
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   flexDirection: 'row-reverse',
  },
  outlayFormConfirm: {
   '& > b': {
    fontWeight: 'normal',
    fontSize: '1.1rem',
   },
   '& > span': {
    fontSize: '1.3rem'
   },
  }
 }),
);
