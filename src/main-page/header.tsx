import * as React from 'react';
import Grid from "@mui/material/Grid";
import ListIcon from "@mui/icons-material/List";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Avatar from "@mui/material/Avatar";
import {styled} from "@mui/material/styles";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';


import InboxIcon from '@mui/icons-material/MoveToInbox';

const CssTextField = styled(TextField)({

    '& .MuiInputBase-input': {
        border:'',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#99CCff',
    },

});
const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },

];

const BootstrapButton = styled(Button)({
    '&:hover': {
        backgroundColor: '#99CCff',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
});


type Anchor = 'SYSTEM_MAIN_MENU' | '';
interface Film {
    title: string;
    year: number;
}

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

export default function Header() {
    const [state, setState] = React.useState({
        SYSTEM_MAIN_MENU: false,
    });

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Film[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...topFilms]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                console.log(event.type + ' - ' + open)
                setState({...state, [anchor]: open});
            };
    const mainFunctionMenu = ['Inbox2', 'Starred', 'Send email', 'Drafts'];
    const list = (anchor: Anchor) => (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {mainFunctionMenu.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Grid container
              sx={{height: 'auto'}}
              spacing={0}
        >
            <Grid item xs={6} sx={{}}
                  alignItems={'center'}
            >
                {/* SYSTEM MAIN MENU */}
                <BootstrapButton variant="contained" size="medium"
                                 sx={{backgroundColor: '#CCE5FF'}}
                                 onClick={toggleDrawer('SYSTEM_MAIN_MENU', true)}
                >
                    <ListIcon color="primary"
                    />
                </BootstrapButton>
                <Drawer
                    anchor='left'
                    open={state['SYSTEM_MAIN_MENU']}
                    onClose={toggleDrawer('SYSTEM_MAIN_MENU', false)}
                >
                    {list('SYSTEM_MAIN_MENU')}
                </Drawer>
                {/* SAI LOGO*/}
                <Button
                    sx={{
                        marginLeft: '5px',
                    }}>
                    SAI'S AREA
                </Button>
                <Button startIcon={<HomeIcon/>}
                        sx={{
                            borderLeft: 'thin solid #CCE5FF',
                            marginLeft: '5px',
                        }}>
                    控制台
                </Button>
            </Grid>
            <Grid item xs={6}
                  sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: "flex-end",
                  }}
            >
                <Stack direction="row" spacing={0}
                       sx={{
                           alignItems: 'center'
                       }}>
                    {/* 搜索框 */}
                    <Paper
                        component="form"
                        sx={{
                            marginRight: '5px',
                            display: 'flex',
                            alignItems: 'center', width: 300, maxHeight: '35px',
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Autocomplete
                            id="asynchronous-demo"
                            open={open}
                            size="small"
                            sx={{ width: 260 }}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            getOptionLabel={(option) => option.title}
                            options={options}
                            loading={loading}
                            freeSolo
                            renderInput={(params) => (
                                <CssTextField
                                    {...params}
                                    variant="standard"
                                    placeholder='Search'
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                    <Paper elevation={0}
                           sx={{
                               textAlign: 'right',
                               variant: "outlined",
                               border: 'none',
                               paddingRight: '5px',
                           }}
                    >
                        {/*站内信息图标 */}
                        <Badge variant="dot" color="primary"
                               sx={{
                                   marginRight: '7px',
                                   fontSize: '15px',
                                   color: 'red',
                               }}
                        >
                            <MailIcon color="action"/>
                        </Badge>
                        {/*帮助图标 */}
                        <Badge
                            sx={{
                                marginRight: '7px',
                            }}
                        >
                            <HelpOutlineIcon color="primary"/>
                        </Badge>
                    </Paper>
                    {/*登录用户信息 */}
                    <Paper elevation={0}
                           sx={{
                               textAlign: 'right',
                               variant: "outlined",
                               border: 'none',
                               borderLeft: '1px solid #CCE5FF',
                               paddingLeft: '5px',
                           }}
                    >
                        <Stack direction="column" spacing={0}
                               sx={{}}>
                            <Paper elevation={0}
                                   sx={{
                                       textAlign: 'right',
                                       variant: "outlined",
                                       border: 'none',
                                       fontSize: '12px',
                                       color: '#333'
                                   }}
                            >
                                465412848@qq.com
                            </Paper>
                            <Paper elevation={0}
                                   sx={{
                                       textAlign: 'right',
                                       alignItems: 'center',
                                       variant: "outlined",
                                       border: 'none',
                                       padding: 0,
                                       paddingTop: '3px',
                                       fontSize: '12px',
                                       color: '#999'
                                   }}
                            >
                                管理员
                            </Paper>
                        </Stack>
                    </Paper>
                    {/*登录用户头像 */}
                    <Paper
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: "flex-end",
                            padding: '3px',
                        }}
                        elevation={0}
                    >
                        <Avatar {...stringAvatar('S A')} />
                    </Paper>
                </Stack>
            </Grid>
        </Grid>

    );
}

function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </SvgIcon>
    );
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: 'blue',
            width: 30, height: 30
        },
        size: 'small',
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}