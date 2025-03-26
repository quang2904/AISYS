
import {
    Box,
    Button,
    IconButton,
    Stack,
    useMediaQuery,
} from "@mui/material";

import {
    MenuRounded,
} from "@mui/icons-material";

const TOP_NAV_HEIGHT = 50;

export default function TopHeader({ openNav }) {
    const mdUp = useMediaQuery("(min-width:600px)");
    const data = (typeof window != 'undefined') ? JSON.parse(window.localStorage.getItem("data")) : {};

    const handleSignOut = () => {
        window.localStorage.clear();
        window.location.reload();
    };

    return (
        <Box
            component="header"
            sx={{
                boxShadow: "0px 1px 2px 0px rgba(78, 81, 83, 0.10)",
                paddingX: "8px",
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{
                    minHeight: TOP_NAV_HEIGHT,
                    px: 2,
                    width: '100%'
                }}
            >
                <Stack direction={"row"} gap={1}>
                    {
                        data ?
                            <span style={{ fontSize: "12px", color: "#61676B" }}>
                                {data?.username}
                            </span>
                            : <></>
                    }
                    <Button onClick={handleSignOut}>
                        Sign out
                    </Button>
                    {!mdUp && (
                        <IconButton onClick={openNav}>
                            <MenuRounded
                            // style={{
                            //     color: "var(--main)",
                            // }}
                            />
                        </IconButton>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};
