import { Icon } from '@iconify/react';

export const themeProvider = {
    // breakpoints
    breakpoints: {
        xxs: '480px',
        xxl: '1400px',
    },

    // font sizes
    fontSizes: {
        xl: 'var(--fs-xl)',
        lg: 'var(--fs-lg)',
        md: 'var(--fs-md)',
        base: 'var(--fs-base)',
        sm: 'var(--fs-sm)',
        xs: 'var(--fs-xs)',
        xxs: 'var(--fs-xxs)',
    },

    // colors
    colors: {
        customPrimary: ['var(--primary-light)', 'var(--primary-dark)'],
    },
    components: {
        Container: {
            defaultProps: {
                size: 'md',
            },
            styles: {
                root: {
                    maxWidth: '1760px',
                },
            },
        },
    },
};

// menu styles

// select styles

export const selectDropdownIcon = <Icon icon="icon-park-outline:down" width="20" height="20" color="var(--dark-gray-color)" />;
