import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export default Styles.style({
  textAlign: 'center',
  $nest: {
    'i-label > *': {
      fontSize: '.875rem',
      wordBreak: 'normal'
    },
    '.modal': {
      minWidth: '25%',
      maxWidth: 455
    },
    '.i-modal-close svg': {
      fill: Theme.colors.primary.dark
    },
    '.i-modal_content': {
      padding: '0 2.563rem 3rem'
    },
    '.waiting-txt > *': {
      color: Theme.colors.warning.light,
      fontSize: '1.125rem'
    },
    '.confirm-txt > *': {
      color: '#C2C3CB'
    },
    '.red-link *': {
      color: '#FD4A4C',
      textDecoration: 'none'
    },
    '.mb': {
      marginBottom: '1.875rem'
    },
    'i-button': {
      padding: '1rem 2rem',
      textAlign: 'center'
    },
    '.address-txt > *': {
      lineHeight: '1.5rem'
    },
    '.btn-submit': {
      padding: '.35rem 2.438rem',
      borderRadius: 5
    },
    '.btn-cancel': {
      padding: '.35rem 2.438rem',
      borderRadius: 5,
      background: '#2B304A 0% 0% no-repeat padding-box'
    }
  }
})