import type { Config } from 'tailwindcss';
import type { PluginUtils } from 'tailwindcss/types/config';

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}'
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            typography: ({ theme }: PluginUtils) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-body': theme('colors.muted.foreground'),
                        '--tw-prose-headings': theme('colors.foreground'),
                        '--tw-prose-lead': theme('colors.secondary'),
                        '--tw-prose-links': theme('colors.primary.DEFAULT'),
                        '--tw-prose-bold': theme('colors.foreground'),
                        '--tw-prose-counters': theme('colors.muted.foreground'),
                        '--tw-prose-bullets': theme('colors.muted.DEFAULT'),
                        '--tw-prose-hr': theme('colors.muted.DEFAULT'),
                        '--tw-prose-quotes': theme('colors.foreground'),
                        '--tw-prose-quote-borders': theme('colors.muted.DEFAULT'),
                        '--tw-prose-captions': theme('colors.muted.foreground'),
                        '--tw-prose-code': theme('colors.foreground'),
                        '--tw-prose-pre-code': theme('colors.background'),
                        '--tw-prose-pre-bg': theme('colors.foreground'),
                        '--tw-prose-th-borders': theme('colors.muted.DEFAULT'),
                        '--tw-prose-td-borders': theme('colors.muted.DEFAULT'),
                        '--tw-prose-invert-body': theme('colors.muted.foreground'),
                        '--tw-prose-invert-headings': theme('colors.foreground'),
                        '--tw-prose-invert-lead': theme('colors.secondary.foreground'),
                        '--tw-prose-invert-links': theme('colors.primary.foreground'),
                        '--tw-prose-invert-bold': theme('colors.foreground'),
                        '--tw-prose-invert-counters': theme('colors.muted.foreground'),
                        '--tw-prose-invert-bullets': theme('colors.muted.DEFAULT'),
                        '--tw-prose-invert-hr': theme('colors.muted.DEFAULT'),
                        '--tw-prose-invert-quotes': theme('colors.foreground'),
                        '--tw-prose-invert-quote-borders': theme('colors.muted.DEFAULT'),
                        '--tw-prose-invert-captions': theme('colors.muted.foreground'),
                        '--tw-prose-invert-code': theme('colors.foreground'),
                        '--tw-prose-invert-pre-code': theme('colors.card.DEFAULT'),
                        '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
                        '--tw-prose-invert-th-borders': theme('colors.muted.DEFAULT'),
                        '--tw-prose-invert-td-borders': theme('colors.muted.DEFAULT')
                    }
                }
            }),
            dropShadow: {
               'orange': '0 0 1.5rem hsl(36, 100%, 61%)'
            },
            colors: {
                'royal-red': '#E74955',
                'white-opaque': 'rgba(255, 255, 255, 0.45)',
                'border': 'hsl(var(--border-card))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
               'orange': 'hsl(36, 100%, 61%)',
               'purple': '#7E49FF',
               'royal-sec': '#25262F',


                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--orange))'
                },
                accent2: {
                    DEFAULT: 'hsl(var(--accent-2))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--bg-card))',
                    foreground: 'hsl(var(--bg-card))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            },
            fontFamily: {
                'minecraft': ['var(--font-minecraft)'],
            }
        }
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/typography'),
        require('tailwindcss-animate')
    ]
} satisfies Config;

export default config;
