"use client"

export default function Page() {
    return (
        <div className={"h-[100vh] w-[100vw] flex items-center justify-center gap-3 flex-col"}>
            <h1 className={"capitalize text-7xl"}>Unauthorized</h1>
            <p className={"text-center  max-w-[200px]"}>Votre compte à été désactiver, veuillez contacter l'administrateur.</p>
        </div>
    )
}