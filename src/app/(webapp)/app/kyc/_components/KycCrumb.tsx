"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface KycCrumbProps {
  currentLabel?: string;
  showBack?: boolean;
}

export function KycCrumb({ currentLabel, showBack = false }: KycCrumbProps) {
  const router = useRouter();

  return (
    <div className="inline-flex items-center gap-2">
      {showBack && (
        <button
          type="button"
          onClick={() => router.push("/app/kyc")}
          className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          aria-label="Retour à la liste KYC"
        >
          <ArrowLeft className="size-4" />
        </button>
      )}
      <div className="flex items-center min-w-0 overflow-hidden">
        <span className="text-gray-400 text-sm font-normal leading-5 whitespace-nowrap">
          Admin VTCControl /{" "}
          {showBack ? (
            <>
              <Link
                href="/app/kyc"
                className="hover:text-gray-500 transition-colors"
              >
                KYC & Vérifications
              </Link>
              {" / "}
            </>
          ) : null}
        </span>
        <span className="text-gray-600 text-sm font-semibold leading-5 truncate">
          {currentLabel ?? "KYC & Vérifications"}
        </span>
      </div>
    </div>
  );
}
