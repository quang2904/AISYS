import { TabContext, TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { Stack, useMediaQuery, Tabs, Tab } from "@mui/material";

import ChatDetail from "./chat_detail";
import MindMap from "./mindmap";

export default function MainTab({ topicId, chatId, newChat }) {
  const tabList = [
    {
      label: "Chat",
      value: 1,
      content: ChatDetail,
    },
    {
      label: "MindMap",
      value: 2,
      content: MindMap,
    },
  ];

  const [currentTab, setCurrentTab] = useState(1);

  // useEffect(() => {
  //     if (topicId) {
  //         if (newChat) {
  //             setCurrentTab(0);
  //         } else if (chatId) {
  //             setCurrentTab(1);
  //         }
  //     }
  // }, [topicId, chatId, newChat])

  const props = {
    topicId,
    chatId,
    newChat,
  };

  return (
    <TabContext value={currentTab}>
      <Tabs
        value={currentTab}
        variant="scrollable"
        visibleScrollbar
        allowScrollButtonsMobile
        selectionFollowsFocus
        sx={{
          display: "flex",
          gap: "3px",
          maxWidth: "fit-content",
          borderRadius: "8px",
          padding: "3px",
        }}
      >
        {tabList?.map((tab) => (
          <Tab
            key={"main-tab-" + tab.value}
            label={tab.label}
            value={tab.value}
            onClick={() => {
              setCurrentTab(tab.value);
            }}
            sx={{
              "&.MuiTab-root": {
                minHeight: "50px",
                borderRadius: "4px",
                color: "black",
                background: "#D9D9D9",
                padding: "5px 20px",
                fontSize: "16px",
                fontWeight: 700,
              },
              "&.Mui-selected": {
                color: "black",
                borderRadius: "4px",
                background: "#B1B1B1",
                padding: "5px 20px",
                fontSize: "16px",
                // '&:hover': {
                //     background: 'var(--main)'
                // }
              },
            }}
          />
        ))}
      </Tabs>
      {tabList?.map((tab) => {
        return (
          <TabPanel
            value={tab.value}
            key={"main-tab-panel-" + tab.value}
            sx={{ padding: "12px" }}
          >
            <tab.content {...props} />
          </TabPanel>
        );
      })}
    </TabContext>
  );
}
