import { useEffect, useState, } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, useMediaQuery, } from "@mui/material";
import { TabContext, TabPanel } from '@mui/lab';

import SideMenu from "src/components/SideMenu";
import TopHeader from "src/components/TopHeader";
import NewTopic from "src/components/Tabs/new_topic";
import MainTab from "src/components/Tabs/main_tab";

export default function Page() {

    const navigate = useNavigate();

    let { search } = useLocation();
    const query = new URLSearchParams(search);

    const mdUp = useMediaQuery("(min-width:600px)");

    const [openDrawer, setOpenDrawer] = useState(false);
    const [page, setPage] = useState('new-topic');
    const [chatList, setChatList] = useState([]);
    const [currentTab, setCurrentTab] = useState('new-topic');

    const tabList = [
        {
            // label: t('products'),
            value: 'new-topic',
            content: NewTopic,
        },
        // {
        //     // label: t('orders'),
        //     value: 'new-chat',
        //     content: NewChat,
        // },
        {
            // label: t('warehouse_document'),
            value: 'main-tab',
            content: MainTab,
        },
    ];

    useEffect(() => {
        getChatList();
    }, [])

    const getChatList = () => {
        const list = [
            {
                label: 'Common',
                id: 'common',
                list: [
                    {
                        label: 'Chat 1',
                        id: '1',
                    },
                    {
                        label: 'Chat 2',
                        id: '2',
                    },
                    {
                        label: 'Chat 3',
                        id: '3',
                    },
                ],
            },
            {
                label: 'Topic 1',
                id: 'topic_1',
                list: [
                    {
                        label: 'Chat 10',
                        id: '5',
                    },
                    {
                        label: 'Chat 2',
                        id: '10',
                    },
                    {
                        label: 'Chat 3',
                        id: '120',
                    },
                ],
            },
            {
                label: 'Topic 2',
                id: 'topic_2',
                list: [
                    {
                        label: 'Chat 1',
                        id: '100',
                    },
                    {
                        label: 'Chat 2',
                        id: '12345',
                    },
                    {
                        label: 'abcde',
                        id: '84564132',
                    },
                ],
            },
        ]
        setChatList(list);
    }

    const getPageData = (topicId, chatId) => {

    }

    useEffect(() => {
        if (!query?.size) {
            navigate(`?newTopic=${true}`);
        } else {
            const newTopic = query.get('newTopic');
            const topic = query.get('topic');
            const newChat = query.get('newChat');
            const chat = query.get('chat');
            if (newTopic && (newChat || topic || chat)) {
                navigate(`?newTopic=${true}`);
            } else {
                setCurrentTab('new-topic');
            }

            if (topic && newChat) {
                setCurrentTab('main-tab');
            }

            if (topic && chat) {
                if (newChat) {
                    navigate(`?topic=${topic}&chat=${chat}`);
                } else {
                    setCurrentTab('main-tab');
                }
            }
        }
    }, [query, chatList])

    const tabProps = {
        topicId: query.get('topic'),
        chatId: query.get('chat'),
        newChat: query.get('newChat'),
    }

    return (
        <Stack sx={{ height: '100%' }}>
            1237136813798
            <TopHeader openNav={() => setOpenDrawer(true)} />

            <Stack direction={"row"} flex={1}>
                <SideMenu
                    query={query}
                    chatList={chatList}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                />
                
            <TabContext value={currentTab}>
                <Stack gap={2} 
                    sx={{ 
                        background: '#FFFFFF', padding: '16px',
                        position: 'relative',
                        top: 0,
                        left: mdUp ? 200 : 0,
                        height: 'calc(100% - 50px)',
                        width: mdUp? 'calc(100% - 200px)' : '100%',
                    }}
                >
                    {/* <Tabs value={currentTab}
                        variant="scrollable"
                        visibleScrollbar
                        allowScrollButtonsMobile
                        selectionFollowsFocus
                        sx={{
                            display: 'flex',
                            gap: '3px',
                            maxWidth: 'fit-content',
                            borderRadius: '8px',
                            padding: '3px',
                            '& .MuiTabs-indicator': {
                                display: 'none'
                            },
                        }}
                    >
                        {
                            tabList?.map(tab => (
                                <Tab key={'printout-template-' + tab.value}
                                    label={tab.label}
                                    value={tab.value}
                                    onClick={() => { handleChangeCurrentTab(tab.value) }}
                                    sx={{
                                        '&.MuiTab-root': {
                                            minHeight: '50px',
                                            borderRadius: '4px',
                                            color: 'rgba(97, 103, 107, 1)',
                                            padding: '5px 20px',
                                            fontSize: '16px',
                                            margin: 0,
                                        },
                                        '&.Mui-selected': {
                                            color: 'white',
                                            borderRadius: '4px',
                                            background: 'var(--main)',
                                            color: 'white',
                                            padding: '5px 20px',
                                            fontSize: '16px',
                                            '&:hover': {
                                                background: 'var(--main)'
                                            }
                                        },
                                    }}
                                />
                            ))
                        }
                    </Tabs> */}
                    {
                        tabList?.map(tab => {
                            return (
                                <TabPanel value={tab.value}
                                    key={"printout-template-tab-panel-" + tab.value}
                                    sx={{ padding: '12px', }}
                                >
                                    <tab.content {...tabProps}/>
                                </TabPanel>
                            )
                        })
                    }
                </Stack>
            </TabContext>
            </Stack>
        </Stack>
    )
}