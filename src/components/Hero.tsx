interface HeroProps {
    children : React.ReactNode,
}

interface HeroElementProps extends VariantProps<typeof HeroClasses> {
    children : React.ReactNode,
}

import { cva, VariantProps } from "class-variance-authority";

const HeroClasses = cva("", {
    variants : {
        size: {
            small : " text-3xl font-bold my-8 md:text-5xl",
            medium : "text-5xl font-bold my-8 md:text-7xl",
            large : " text-6xl font-bold my-8 md:text-8xl",
        }
    },
    defaultVariants : {
        size : "medium",
    }
})

export const HeroTitle = (props : HeroElementProps) => {
    const { size, children } = props;
    return (
        <h1 className= {HeroClasses({size})}>
            {children}
        </h1>
    )
}

export const HeroSub = ({children} : HeroElementProps) => {
    return (
        <p className="mb-6 text-gray-400 text-xl"> 
            {children}
        </p>
    )
}

export const Hero = ({ children } : HeroProps) => {
    return (
        <div className="text-center ">
            {children}
        </div>
    )
}
