export default function Page(){

    return <div></div>
}

// "use client"
// import React from "react";
// import Packs, {PackList} from "@/app/(main)/tarif/components/packs/Packs";
// import PackInfo from "@/app/(main)/tarif/components/packs/components/PackInfo";
// import Advantages from "@/app/(main)/tarif/components/advantages/Advantages";
// import Container from "@/components/box/Container";
// import {cn} from "@/lib/utils";
//
// export default function TarifPage() {
//
//     return (
//         <div>
//             <Packs/>
//             <AbonnSectionTitle>Pour Particulier</AbonnSectionTitle>
//             <div className={"py-[70px] relative bg-gradient-to-r from-black/80 to-white"}>
//                 <Container>
//                     <PackList/>
//                 </Container>
//             </div>
//             <AbonnSectionTitle className={"bg-blue-800"}>Pour Entreprise</AbonnSectionTitle>
//             <div className={"py-[70px] bg-blue-700"}>
//                 <Container>
//                     <PackList index={1}/>
//                 </Container>
//             </div>
//             <div className={"py-[80px]"}>
//                 <Container>
//                     <PackInfo/>
//                 </Container>
//             </div>
//             <Advantages/>
//         </div>
//     )
// }
//
// const AbonnSectionTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
//
//     return (
//         <div
//             className={cn("text-white text-2xl font-bold flex  leading-9 h-[60px] px-6 py-3 bg-amber-400 justify-center items-center gap-2", className)}>
//             {children}
//         </div>
//     )
// }