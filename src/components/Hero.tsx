interface HeroProps {
    title: string;
    subtitle: string;
}

export const Hero = ({title, subtitle } : HeroProps) => {
    return (
        <div>
            <h1 className=" text-4xl ">{title}</h1>
            <p className="text-2xl">{subtitle}</p>
        </div>
    )
}
