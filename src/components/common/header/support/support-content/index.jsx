import { ScrollArea, Tabs } from "@mantine/core";
import style from "./support-content.module.scss";

const SupportContent = () => {
     return (
          <div className={style.support_content}>
               <h6 className={style.title}>Select Support Type</h6>
               <div className={style.tabs_wp}>
                    <Tabs variant='pills' defaultValue='gallery' className='theme_tabs'>
                         {/* <ScrollArea className='tabs_scroll' type='always'> */}
                         <Tabs.List>
                              <Tabs.Tab value='gallery'>Transaction Problem</Tabs.Tab>
                              <Tabs.Tab value='messages'>Game Problem</Tabs.Tab>
                              <Tabs.Tab value='settings'>My Requests</Tabs.Tab>
                         </Tabs.List>
                         {/* </ScrollArea> */}
                         {/* <Tabs.Panel value='gallery'>Gallery tab content</Tabs.Panel>
                         <Tabs.Panel value='messages'>Messages tab content</Tabs.Panel>
                         <Tabs.Panel value='settings'>Settings tab content</Tabs.Panel> */}
                    </Tabs>
               </div>
               <div className={style.action_btns}>
                    <button className='theme_btn black_400_bg scale-effect'>Cancel</button>
                    <button className='theme_btn gradient_bg scale-effect'>Next</button>
               </div>
          </div>
     );
};

export default SupportContent;
