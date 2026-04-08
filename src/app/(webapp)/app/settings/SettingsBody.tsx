"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoleList from "./_components/RolesList"
import { useRoleHook } from "./_hook/useRoleHook"
import { useState } from "react"
import ProfilePage from "./_components/_profile/ProfilePage"
import UsersPage from "./_components/_users/UsersPage"

const SettingsBody = () => {
    const [activeTab, setActiveTab] = useState<"roles" | "users" | "profile">("profile")
    const { adminRoles, isLoadingAdminRoles } = useRoleHook()
    return (
        <div className="bg-white rounded-2xl flex flex-col space-y-4 overflow-x-hidden overflow-y-auto custom-scrollbar relative max-h-[calc(100dvh-170px)] lg:max-h-[calc(100dvh-120px)]">
            <header className="pt-6 border-b shadow-sm sticky top-0 bg-white/70 backdrop-blur-sm z-10">
                <Tabs value={activeTab} defaultValue="roles" onValueChange={(value) => setActiveTab(value as "roles" | "users")}>
                    <TabsList className="bg-transparent rounded-none p-0">
                        <TabsTrigger value="profile" className="px-6 text-lg data-[state=active]:border-b-2 data-[state=active]:border-vaMainBlue data-[state=active]:text-vaMainBlue data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent rounded-none">
                            Profil
                        </TabsTrigger>
                        <TabsTrigger value="roles" className="px-6 text-lg data-[state=active]:border-b-2 data-[state=active]:border-vaMainBlue data-[state=active]:text-vaMainBlue data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent rounded-none">
                            Rôles & Permissions
                        </TabsTrigger>
                        <TabsTrigger value="users" className="px-6 text-lg data-[state=active]:border-b-2 data-[state=active]:border-vaMainBlue data-[state=active]:text-vaMainBlue data-[state=active]:rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent rounded-none">
                            Utilisateurs
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </header>
            <div className="main p-6">
                {activeTab == "roles" &&
                    <RoleList items={adminRoles} isLoading={isLoadingAdminRoles} />
                }

                {activeTab == "profile" &&
                    <ProfilePage />
                }


                {activeTab == "users" &&
                    <UsersPage />
                }


            </div>
        </div>
    )
}

export default SettingsBody