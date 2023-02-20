import classNames from 'classnames';
export const Container = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return <div className={classNames('mx-auto max-w-6xl px-4 lg:px-8', classname)}>{children}</div>;
};
