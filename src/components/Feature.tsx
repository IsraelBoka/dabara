type FeatureProps = {
  feature: {
    title: string;
    description: string;
    Icon: React.FC;
  }[];
};

export const Feature = ({ feature }: FeatureProps) => {
  return (
    <div className="grid w-full gap-9 text-sm text-gray-400 lg:grid-cols-3">
      {feature.map((feature, index) => (
        <div
          key={index}
          className="w-64  [&_svg]:mr-1.5 [&_svg]:inline [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-[#f7f8f8]"
        >
          <feature.Icon />
          <span className="text-sm font-bold text-[#f7f8f8]">{feature.title}.</span>
          {feature.description}.
        </div>
      ))}
    </div>
  );
};
