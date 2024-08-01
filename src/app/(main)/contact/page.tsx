import {PrimaryBgCardWithImageContainer} from "@/components/box/PrimaryBgCardContainer";
import Container from "@/components/box/Container";
import {ContactForm, ContactInfo} from "@/app/(main)/contact/_components/ContactComponents";

export default function ContactPage() {

    return (
        <div className={``}>
            <PrimaryBgCardWithImageContainer bg={"bg-[url('/assets/contactHero.png')]"}>
                <div className={`py-[29px] lg:py-[83px] w-full bg-[url('/assets/eclipse.png')] bg-no-repeat`}
                     style={{backgroundPosition: '-200px -74px'}}>
                    <Container>
                        <div className={`w-full grid grid-cols-12 justify-between items-start`}>
                            <div className={`col-span-12 lg:col-span-7`}>
                                <ContactInfo/>
                            </div>
                            <div className={`col-span-12 lg:col-span-5`}>
                                <ContactForm/>
                            </div>
                        </div>
                    </Container>
                </div>
            </PrimaryBgCardWithImageContainer>
        </div>
    )
}


