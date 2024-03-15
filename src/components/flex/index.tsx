type Measure = 'px' | '%' | 'rem' | 'vh' | 'vw';
type NumberMeasure = `${number}${Measure}`;
type NumberMeasureCombinations = NumberMeasure | `${NumberMeasure} ${NumberMeasure}` | '0';

export type FlexProps = {
  direction?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  padding?: NumberMeasureCombinations;
  gap?: NumberMeasureCombinations;
  children: React.ReactNode;
};

export const Flex = ({
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'center',
  padding = '0',
  gap = '0',
  children,
}: FlexProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: direction,
        alignItems,
        justifyContent,
        padding,
        gap,
      }}>
      {children}
    </div>
  );
};
