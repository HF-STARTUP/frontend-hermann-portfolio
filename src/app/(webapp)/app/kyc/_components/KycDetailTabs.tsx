"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KycSubmissionDetailModel } from "@/model/ADMIN/KycSubmissionDetail";
import { Button } from "@/components/ui/button";
import { Download, FileText, History } from "lucide-react";
import { KycDocumentCard } from "./KycDocumentCard";
import { EmptyData } from "@/components/box/PageNetworkState";
import { cn } from "@/lib/utils";

const tabTriggerClass =
  "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-800 data-[state=active]:text-blue-800 data-[state=inactive]:text-gray-600 data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none bg-transparent shadow-none px-4 py-3 h-auto text-base font-medium leading-4 gap-2 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:size-4 data-[state=active]:[&_svg]:text-blue-800 data-[state=inactive]:[&_svg]:text-gray-600";

export function KycDetailTabs({
  detail,
}: {
  detail: KycSubmissionDetailModel;
}) {
  const documents = detail.documents;

  const handleDownloadAll = () => {
    documents.forEach((doc) => {
      if (doc.fileUrl) {
        window.open(doc.fileUrl, "_blank");
      }
    });
  };

  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 gap-1">
        <TabsTrigger value="documents" className={tabTriggerClass}>
          <FileText className="size-4" />
          Documents ({documents.length})
        </TabsTrigger>
        <TabsTrigger value="audit" className={tabTriggerClass}>
          <History className="size-4" />
          Historique d&apos;audit
        </TabsTrigger>
      </TabsList>

      <TabsContent value="documents" className="mt-3">
        <div
          className={cn(
            "bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)]",
            "px-6 pt-8 pb-6 flex flex-col gap-4",
          )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-slate-500" />
              <h2 className="text-xl font-semibold text-neutral-950">
                Documents soumis
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-[10px] gap-2 text-sm border-gray-200 text-slate-500 h-10 px-4"
              onClick={handleDownloadAll}
              disabled={documents.length === 0}>
              <Download className="size-4" />
              Tout télécharger
            </Button>
          </div>

          {documents.length === 0 ? (
            <EmptyData
              message="Aucun document soumis"
              description="Ce dossier ne contient pas encore de pièces jointes."
              className="h-[280px]"
            />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <KycDocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="audit" className="mt-4">
        <div className="bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] px-6 py-8">
          {detail.auditHistory.length === 0 ? (
            <EmptyData
              message="Aucun historique"
              description="Aucune action d'audit enregistrée pour ce dossier."
              className="h-[280px]"
            />
          ) : (
            <div className="space-y-3">
              {detail.auditHistory.map((event, index) => (
                <div
                  key={event.id ?? index}
                  className="border border-gray-200 rounded-xl p-4">
                  <p className="font-medium text-neutral-950 text-sm">
                    {event.action ?? "Action"}
                  </p>
                  {event.actor && (
                    <p className="text-xs text-gray-400 mt-1">{event.actor}</p>
                  )}
                  {event.comment && (
                    <p className="text-sm text-gray-600 mt-2">
                      {event.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
