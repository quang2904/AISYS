import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    Stack,
    useMediaQuery,
} from "@mui/material";

import {
    ArrowDropDownRounded,
    ArrowDropUpRounded,
    Add,
} from "@mui/icons-material";

const SIDE_NAV_WIDTH = 200;

const SidebarMenuItem = ({ query, topic, handleClickItem, handleNewChat }) => {
    const [open, setOpen] = useState(true);
    return (
        <Stack>
            <Stack direction={"row"}
                justifyContent={"space-between"}
                onClick={() => setOpen(!open)}
                className={`nav-item ${query?.get('topic') === topic?.id ? 'selected' : ''}`}
            >
                {topic?.label}
                <Stack>
                    {!open ? <ArrowDropDownRounded /> : <ArrowDropUpRounded />}
                </Stack>
            </Stack>
            {
                open ?
                    <Stack sx={{ paddingLeft: 2 }}>
                        {
                            topic?.list?.map(chat =>
                                <Stack direction="row" alignItems="center"
                                    className={`sub-item ${query?.get('topic') === topic?.id && query?.get('chat') === chat?.id ? 'selected' : ''}`}
                                    gap={1}
                                    onClick={() => handleClickItem(topic?.id, chat?.id)}
                                >
                                    <Stack>{chat.label}</Stack>
                                </Stack>
                            )
                        }
                        <Stack onClick={handleNewChat}
                            direction="row" alignItems="center"
                            gap={1}
                            className={`sub-item ${query?.get('topic') === topic?.id && query?.get('newChat') ? 'selected' : ''}`}
                        >
                            <Add />
                            New chat
                        </Stack>
                    </Stack>
                    : <></>
            }
        </Stack>
    )
}

const SideMenuListItem = ({ query, chatList = [] }) => {

    const navigate = useNavigate();

    const handleNewTopic = () => {
        navigate(`/?newTopic=${true}`);
    }

    const handleClickItem = (topicId, chatId) => {
        navigate(`/?topic=${topicId}&chat=${chatId}`);
    }

    const handleNewChat = (topicId,) => {
        navigate(`/?topic=${topicId}&newChat=${true}`);
    }
    return (
        <Stack gap={1}>
            <Stack onClick={handleNewTopic} direction={"row"}
                className={`nav-item ${query?.get('newTopic') ? 'selected' : ''}`}
                gap={1}
                sx={{ background: '#DBD8FD', padding: '4px 10px', }}
            >
                <Add />
                New topic
            </Stack>
            {
                chatList?.map(topic => {
                    return (
                        <SidebarMenuItem
                            query={query}
                            topic={topic}
                            handleClickItem={handleClickItem}
                            handleNewChat={() => handleNewChat(topic?.id)}
                        />
                    )
                })
            }
        </Stack>
    )
}

export default function SideMenu({ query, chatList, openDrawer, setOpenDrawer }) {
    const mdUp = useMediaQuery("(min-width:600px)");

    return (
        <Stack direction="row">
            {
                !mdUp ?
                    <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                        <Stack className='page-layout-nav' sx={{ width: SIDE_NAV_WIDTH }}>
                            <Stack sx={{ minHeight: 50, }}>
                                Logo
                            </Stack>

                            <SideMenuListItem chatList={chatList} query={query} />
                        </Stack>
                    </Drawer>
                    :
                    <Stack
                        className='page-layout-nav'
                        sx={{
                            // height: '100%',
                            width: SIDE_NAV_WIDTH,
                            position: 'fixed',
                            // // zIndex: (theme) => theme.zIndex.appBar + 1,
                            top: 0,
                            left: 0,
                            height: '100vh',
                            // background: '#3C3B3B',
                        }}
                    >
                        <Stack sx={{ minHeight: 50, }}>
                            Logo
                        </Stack>

                        <SideMenuListItem chatList={chatList} query={query} />
                    </Stack>
            }
        </Stack>
    );
};
