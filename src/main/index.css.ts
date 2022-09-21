import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;
import Assets from '@vesting/assets';

Styles.Theme.darkTheme.background.default = '#212128';
Styles.Theme.darkTheme.background.paper = '#000000';
Styles.Theme.darkTheme.background.main = 'linear-gradient(270deg, #FF9900 0%, #FC7428 100%)';
Styles.Theme.darkTheme.background.gradient = 'radial-gradient(50.87% 45.87% at 88.62% 0%, rgba(255, 184, 0, 0.609) 0%, rgba(255, 205, 26, 0.168438) 57.81%, rgba(7, 8, 9, 0) 100%)';
Styles.Theme.darkTheme.colors.primary.dark = '#FF9515';
Styles.Theme.darkTheme.colors.primary.light = '#FFAE2C';
Styles.Theme.darkTheme.colors.primary.main = '#FF981F';
Styles.Theme.darkTheme.colors.secondary.dark = '#f7d063';
Styles.Theme.darkTheme.colors.secondary.light = '#f7d063b6';
Styles.Theme.darkTheme.colors.secondary.main = '#f7d063';
Styles.Theme.darkTheme.colors.error.main = '#D84C4C';
Styles.Theme.darkTheme.colors.success.dark = '#04B761';
Styles.Theme.darkTheme.colors.success.main = '#79B776';
Styles.Theme.darkTheme.text.secondary = 'hsla(0, 0%, 100%, 0.55)';
Styles.Theme.darkTheme.typography.fontFamily = 'Raleway';
Styles.Theme.darkTheme.colors.warning.dark = '#f57c00';
Styles.Theme.darkTheme.colors.warning.light = '#F6C958';
Styles.Theme.darkTheme.colors.warning.main = '#ffa726';
Styles.Theme.darkTheme.colors.info.light = '#6BA6FF';
Styles.Theme.darkTheme.divider = '#30363d';
Styles.Theme.darkTheme.typography.fontSize = '16px';
Styles.Theme.darkTheme.shadows[1] = '0px 4px 4px rgba(0, 0, 0, 0.25)';
Styles.Theme.darkTheme.shadows[2] = 'none';
Styles.Theme.darkTheme.shadows[3] = '0px 4px 4px #000000';

const colorVar = {
  primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
  primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
  darkBg: '#181E3E 0% 0% no-repeat padding-box',
  primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box'
}

export default Styles.style({
  $nest: {
    '::selection': {
      color: '#fff',
      background: '#1890ff'
    },
    '.btn-os': {
      background: colorVar.primaryButton,
      height: 'auto !important',
      color: '#fff',
      transition: 'background .3s ease',
      fontSize: '1rem'
    },
    '.btn-os:not(.disabled):hover, .btn-os:not(.disabled):focus': {
      background: colorVar.primaryGradient,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      opacity: .9
    },
    '.btn-os:not(.disabled):focus': {
      boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
    },
    '.btn-os.disabled, .btn-os.is-spinning': {
      background: colorVar.primaryDisabled,
      opacity: 1
    },
    '.dark-bg, .dark-modal > div > div': {
      background: colorVar.darkBg,
      borderRadius: 5
    },
    '.btn-transparent, .btn-transparent:not(.disabled):focus, .btn-transparent:not(.disabled):hover': {
      background: 'transparent',
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
    '.account-dropdown': {
      $nest: {
        '> i-button': {
          height: "auto",
          minWidth: "auto",
          padding: '.5rem .75rem',
          borderRight: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          lineHeight: "1.2rem"
        },
        '.modal': {
          background: '#252a48',
          border: `2px solid ${Theme.divider}`,
          padding: '10px',
          minWidth: 200,
          $nest: {
            'i-button': {
              background: '#EB7F00',
              border: 'none',
              transition: 'all .2s ease-out',
              borderRadius: 5
            }
          }
        },
        '.icon': {
          backgroundColor: 'transparent',
          height: 'auto',
          width: 'auto',
          padding: '.5rem .75rem .5rem 0',
        },
        'i-icon': {
          height: 14,
          width: 14
        }
      }
    },
    '.mr-0-5': {
      marginRight: '.5rem'
    },
    '.ml-0-5': {
      marginLeft: '.5rem'
    },
    '.mb-0-5': {
      marginBottom: '.5rem'
    },
    '.text-success *': {
      color: Theme.colors.success.main
    },
    '.text-error *': {
      color: Theme.colors.error.main
    },
    '.hidden': {
      display: 'none !important'
    },
    '.no-wrap': {
      whiteSpace: 'nowrap'
    },
    '.py-1': {
      paddingTop: '1rem',
      paddingBottom: '1rem'
    },
    '.px-1': {
      paddingLeft: '1rem',
      paddingRight: '1rem'
    },
    '.align-middle': {
      alignItems: 'center'
    },
    '.text-secondary *': {
      color: Theme.colors.secondary.dark
    },
    '.btn-default': {
      background: '#eaecef',
      height: 'auto !important',
      transition: 'background .3s ease',
      fontSize: '1rem',
      color: Theme.background.default
    },
    '.os-table': {
      boxSizing: 'border-box',
      borderRadius: 10,
      backdropFilter: 'blur(74px)',
      $nest: {
        '.i-table--empty': {
          color: Theme.text.primary,
          textAlign: 'center'
        },
        '.i-table-pagi a': {
          fontSize: '1rem',
          border: 'none',
          padding: '5px 12px',
          height: 'auto !important',
          transition: 'background .3s ease',
          fontFamily: Theme.typography.fontFamily
        },
        '.i-table-pagi .pagination-main': {
          marginRight: 8,
          marginLeft: 8
        },
        '.i-table-pagi .pagination-main > a': {
          background: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
          color: '#fff',
          backgroundColor: 'transparent',
        },
        '.i-table-pagi > .pagination > a.paginate_button': {
          color: '#F5C958',
          background: 'hsla(0,0%,100%,0.03) 0% 0% no-repeat padding-box',
          borderRadius: 4,
          fontWeight: 700
        }
      }
    },
    '.os-table table tbody tr': {
      fontSize: '1rem',
      $nest: {
        'td:first-child': {
          textAlign: 'left'
        }
      }
    },
    '.os-table table thead, .os-table table tbody td': {
      background: '#182045'
    },
    '.os-table table thead th': {
      fontWeight: 'bold',
      textTransform: 'capitalize',
      padding: '1.5rem 1rem',
      $nest: {
        '&:first-child': {
          textAlign: "left"
        }
      }
    },
    '.os-table table .i-table-cell': {
      borderTop: `1px solid ${Theme.divider}`,
      borderRight: 'none'
    },
    'i-link > a': {
      textDecoration: 'none'
    },
    'i-link:hover *': {
      color: Theme.colors.secondary.dark
    },
    '.breadcrumb *+ i-label a:before': {
      padding: '4px',
      color: Theme.colors.primary.contrastText,
      content: '"/\\00a0"',
      cursor: 'initial'
    },
    '.breadcrumb i-link.active': {
      pointerEvents: 'none'
    }
  }
});

Styles.cssRule("body", {
  fontSize: 'calc(0.75vmin + 0.35em)'
});

Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Black.ttf')}") format("truetype")`,
  fontWeight: '900',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
  fontWeight: 'bold',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Regular.ttf')}") format("truetype")`,
  fontWeight: '400',
  fontStyle: 'normal'
})

Styles.fontFace({
  fontFamily: "Raleway",
  src: `url("${Assets.fullPath('fonts/raleway/Raleway-Italic.ttf')}") format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'italic'
})
Styles.fontFace({
  fontFamily: "Russo One",
  src: `url("${Assets.fullPath('fonts/russo_one/RussoOne-Regular.ttf')}") format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'normal'
})