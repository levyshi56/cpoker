
interface CardParam{
  inPlay?: boolean;
  suit: string;
  value: number;
  disabled?: boolean;
  setState?: () => {};
}
export default function Card({setState, inPlay, suit, value, disabled}:CardParam) {
  const buttonStyles = {
    backgroundColor: inPlay ? 'red' : 'green',
    // Add any other styles as needed
  };

  return (<button disabled={disabled} style={buttonStyles} onClick={setState}>{suit} {value}</button>)
}