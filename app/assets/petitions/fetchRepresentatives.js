

const fetchRepresentatives = async (backendURLBaseServices,endpoints,clientId, postcode, setMp, setSenator, setShowLoadSpin) => {
    //const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params)
    console.log('fetchReps')
    const requestOptions = {
        method: "GET",
        redirect: 'follow',
    }
    const datos = await fetch( `${backendURLBaseServices}${endpoints.toGetRepresentativesByCp}?clientId=${clientId}&postcode=${postcode}`,requestOptions)
    
    const response =  await datos.json() 
    console.log('datosREsponse', response)
    let query = response.mps;  
    let fill = await query.filter((el) => el.govt_type == 'Federal MPs');
    setMp(fill);
    setSenator(response.data)
    setShowLoadSpin(false)
}


export{
    fetchRepresentatives
}
