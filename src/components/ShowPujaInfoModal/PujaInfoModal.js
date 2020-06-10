import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function PujaInfoModal({ open, toggleModal, puja }) {
    //const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        toggleModal()
        //setOpen(true);
    };
    const handleClose = () => {
        toggleModal()
        //setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {puja.name}
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{ display: 'flex' }}>
                        <img
                            variant="square"
                            //className={classes.large}
                            alt="Remy Sharp"
                            src="https://picsum.photos/100"
                        />
                        <div style={{ marginLeft: '20px' }}>
                            <Typography gutterBottom>
                                Time : {puja.timeInHrs} Hrs
            </Typography>
                            <Typography gutterBottom>
                                Cost : {puja.Price}
                            </Typography>
                            <Typography gutterBottom>
                                Available Languages :
            {puja.Languages && puja.Languages.map((lang, i) => {
                                return <Chip key={`${i}_sdf`} label={lang} variant="outlined" />
                            })}
                            </Typography>
                        </div>

                    </div>


                    <Typography variant="h3">About</Typography>
                    <Typography>
                        {puja.about}
                    </Typography>
                    <Typography variant="h3">Description</Typography>
                    <Typography gutterBottom>
                        {puja.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
