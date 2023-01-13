import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";


interface ButtonProps extends VariantProps<typeof Buttonclasses>  {
    children: React.ReactNode,
}

const Buttonclasses = cva("rounded-full inline-flex items-center  ", {
    variants : {
        variant : {
            primary : "bg-white  hover:text-shadow hover:shadow-primary  text-black",
            secondary : "bg-red-500 text-white",
            tertiary : "bg-green-500 text-white",
        },
        size : {
            small : "text-xs px-3 h-6",
            medium : "text-sm px-4 h-8",
            large : "text-md px-6 h-12",
        }
    },
    defaultVariants : {
        variant : "primary",
        size : "medium",
    }
})

export const Button = (props: ButtonProps) => {
    const { children, variant, size } = props;
    return (
        <button className={Buttonclasses({variant, size})}>
        {children}
        </button>
    );
    }