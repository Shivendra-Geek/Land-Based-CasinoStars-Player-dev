'use client';

import { Icon } from '@iconify/react';
import { ActionIcon, Affix, Tooltip, Transition, rem } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
// import { IconArrowUp } from '@tabler/icons-react';
import style from './action-icon.module.scss';

export default function ScrollToTop() {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Affix position={{ bottom: rem(20), right: rem(20) }}>
            <Transition transition="slide-up" mounted={scroll.y > 600}>
                {(transitionStyles) => (
                    <Tooltip label={'Scroll To Top'} arrowOffset={50} arrowSize={10} withArrow position="left">
                        <button style={transitionStyles} aria-label="Scroll to top" className={style.action_btn} onClick={() => scrollTo({ y: 0 })}>
                            <Icon icon="material-symbols:arrow-upward-alt-rounded" width="32" height="32" />
                        </button>
                    </Tooltip>
                )}
            </Transition>
        </Affix>
    );
}
