export const fetchPopularStates = async () => {
    const res = await fetch('http://localhost:3000/api/getState')
    const data = await res.json()
    // console.log(data,"data")
    const PopularStates = data;
    return PopularStates;
}