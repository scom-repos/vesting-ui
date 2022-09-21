import { Styles } from '@ijstech/components';

export default Styles.style({
    $nest: {
        '.canBreak': {
            wordBreak: 'break-all'
        },
        '.custom-combobox': {
            $nest: {
                '> .icon-btn': {
                    width: 32,
                    justifyContent: 'center'
                }
            }
        },
        'i-input > input': {
            paddingLeft: 10
        }
    }
})