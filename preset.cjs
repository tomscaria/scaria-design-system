/**
 * Lore Design System — Tailwind preset (refactored for per-theme tokens)
 *
 * Consumers wire this preset in their tailwind.config:
 *   presets: [require('@tomscaria/consumer-fintech-design-system/preset')]
 *
 * Change from the previous preset: fontSize / fontFamily / spacing / motion
 * now resolve through CSS variables instead of literal pixel values, so they
 * can vary per data-theme + data-expression.
 *
 * Color was already var-driven; nothing changes there.
 * Spacing has TWO axes now:
 *   - Primitive scale (--sp-1..--sp-128) — brand-wide pixel grid (unchanged)
 *   - Rhythm scale  (--sp-section-y, --sp-stack-md, etc.) — per-theme
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        screens: {
            sm: '360px',
            md: '512px',
            lg: '784px',
            xl: '1280px',
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',

            background: 'var(--bg)',
            foreground: 'var(--fg)',
            card: { DEFAULT: 'var(--bg-2)', foreground: 'var(--fg)' },
            popover: { DEFAULT: 'var(--bg-3)', foreground: 'var(--fg)' },
            muted: { DEFAULT: 'var(--bg-muted)', foreground: 'var(--fg-muted)' },
            brand: { DEFAULT: 'var(--brand)', hover: 'var(--brand-hover)', foreground: 'var(--brand-fg)' },
            accent: {
                DEFAULT: 'var(--accent)',
                hover: 'var(--accent-hover)',
                deep: 'var(--accent-deep)',
                soft: 'var(--accent-soft)',
                foreground: 'var(--accent-fg)',
            },
            success: 'var(--success)',
            info: 'var(--info)',
            warn: 'var(--warn)',
            destructive: 'var(--danger)',
            danger: 'var(--danger)',

            border: 'var(--line)',
            'border-2': 'var(--line-2)',
            'border-strong': 'var(--line-strong)',
            input: 'var(--line)',
            ring: 'var(--accent)',

            // Kit-native names — the vocabulary the kit CSS and ported components
            // are written against (bg-bg-2, text-fg-3, border-line, …). Same vars
            // as the shadcn-style names above; both name sets stay supported.
            bg: {
                DEFAULT: 'var(--bg)',
                2: 'var(--bg-2)',
                3: 'var(--bg-3)',
                muted: 'var(--bg-muted)',
                inverted: 'var(--bg-inverted)',
            },
            fg: {
                DEFAULT: 'var(--fg)',
                2: 'var(--fg-2)',
                3: 'var(--fg-3)',
                muted: 'var(--fg-muted)',
                inverted: 'var(--fg-inverted)',
            },
            line: {
                DEFAULT: 'var(--line)',
                2: 'var(--line-2)',
                strong: 'var(--line-strong)',
            },
        },

        fontSize: {
            'display-xl': ['var(--fs-display-xl)', { lineHeight: 'var(--lh-display-xl)', letterSpacing: 'var(--tracking-display-xl)' }],
            'display-lg': ['var(--fs-display-lg)', { lineHeight: 'var(--lh-display-lg)', letterSpacing: 'var(--tracking-display-lg)' }],
            'display-md': ['var(--fs-display-md)', { lineHeight: 'var(--lh-display-md)', letterSpacing: 'var(--tracking-display-md)' }],
            'display-sm': ['var(--fs-display-sm)', { lineHeight: 'var(--lh-display-sm)', letterSpacing: 'var(--tracking-display-sm)' }],
            'header-xl':  ['var(--fs-header-xl)',  { lineHeight: 'var(--lh-header-xl)',  letterSpacing: 'var(--tracking-header-xl)' }],
            'header-lg':  ['var(--fs-header-lg)',  { lineHeight: 'var(--lh-header-lg)',  letterSpacing: 'var(--tracking-header-lg)' }],
            'header-md':  ['var(--fs-header-md)',  { lineHeight: 'var(--lh-header-md)',  letterSpacing: 'var(--tracking-header-md)' }],
            'header-sm':  ['var(--fs-header-sm)',  { lineHeight: 'var(--lh-header-sm)',  letterSpacing: 'var(--tracking-header-sm)' }],
            'header-caps': ['var(--fs-header-caps)', { lineHeight: 'var(--lh-header-caps)', letterSpacing: 'var(--tracking-header-caps)' }],
            'body-lg':    ['var(--fs-body-lg)',    { lineHeight: 'var(--lh-body-lg)' }],
            'body-md':    ['var(--fs-body-md)',    { lineHeight: 'var(--lh-body-md)' }],
            'body-sm':    ['var(--fs-body-sm)',    { lineHeight: 'var(--lh-body-sm)' }],
            'body-xs':    ['var(--fs-body-xs)',    { lineHeight: 'var(--lh-body-xs)' }],
        },

        fontFamily: {
            sans: ['var(--font-sans)'],
            display: ['var(--font-display)'],
            mono: ['var(--font-mono)'],
            default: ['var(--font-sans)'],
            serif: ['var(--font-display)'],
        },

        fontWeight: {
            regular: 'var(--fw-regular)',
            medium:  'var(--fw-medium)',
            bold:    'var(--fw-bold)',
        },

        borderRadius: {
            xs:   'var(--r-xs)',
            sm:   'var(--r-sm)',
            md:   'var(--r-md)',
            lg:   'var(--r-lg)',
            xl:   'var(--r-xl)',
            pill: 'var(--r-pill)',
            full: 'var(--r-pill)',
        },

        boxShadow: {
            xs: 'var(--shadow-xs)',
            sm: 'var(--shadow-sm)',
            md: 'var(--shadow-md)',
            lg: 'var(--shadow-lg)',
            xl: 'var(--shadow-xl)',
        },

        transitionDuration: {
            micro: 'var(--motion-duration-micro)',
            entry: 'var(--motion-duration-entry)',
            scene: 'var(--motion-duration-scene)',
        },

        transitionTimingFunction: {
            interaction: 'var(--motion-ease-interaction)',
            reveal:      'var(--motion-ease-reveal)',
            ambient:     'var(--motion-ease-ambient)',
        },

        extend: {
            spacing: {
                sp1: '1px', sp2: '2px', sp4: '4px', sp8: '8px',
                sp12: '12px', sp16: '16px', sp24: '24px', sp32: '32px',
                sp48: '48px', sp64: '64px', sp96: '96px', sp128: '128px',
                'section-y': 'var(--sp-section-y)',
                'section-x': 'var(--sp-section-x)',
                'stack-xs':  'var(--sp-stack-xs)',
                'stack-sm':  'var(--sp-stack-sm)',
                'stack-md':  'var(--sp-stack-md)',
                'stack-lg':  'var(--sp-stack-lg)',
                'stack-xl':  'var(--sp-stack-xl)',
                'inline-xs': 'var(--sp-inline-xs)',
                'inline-sm': 'var(--sp-inline-sm)',
                'inline-md': 'var(--sp-inline-md)',
                'inline-lg': 'var(--sp-inline-lg)',
            },
            zIndex: { zDefault: '1', zSticky: '100', zDropdown: '9200', zModal: '9000', zToast: '10000' },
            keyframes: {
                'm-float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
                'm-reveal': {
                    from: { opacity: '0', transform: 'translateY(16px)', filter: 'blur(4px)' },
                    to:   { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0)' },
                },
                'm-glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 0px hsl(var(--accent) / 0)' },
                    '50%':      { boxShadow: '0 0 20px hsl(var(--accent) / 0.15)' },
                },
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
            },
            animation: {
                float:        'm-float 6s var(--motion-ease-ambient) infinite',
                reveal:       'm-reveal var(--motion-duration-entry) var(--motion-ease-reveal) both',
                'glow-pulse': 'm-glow-pulse 2.5s var(--motion-ease-ambient) infinite',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up':   'accordion-up 0.2s ease-out',
            },
            backdropBlur: { xs: '2px' },
        },
    },
};
