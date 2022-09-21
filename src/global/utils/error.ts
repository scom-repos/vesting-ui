export async function parseContractError(oMessage:string, tokens: string[]):Promise<string> {
    const staticMessageMap: { [key: string]: string } = {
        'MetaMask Tx Signature: User denied transaction signature.': 'User denied transaction signature',
        'execution reverted: not from admin': 'Not from admin',
        'execution reverted: not from owner': 'Not from owner',
        'execution reverted: not from new owner': 'Not from new owner',
        'execution reverted: already a admin': 'Already a admin',
        'execution reverted: Action performed by unauthorized address.': 'Action performed by unauthorized address',
        'execution reverted: project not exist': 'Project not exist',
        'execution reverted: already validated': 'Already validated',
        'execution reverted: not under auditing': 'Not under auditing',
        'execution reverted: invalid packageVersionId': 'Invalid packageVersionId',
        'execution reverted: Audit passed version cannot be voided': 'Audit passed version cannot be voided',
        'execution reverted: already voided': 'Already voided',
        'execution reverted: not in progress': 'Not in progress',
        'execution reverted: invalid packageId': 'Invalid packageId',
        'execution reverted: not passed': 'Not passed',
        'execution reverted: projectId/versionIdx not match': 'ProjectId/VersionIdx not match',
        'execution reverted: projectId/packageId not match': 'ProjectId/PackageId not match',
    }

    let s = staticMessageMap[oMessage];
    if (s) {
        return s;
    }

    return '';
}
