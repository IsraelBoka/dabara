interface HeroProps {
    children : React.ReactNode,
}

interface HeroElementProps extends VariantProps<typeof HeroClasses> {
    children : React.ReactNode,
    className ?: string,
}

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import classNames from "classnames";
const HeroClasses = cva("", {
    variants : {
        size: {
            small : " text-3xl font-bold my-8 md:text-5xl",
            medium : "text-5xl font-bold my-8 md:text-6xl",
            large : " text-6xl font-bold my-8 lg:text-7xl",
        }
    },
    defaultVariants : {
        size : "medium",
    }
})

export const HeroTitle = (props : HeroElementProps) => {
    const { size, children, className } = props;
    return (
        <h1 className= {classNames(HeroClasses({size}) , className)}>
            {children}
        </h1>
    )
}

export const HeroSub = (props : HeroElementProps) => {
    const { children, className } = props;
    return (
        <p className={classNames("mb-16 mt-16 text-gray-400 text-xl ", className)}> 
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
