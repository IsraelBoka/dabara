import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonBaseProps = VariantProps<typeof Buttonclasses> & {
  children: React.ReactNode;
};

interface ButtonAsAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

type ButtonProps = ButtonBaseProps & (ButtonAsAnchor | ButtonAsButton);

const Buttonclasses = cva(' inline-flex items-center justify-center', {
  variants: {
    variant: {
      primary:
        'bg-white transition-[text-shadow, colors] rounded-full hover:text-shadow hover:shadow-secondary duration-300  text-black',
      secondary:
        'rounded-lg text-[#121216] bg-blue-300   transition-colors font-semibold no-underline duration-300 hover:bg-blue-400',
      tertiary:
        'rounded-lg text-[#121216] bg-orange-300   transition-colors font-semibold no-underline duration-300 hover:bg-orange-400',
    },
    size: {
      small: 'text-sm px-3 py-4 h-7',
      medium: 'text-md px-4 h-8',
      large: ' text-md lg:text-lg px-6 h-12',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export const Button = ({ children, variant, size, ...props }: ButtonProps) => {
  const classes = Buttonclasses({ variant, size, className: props.className });

  if ('href' in props && props.href !== undefined) {
    return (
      <Link {...props} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};
