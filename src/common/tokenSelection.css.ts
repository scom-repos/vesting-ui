import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

Styles.cssRule('.token-selection', {
  $nest: {
    '#tokenSearch': {
      width: '100% !important',
    },
    '.token-agree-input': {
      $nest: {
        '&:hover input ~ .checkmark': {
          borderColor: '#e83e8c'
        },
        '.is-checked .i-checkbox_label': {
          color: 'yellow'
        },
        '.i-checkbox_label': {
          fontSize: '1.5rem',
          color: 'yellow',
          width: '150px !important'
        },
        '.checkmark': {
          height: '30px',
          width: '30px',
          background: 'none',
          border: '3px solid #e83e8c',
        },
        '.checkmark:after': {
          border: '3px solid #e83e8c',
          height: '16px',
          left: '7.5px',
          top: '0px',
          width: '7px',
          borderLeft: 0,
          borderTop: 0,
        }
      }
    },
    '.btn-source-panel': {
      padding: '5px',
      display: 'inline-block',
      background: 'transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box',
      borderRadius: '5px',
    },
    '.token-import-input': {
      width: '100%',
      $nest: {
        'input': {
          width: '100%',
          background: 'none',
          color: 'blue',
          border: 'none',
          fontSize: '1rem',
          margin: '5px 0',
        }
      }
    },
    '.pnl-token-import': {
      border: '2px solid #e83e8c',
      borderRadius: '0.75rem',
      margin: '1rem 0',
      padding: '1.25rem 1rem 1rem'
    },
    '.i-modal_header > i-icon': {
      fill: '#f15e61 !important'
    },
    'i-icon': {
      display: 'inline-block'
    },
    '.btn-import': {
      background: 'transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      color: '#fff',
      fontSize: '1rem',
      padding: '0.25rem 1.25rem'
    },
    '::-webkit-scrollbar': {
      width: '3px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'var(--colors-primary-main)',
      borderRadius: '5px',
    },
    '.ml-auto': {
      marginLeft: 'auto',
    },
    '.custom-btn': {
      display: 'flex',
      alignItems: 'center',
      width: 'max-content',
      padding: '0.25rem 0.5rem',
      boxShadow: 'none',
      background: Theme.background.gradient,
      $nest: {
        '&:hover': {
          background: Theme.background.gradient,
          opacity: .9
        },
        '&.disabled': {
          background: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box',
          opacity: 1
        },
        '> i-icon': {
          marginRight: '0',
          height: '18px !important',
        },
        '> i-image': {
          lineHeight: 'initial',
          marginRight: '0.5rem',
        },
        '&.has-token': {
          background: 'transparent',
          fontWeight: 'bold',
          color: Theme.text.third,
          paddingRight: '0',
          $nest: {
            '> i-icon': {
              marginRight: '7px',
              fill: 'var(--colors-primary-main)',
            }
          }
        },
      },
    },
    '#btnMax': {
      marginRight: '0.25rem',
    },
    '#btnToken': {
      whiteSpace: 'nowrap',
    },
    '#btnToken i-icon': {
      marginLeft: '0.25rem',
    },
    '.bg-modal': {
      $nest: {
        '.modal': {
          background: Theme.background.modal,
          width: 500,
          maxWidth: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '1rem',
          color: Theme.text.primary,
          marginTop: 40
        },
      }
    },
    '#tokenImportModal.bg-modal .modal': {
      width: 400,
    },
    '#tokenSelectionModal': {
      $nest: {
        '.i-modal_header': {
          marginBottom: '1.5rem',
          paddingBottom: '0.5rem',
          borderBottom: '2px solid var(--divider)',
          color: Theme.colors.primary.main,
          fontSize: '1.25rem',
          fontWeight: 700,
        },
        '.i-modal_header > i-icon': {
          fill: 'var(--colors-primary-main) !important'
        },
        '.search': {
          position: 'relative',
          marginBottom: '1.5rem',
          $nest: {
            'i-icon': {
              position: 'absolute',
              top: 'calc(50% - 8px)',
              left: '1rem',
              transform: 'rotate(90deg)',
              opacity: 0.7
            },
            'i-input': {
              width: '100%'
            },
            'i-input > input': {
              width: '100%',
              height: 'auto !important',
              padding: '1rem 1.5rem 1rem 2.25rem',
              borderRadius: '0.5rem',
              border: '2px solid #2a3675',
              background: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
            }
          }
        },
        '.token-header': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBlock: '0.5rem',
          $nest: {
            'i-label *': {
              color: Theme.colors.primary.main,
              fontSize: '1rem',
            },
            '.token-section': {
              position: 'relative',
              cursor: 'pointer',
            },
            'i-icon': {
              width: '10px',
              height: '14px',
              display: 'flex',
              fill: Theme.text.primary,
              position: 'absolute',
              right: '0',
            },
            '.icon-sort-up': {
              top: '2px',
            },
            '.icon-sort-down': {
              bottom: '2px',
            },
            '.icon-sorted': {
              fill: Theme.colors.primary.main,
            }
          }
        },
        '.common-token': {
          $nest: {
            'i-grid-layout': {
              margin: '0.5rem 0 0',
              alignItems: 'center',
              justifyContent: 'unset'
            },
            '.grid-item': {
              padding: '0.35rem 0.5rem',
              borderRadius: '1rem',
              border: '2px solid transparent',
              cursor: 'pointer',
              $nest: {
                '&:hover': {
                  borderColor: Theme.colors.primary.main
                },
                'i-image': {
                  marginRight: '0.5rem'
                },
                'i-label': {
                  overflow: 'hidden'
                },
              }
            },
          }
        },
        '.token-list': {
          margin: '0.5rem -0.5rem',
          maxHeight: '45vh',
          overflowY: 'auto',
          $nest: {
            '.token-info': {
              display: 'flex',
              flexDirection: 'column',
              fontSize: '1rem',
              marginRight: '0.5rem',
              textAlign: 'left'
            },
            '.token-item': {
              padding: '0.5rem',
              overflow: 'unset',
              $nest: {
                '&:hover': {
                  background: 'linear-gradient(254.8deg,rgba(231,91,102,.1) -8.08%,rgba(181,32,130,.1) 84.35%) !important'
                },
                'i-image': {
                  marginRight: '0.5rem'
                },
                '&:not(:first-child)': {
                  marginTop: 0
                }
              }
            },
            '.token-name i-label > *': {
              fontSize: '0.75rem',
              marginRight: '0.5rem',
              color: 'rgba(255,255,255,0.55)'
            }
          }
        }
      }
    },
    '@media screen and (max-width: 425px)': {
      $nest: {
        '.common-list': {
          gridTemplateColumns: 'repeat(3, 1fr) !important',
        }
      }
    }
  }
})