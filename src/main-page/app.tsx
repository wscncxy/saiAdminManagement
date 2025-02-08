import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LeftMenuTree from '../auth-manage/left-menu-tree';
import MainPageTopMenu from './header'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AuthManagerList from "../auth-manage/role-manager/list";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}
export default function App() {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/public" onClick={handleClick}>
            SAI
        </Link>,
        <Typography key="3" color="text.primary">
            Auth
        </Typography>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={handleClick}
        >
            Core
        </Link>,
        <Typography key="3" color="text.primary">
            Breadcrumb
        </Typography>,
    ];
    return (
        <Box
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            m={0}
            sx={{
                // border: '2px solid grey',
                minWidth: 1024, width: '100vw', height: '100vh', minHeight: '1024px'
            }}
        >
            <Grid container
                  sx={{height: '100%', width: '100%'}}
                  spacing={0}
            >
                <Grid item xs={12} sx={{
                    height: '2vm',
                    maxHeight: '40px',
                    minHeight: '30px',
                    borderBottom: 'thin solid #CCE5FF',
                }}
                >
                    {/* top */}
                    <MainPageTopMenu />
                </Grid>
                <Grid item xs={2} sx={{height: '98%',
                    borderRight: 'thin solid #CCE5FF',
                    maxWidth: '100px', minWidth: '100px'}}>
                    <LeftMenuTree/>
                </Grid>
                <Grid item xs={10}
                      style={{}}
                >
                    <Grid container
                          sx={{flexGrow: 1}}
                          spacing={0}
                          direction={'row'}
                          columnSpacing={0}
                    >
                        <Grid item lg={12}
                              sx={{height: '3vm',
                                  borderBottom: 'thin solid #CCE5FF',
                                  maxHeight: '40px', minHeight: '30px'}}>
                            <Breadcrumbs
                                separator={<NavigateNextIcon fontSize="small" />}
                                aria-label="breadcrumb"
                            >
                                {breadcrumbs}
                            </Breadcrumbs>
                        </Grid>
                        <Grid item lg={12} sx={{minHeight: '30px'}}>
                            <AuthManagerList/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
    // return
}

