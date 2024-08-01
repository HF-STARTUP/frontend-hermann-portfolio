import Image from "next/image";

const ScheduledUser = () => {
  return (
      <div className={`w-full bg-white border rounded border-text-body flex gap-[2px] px-[2px] py-[4px] mx-2 my-2`}>
          <div>
              <Image className={`w-[50px] h-auto`} src={'/assets/faker/receips/default-user-recipts.png'} width={50} height={50}  alt={'default image'}/>
          </div>
          <div className={`text-admin-primary font-bold text-[12px] leading-[13px] w-full flex flex-col justify-start items-start text-left`}>
              <div>Tonleu Cedric Junior</div>
              <div>Toyota Corolla 2008</div>
          </div>
      </div>
  )
}

export default ScheduledUser
