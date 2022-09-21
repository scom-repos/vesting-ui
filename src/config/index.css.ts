import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export default Styles.style({
  background: Theme.background.paper,
  $nest: {
    '.ml-0-7-5': {
      marginLeft: '.75rem'
    },
    '.os-modal': {
      borderRadius: 20,
      boxSizing: 'border-box',
      fontSize: '.875rem',
      fontWeight: 400,
      $nest: {
        'i-icon': {
          display: 'inline-block'
        },
        '> div > div': {
          backgroundColor: '#252a48',
          height: 'calc(100% - 200px)',
          borderRadius: 15,
          lineHeight: 1.5,
          wordWrap: 'break-word',
          padding: 0,
          minHeight: 400,
          width: 360
        },
        '.i-modal_header': {
          color: Theme.colors.secondary.main,
          borderRadius: '20px 20px 0 0',
          background: 'unset',
          padding: '16px 24px',
          fontWeight: 500,
          fontSize: '1rem'
        },        
        '.i-modal_content': {
          padding: '0 1.25rem'
        },
        '.list-view': {
          $nest: {
            '.list-item:hover': {
              $nest: {
                '> *': {
                  opacity: 1
                }
              }
            },
            '.list-item:not(:first-child)': {
              marginTop: '.5rem'
            },
            '.list-item': {
              backgroundColor: Theme.background.default,
              position: 'relative',
              borderRadius: 10,
              cursor: 'pointer',
              border: 'none',
              transition: 'all .3s ease-in',
              overflow: 'unset',
              $nest: {
                '&.disabled-network-selection': {
                  cursor: 'default',
                  $nest: {
                    '&:hover > *': {
                      opacity: '0.5 !important',
                    }
                  }
                },
                '> *': {
                  opacity: .5
                }
              }
            },
            '.list-item i-image': {
              height: 'auto'
            },
            '.list-item.is-actived': {
              $nest: {
                '> *': {
                  opacity: 1
                },
                '&:after': {
                  content: "''",
                  top: '50%',
                  left: 9,
                  position: 'absolute',
                  background: '#20bf55',
                  borderRadius: '50%',
                  width: 10,
                  height: 10,
                  transform: 'translate3d(-50%,-50%,0)'
                },
                '.custom-label': {
                  paddingLeft: '.75rem'
                }
              }
            }
          }
        },
        '.networks': {
          color: '#f05e61',
          marginTop: '1.5rem',
          height: 'calc(100% - 160px)',
          overflowY: 'auto',
          width: '100% !important',
          $nest: {
            '.list-item': {
              padding: '.65rem .5rem'
            }
          }
        }
      }
    }
  }
})
