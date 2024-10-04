import { useLogout } from "@/modules/auth/api/logout";
import { Box, List, Divider, Drawer, styled } from "@mui/material";
import Logo from "../Logo";
import UserCard from "./UserCard";
import { FooterBarItem } from "./MenuItems";
import Menuitems from "./MenuItems";
import { NavigationGroup } from "./NavigationGroup";
import { SingleNavigationItem } from "./SingleNavigationItem";

const sidebarWidth = "312px";

const DrawerStyled = styled(Drawer)(({ theme }) => ({
    "& .MuiPaper-root": theme.unstable_sx({
        width: sidebarWidth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: "32px",
        px: "16px",
        borderColor: "Grey.200",
        boxSizing: "border-box",
        overflowX: "hidden",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
            width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "Grey.300",
        },
    }),
}));

const Sidebar = () => {
    const { mutate: logout } = useLogout();

    return (
        <Box
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
            }}
        >
            <DrawerStyled anchor="left" open={true} disableScrollLock={true} variant="permanent">
                <div>
                    <Box mb="32px">
                        <Logo />
                    </Box>

                    <Box>
                        <List sx={{ p: 0 }} component="div">
                            {Menuitems.map((item) => {
                                if ("children" in item) {
                                    return <NavigationGroup level={0} item={item} key={item.title} />;
                                }

                                return <SingleNavigationItem level={0} item={item} key={item.id} />;
                            })}
                        </List>
                    </Box>
                </div>

                <div>
                    <Box mb={2}>
                        <UserCard />
                    </Box>
                    <Divider sx={{ borderColor: "#EAECF0" }} />

                    <Box mt={2}>
                        <SingleNavigationItem level={0} item={FooterBarItem} key={FooterBarItem.id} onClick={() => logout()} />
                    </Box>
                </div>
            </DrawerStyled>
        </Box>
    );
};

export default Sidebar;
