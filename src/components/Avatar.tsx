import classNames from "classnames";
import Image from "next/image";

interface AvatarProps {
    classname?: string,
    lien?: string,
    nom : string,
    email ?: string,

}

export const Avatar = (props: AvatarProps) => {
    const {  classname, lien, nom, email } = props;
    return (
        <div className={classNames("flex items-center  p-2 rounded", classname)}>
            <div className="  border-4 border-blue-300  p-1 rounded-full ">
                
            {
                lien ? (
                    <Image  className="w-16 h-16 rounded-full object-contain" referrerPolicy = "origin" src={lien} width={500} height={500} alt="test"/>
                    ) : (
                        <Image referrerPolicy = "origin" className="w-16 h-16" src={`https://api.dicebear.com/5.x/lorelei/svg?seed=${nom.replace(" ", "-")}`} width={500} height={500} alt="test"/>
                        )
                    }
            </div>
            <div className="m-2 ">         
            <p className="font-extrabold tracking-wide text-xl">{nom}</p>
            <p className="text-sm">{email}</p>
            </div>
        </div>
    )
}