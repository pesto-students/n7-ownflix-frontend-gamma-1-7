import React from 'react';
import './Navbar.scss';
import Logo from '../../images/logo.png'
import profilePicture from '../../images/profile-picture.png';
import useScroll from '../../hooks/useScroll';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import AvatarIcon from '@material-ui/icons/Person';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import { login, logout } from '../../redux/auth/auth.actions'
import { useDispatch, } from 'react-redux';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);
const isLogin = () => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return true
    }
    return false
}

const Navbar = () => {
    const classes = useStyles();
    const isScrolled = useScroll(0);
    const [open, setOpen] = React.useState(false);
    const [authorOpen, setAuthorOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const authorRef = React.useRef<HTMLDivElement>(null);
    const [autheticated, setAutheticated] = React.useState(isLogin())

    const dispatch = useDispatch();

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    const prevAuthorOpen = React.useRef(authorOpen);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]
    );
    React.useEffect(() => {
        if (prevAuthorOpen.current === true && authorOpen === false) {
            authorRef.current!.focus();
        }
        prevAuthorOpen.current = authorOpen;
    }, [authorOpen]
    );

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleAuthorToggle = () => {
        setAuthorOpen((prevAuthorOpen) => !prevAuthorOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        if (authorRef.current && authorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
        setAuthorOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
            setAuthorOpen(false);
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
        localStorage.removeItem("user")
        dispatch(logout())
        window.location.href = "/home"
    }
    const loginPage = () => {
        window.location.href = "/signin"
    }
    return (
        <div className={`Navbar ${isScrolled && "Navbar__fixed"}`}>
            <div className="left-navbar">
                <a href="/">
                    <img src={Logo} alt="logo" className="logo" />
                </a>
                <div
                    className="browse"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <h2 className="browse-text">Browse</h2>
                    <ArrowDropDownIcon />
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className="browse-menu-list">
                                            <MenuItem onClick={handleClose} className="dropdown-item">TV Shows</MenuItem>
                                            <MenuItem onClick={handleClose} className="dropdown-item">Movies</MenuItem>
                                            <MenuItem onClick={handleClose} className="dropdown-item">Popular</MenuItem>
                                            <MenuItem onClick={handleClose} className="dropdown-item">New</MenuItem>
                                            <MenuItem onClick={handleClose} className="dropdown-item">My List</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
            <div className="right-navbar">
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                {autheticated ? (
                    <div
                        className="author"
                        ref={authorRef}
                        aria-controls={authorOpen ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleAuthorToggle}
                    >
                        <AvatarIcon color="primary" />
                        <Popper open={authorOpen} anchorEl={authorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>

                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={authorOpen} id="menu-list-grow" onKeyDown={handleListKeyDown} className="icon-list">
                                                <MenuItem onClick={handleClose} className="dropdown-item">Profile</MenuItem>
                                                <MenuItem onClick={handleLogout} className="dropdown-item">Logout</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>


                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                ) : (<div className="login-area">
                    <Button onClick={loginPage} variant="contained" color="primary" className="movie-options-options">Sign In</Button>
                </div>)}

            </div>
        </div>
    )
}

export default Navbar;
