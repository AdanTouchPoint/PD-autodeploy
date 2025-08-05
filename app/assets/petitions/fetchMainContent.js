const fetchMainContent = async (backendURLBase, id, clientId, campaignType) => {
    const requestOptions = {
        method: "GET",
        redirect: 'follow',
    };
    const url = `${backendURLBase}/campaignContentId?clientId=${clientId}&id=${id}&type=${campaignType}`;
    const pageData = await fetch(url, requestOptions, { cache: 'no-store' });

    if (!pageData.ok) {
        throw new Error(`Failed to fetch main content: ${pageData.status} ${pageData.statusText}`);
    }

    const data = await pageData.json();
    console.log('Fetched main content data:', data.data.docs[0]);
    return data;
};

export {
    fetchMainContent
}
