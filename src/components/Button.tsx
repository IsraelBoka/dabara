import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import classNames from "classnames";


interface ButtonProps extends VariantProps<typeof Buttonclasses>  {
    children: React.ReactNode,
    className ?: string,
}

const Buttonclasses = cva(" inline-flex items-center justify-center", {
    variants : {
        variant : {
            primary : "bg-white rounded-full hover:text-shadow hover:shadow-secondary duration-200  text-black",
            secondary : "rounded-lg text-gray-800 bg-blue-300 transition-colors font-semibold no-underline duration-200 hover:bg-blue-400",
            tertiary : "rounded-lg text-gray-800 bg-orange-300 transition-colors font-semibold no-underline duration-200 hover:bg-orange-400",
        },
        size : {
            small : "text-sm px-3 py-4 h-7",
            medium : "text-md px-4 h-8",
            large : "text-lg px-6 h-12",
        }
    },
    defaultVariants : {
        variant : "primary",
        size : "medium",
    }
})

export const Button = (props: ButtonProps) => {
    const { children, variant, size, className } = props;
    return (
        <button className={classNames(Buttonclasses({variant, size}), className )}>
        {children}
        </button>
    );
    }