import React, {MouseEventHandler} from "react";
import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogContentListItem
} from "@/components/dialog/Dialog";
import {useRequestUncollectedRecipes} from "@/hooks/acounting/useAcounting";
import Loading from "@/components/ui/Loader";
import {UncollectedRecipesModel} from "@/model/accounting/Accounting";
import VImageProvider from "@/components/helpers/VImageProvider";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {cn} from "@/lib/utils";

export const UncollectedRevenusDialog: React.FC<{
    isOpen: boolean,
    isExpected?: boolean,
    isSelect?: boolean,
    selectTitle?: string,
    onClose: (value: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 isOpen,
                                                 isExpected = false,
                                                 selectTitle,
                                                 onClose,
                                                 isSelect,
                                                 children,
                                                 ...props
                                             }) => {


    const {data: recipes, isLoading} = useRequestUncollectedRecipes(isExpected)
    const {currency} = useGetCurrency()

    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead withBack={isSelect}
                                 title={isExpected ? "Recettes attendus ajoud'hui" : 'Recettes non encaissées'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                <div className={`mt-[15px] mb-[20px]`}>
                    <div {...props}>
                    </div>
                </div>
                <DefaultDialogMainBody>
                    {isLoading && <Loading/>}
                    {!isLoading && <DialogContentListItem>
                        <div className={"flex justify-between pb-4"}>
                            <div
                                className="text-center text-black text-base font-medium leading-tight">Tous
                            </div>
                            <div
                                className={cn(
                                    "text-center text-red-600 text-base font-medium leading-tight",
                                    isExpected && "text-admin-primary"
                                )}>Total à encaisser: {recipes?.reduce((acc, r) => acc + r.amount, 0)} {currency}</div>
                        </div>
                        {recipes && (
                            <div className={"flex flex-col gap-2"}>
                                {recipes.map((r, i) => (
                                    <UncollectedItem
                                        recipe={r}
                                        key={i}
                                        isSuccess={isExpected}
                                    />
                                ))}
                            </div>
                        )}
                    </DialogContentListItem>}
                </DefaultDialogMainBody>
                <DialogActions className={`mt-[20px]`}>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

const UncollectedItem: React.FC<{ recipe: UncollectedRecipesModel, isSuccess?: boolean }> = ({
                                                                                                 recipe,
                                                                                                 isSuccess = false
                                                                                             }) => {

    const {currency} = useGetCurrency()

    return (
        <div className={"flex items-center justify-between py-[8px] px-[22px]  bg-violet-50 rounded-[17.55px]"}>
            <div className={"flex items-start justify-start gap-[20px]"}>
                <div>
                    <VImageProvider
                        src={recipe.driver.getAvatar}
                        alt={recipe.driver.getUsername}
                        width={30}
                        height={30}
                        className={"rounded-[11px] size-[30px]"}
                    />
                </div>
                <div>
                    <div
                        className="text-[#506D82] text-sm font-medium leading-none mb-1">
                        {recipe.driver.getUsername}
                    </div>
                    <div className={cn(
                        "text-red-600 text-xs font-medium leading-tight",
                        isSuccess && "text-green-600"
                    )}>{recipe.driver.getGrade}</div>
                </div>
            </div>
            <div className={
                cn(
                    "text-center text-slate-600 text-xs font-medium leading-tight",
                )
            }>
                {recipe.amount} {currency}
            </div>
        </div>
    )
}