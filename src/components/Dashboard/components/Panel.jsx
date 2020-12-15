import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import withWidth from "@material-ui/core/withWidth";
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Icon, Hidden } from "@material-ui/core";
import { People, Close, ChevronRight, ChevronLeft } from '@material-ui/icons';
import clsx from 'clsx';
import { ThemeContext } from "../../../context/themeContext";
import MenuIcon from "@material-ui/icons/Menu";
import { setOpenPanel } from "../../../actions/actions";

const Panel = ({ width }) => {
    const { currentTheme } = useContext(ThemeContext);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const drawerWidth = width === 'xs' ? '100%' : width === 'sm' ? '40%' : width === 'md' ? '30%' : '15%';

    const useStyles = makeStyles((theme) => ({
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            '& .MuiListItem-button':{
                height:'3em'
            },
            
        },
        drawerOpen: {
            paddingTop:'63px',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            color: currentTheme === 'dark' ? '#7575a3' : '',
            width: drawerWidth,
            boxShadow: '2px 1px 16px 5px rgba(0,0,0,0.35)',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            marginTop:'63px',
            display: width === 'xs' ? 'none' : 'visible',
            backgroundColor: currentTheme === 'dark' ? '#0c0c1b' : '',
            color: currentTheme === 'dark' ? '#7575a3' : '',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        toolbar: {

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));

    const handleDrawer = () => {
        setOpen(!open);
        dispatch(setOpenPanel())
    };

    const classes = useStyles();

    return (
        <>


            <Hidden smUp>
            <IconButton
            onClick={handleDrawer}
                style={{
                    backgroundColor: '#001529',
                    position: 'fixed',
                    top: '10vh',
                    left: '10px',
                    zIndex: '999',
                    color: 'red'
                }}>
                <MenuIcon style={{
                    color:'#aeaee0'
                }}></MenuIcon>
            </IconButton>
            </Hidden>



            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })
                }
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <List>
                    <ListItemText style={{
                        color:'#232135',
                        paddingLeft: open ? '10px' : ''
                    }}>
                {!open ?
                 <Divider style={{
                        backgroundColor:'#232135',
                        margin:'10px 0px'
                    }} />
                :          
                "APPS"
                }
                </ListItemText>
                    {open
                        ?
                        ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text} style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <ListItemText primary={text} />
                                <ListItemIcon style={{ color: currentTheme === 'dark' ? '#7575a3' : '', }}>{index % 2 === 0 ? <People /> : <Close />}</ListItemIcon>
                            </ListItem>
                        ))
                        :
                        ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text} style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <ListItemIcon style={{
                                    color: currentTheme === 'dark' ? '#7575a3' : '',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>{index % 2 === 0 ? <People /> : <Close />}</ListItemIcon>
                            </ListItem>
                        ))}
                </List>
                
                <List>
                <ListItemText style={{
                        color:'#232135',
                        paddingLeft: open ? '10px' : ''
                    }}>
                {!open ?
                 <Divider style={{
                        backgroundColor:'#232135',
                        margin:'10px 0px'
                    }} />
                :          
                "APPS"
                }
                </ListItemText>
                    {open
                        ?
                        ['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text} style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <ListItemText primary={text} />
                                <ListItemIcon style={{ color: currentTheme === 'dark' ? '#7575a3' : '', }}>{index % 2 === 0 ? <People /> : <Close />}</ListItemIcon>
                            </ListItem>
                        ))
                        :
                        ['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text} style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <ListItemIcon style={{
                                    color: currentTheme === 'dark' ? '#7575a3' : '',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    {index % 2 === 0 ? <People /> : <Close />}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    <ListItem
                        onClick={handleDrawer}
                        style={{
                            justifyContent: 'center',
                            backgroundColor: currentTheme === 'dark' ? '#14142d' : '',
                            cursor: 'pointer'
                        }}>
                        <ListItemIcon style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div className={classes.toolbar}>
                                <Icon style={{
                                    color: currentTheme === 'dark' ? '#7575a3' : '',
                                    width: '100%'
                                }}>
                                    {!open ? <ChevronRight /> : <ChevronLeft />}
                                </Icon>
                            </div>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>

        </>
    );
};

export default withWidth()(Panel);