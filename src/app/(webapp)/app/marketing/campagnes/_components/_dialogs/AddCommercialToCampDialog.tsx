import { DialogMainBody } from "@/components/display/DialogMainBody"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CommercialList } from "../_sub_components/CommercialSelector";
import { DialogFooter } from "@/components/display/DialogFooter";

const AddCommercialToCampDialog = ({ id, isOpenned, onClose }: { id?: string, isOpenned: boolean, onClose: ()=> void }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleConfirm = () => {        
        onClose();
        setSelectedIds([]);
    };

    return (
        <Dialog open={isOpenned} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ajouter un commercial</DialogTitle>
                </DialogHeader>
                
                <DialogMainBody>
                    <CommercialList 
                        selectedIds={selectedIds} 
                        onChange={setSelectedIds} 
                    />
                </DialogMainBody>

                <DialogFooter>                    
                    <Button 
                        onClick={handleConfirm}
                        disabled={selectedIds.length === 0}
                        variant={"mainBlue"}
                        fullWidth
                    >
                        Ajouter ({selectedIds.length})
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default AddCommercialToCampDialog;