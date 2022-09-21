const SC_Node_API_URL = "https://api.scom.dev/api/1.0";

const updateDataToIPFS = async (data: any, fileName?: string) => {
  try {
    const response = await fetch(SC_Node_API_URL + '/sync/data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data,
        fileName
      })
    });
    let jsonContent = await response.json();
    return jsonContent.data;
  } catch (err) {
    console.dir(err);
    return "";
  }
}

const _fetchFileContentByCID = async (ipfsCid: string) => {
  const IPFS_Gateway = 'https://{CID}.ipfs.dweb.link/';
  let result = await fetch(IPFS_Gateway.replace('{CID}', ipfsCid));
  return result;
}

const fetchFileJsonContentByCID = async (ipfsCid: string) => {
  let result = await _fetchFileContentByCID(ipfsCid);
  let packageInfoFileContent = await result.json();
  return packageInfoFileContent;
}

//Temporary hack
const fetchFileJsonContentByCID2 = async (rootCID: string) => {
  let fileCID;
  if (rootCID.startsWith('bafk')) {
    fileCID = rootCID;
  }
  else {
    const response = await fetch(`https://dweb.link/api/v0/ls?arg=${rootCID}`);
    let jsonContent = await response.json();
    fileCID = jsonContent.Objects[0].Links[0].Hash;
  }
  let fileContent = await fetchFileJsonContentByCID(fileCID)
  return fileContent;
}

export {
  updateDataToIPFS,
  fetchFileJsonContentByCID,
  fetchFileJsonContentByCID2
}