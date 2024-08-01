import React from "react";

export default function CarsPage() {

    return (
        <div>
            <AASectionTittle
                title={"Véhicules"}
            />
        </div>
    )
}


const AASectionTittle: React.FC<{ title: string }> = ({title}) => {

    return (
        <div className="text-black text-2xl font-semibold">{title}</div>
    )
}