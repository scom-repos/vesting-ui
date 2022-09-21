import {application} from '@ijstech/components';
let moduleDir = application.currentModuleDir;

function fullPath(path: string): string{
    return `${moduleDir}/${path}`
}
export default {
    icons: {
        logo: `${moduleDir}/img/sc-logo.svg`,
        logoMobile: `${moduleDir}/img/sc-logo-mobile.svg`,
        validocs: `${moduleDir}/img/validocs.svg`
    },
    fullPath
}