import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export default Styles.style({
  textAlign: 'center',
  $nest: {
    '.modal': {
      minWidth: '25%',
      maxWidth: '550px'
    },
    '.i-modal-close svg': {
      fill: Theme.colors.primary.dark
    },
    '.i-modal_content': {
      padding: '0 1rem 1.5rem',
      lineHeight: '1.5rem'
    },
    'i-button': {
      textAlign: 'center'
    },
    '.btn': {
      padding: '.3em 1em',
      fontSize: '14px'
    },
    '.btn-cancel': {
      background: '#2B304A 0% 0% no-repeat padding-box'
    }
  }
})