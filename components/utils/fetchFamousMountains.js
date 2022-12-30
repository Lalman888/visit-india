export const fetchFamousMountains = async () => {
    const res = await fetch('http://localhost:3000/api/getFamousMountains')
    const data = await res.json()
    // console.log(data,"data")
    const FamousMountains = data;
    return FamousMountains;
}
