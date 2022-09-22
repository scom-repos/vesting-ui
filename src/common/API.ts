const Upload_Data_API_URL = "https://ipfs-gateway.scom.dev/api/1.0";
const Fetch_API_URL = "https://ipfs.scom.dev/ipfs/{CID}";

const updateDataToIPFS = async (data: any, fileName?: string) => {
  try {
    const response = await fetch(Upload_Data_API_URL + '/sync/data', {
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
  let result = await fetch(Fetch_API_URL.replace('{CID}', ipfsCid));
  return result;
}

const fetchFileJsonContentByCID = async (ipfsCid: string) => {
  let result = await _fetchFileContentByCID(ipfsCid);
  let packageInfoFileContent = await result.json();
  return packageInfoFileContent;
}

//Temporary hack
const fetchFileJsonContentByCID2 = async (rootCID: string) => {
  try {
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
  catch(err) {
    return null;
  }
}

export {
  updateDataToIPFS,
  fetchFileJsonContentByCID,
  fetchFileJsonContentByCID2
}