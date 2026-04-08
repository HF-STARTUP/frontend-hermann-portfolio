"use client"

import React, { useState } from "react"
import { ChevronDown } from 'lucide-react'
import { RoleType } from "@/types/__form/profile.type"

interface Role {
    onglet: {
        name: string
    }
}

interface RoleTagProps {
    children: React.ReactNode
    tagType?: "read" | "write"
}

interface RoleTitleProps {
    children: React.ReactNode
}

interface ExpandableRolesProps {
    readRoles: RoleType[]
    writeRoles: RoleType[]
}

const RoleTag: React.FC<RoleTagProps> = ({ children, tagType = "read" }) => (
    <span className={`px-2 py-1 rounded-md text-sm ${tagType === "read" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
    {children}
  </span>
)

const RoleTitle: React.FC<RoleTitleProps> = ({ children }) => (
    <span className="font-semibold text-gray-700 min-w-[80px]">{children}</span>
)

export function ExpandableRoles({ readRoles, writeRoles }: ExpandableRolesProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-full bg-[#fdfdfd] rounded-md overflow-hidden shadow-sm">
            <div
                className="px-5 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold text-gray-700">Roles</h3>
                <button className="text-gray-500 focus:outline-none">
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
                </button>
            </div>
            <div
                className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
                }`}
            >
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col lg:flex-row gap-[12px]">
                        <RoleTitle>Lecture:</RoleTitle>
                        <div className="flex flex-wrap items-center gap-[10px]">
                            {readRoles.map((r, i) => (
                                <RoleTag key={i}>{r.name}</RoleTag>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-[12px]">
                        <RoleTitle>Ecriture:</RoleTitle>
                        <div className="flex flex-wrap items-center gap-[10px]">
                            {writeRoles.map((r, i) => (
                                <RoleTag key={i} tagType="write">
                                    {r.name}
                                </RoleTag>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
