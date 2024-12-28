// "use client"
//
// import React from "react";
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import MapComponent from "@/app/(protected)/dashboard/geolocation/_components/map/MapComponent";
// import MapCarStats from "@/app/(protected)/dashboard/geolocation/_components/mapCarStat/MapCarStats";
// import useGeolocationStore from "@/stores/protected/dashboard/geolocation/useGeolocationStore";
// import {PlaceFieldInput} from "@/components/form/PlacField";
//
// const GeolocationPage: React.FC = () => {
//
//     const {resetState} = useGeolocationStore()
//
//     React.useEffect(()=>{
//         return(()=>resetState())
//     }, [])
//
//     return (
//         <div>
//             <AdminSubNav title={`Géolocalisation`} withUserSetting={false}/>
//             <GeolocationContent
//                 firstChild={<MapCarStats/>}
//                 secondChild={<MapComponent/>}
//             />
//         </div>
//     )
// }
//
// const GeolocationContent: React.FC<{ firstChild: React.ReactNode, secondChild: React.ReactNode }> = ({
//                                                                                                          firstChild,
//                                                                                                          secondChild
//                                                                                                      }) => {
//     return (
//         <div className={`grid grid-cols-12 gap-4`}>
//             <div className={`col-span-4`}>
//                 {firstChild}
//             </div>
//             <div className={`col-span-8`}>
//                 {secondChild}
//             </div>
//         </div>
//     )
// }
//
// export default GeolocationPage

export default function Page(){
    return <div></div>
}