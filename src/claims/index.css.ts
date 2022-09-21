import { Styles } from '@ijstech/components';

export default Styles.style({
    $nest: {
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