import { ContactHeader } from "../details/ContactHeader";
import { ContactInfoList } from "../details/ContactInfoList";
import { OpenVtcProfileButton } from "../details/OpenVtcProfileButton";
import { ConversationTagsSection } from "../details/ConversationTagsSection";
import WaContactModel from "@/model/whatsapp/WaContactModel";
import { mockContacts } from "../../WhatsappMockData";
import { InternalNotesSection } from "../details/InternalNotesSection";
import { ConversationActionsSection } from "../details/ConversationActionsSection";

const defaultContact = WaContactModel.fromResponse(mockContacts[0]);

export function DetailsColumn() {
    return (
        <div className="flex h-full flex-col overflow-y-auto">
            <ContactHeader contact={defaultContact} />
            <OpenVtcProfileButton profileId={defaultContact.profileId} />
            <ContactInfoList />
            <ConversationTagsSection />
            <InternalNotesSection />
            <ConversationActionsSection />
        </div>
    );
}