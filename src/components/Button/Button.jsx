import './Button.css'

export const Button = (props) => {
  const { label, className, onClick } = props;

  const handleClick = (e) => {
    e.stopPropagation();

    onClick();
  };

  const buttonClass = `buttonWrapper${className ? ` ${className}` : ''}`

  return <div className={buttonClass} onClick={handleClick}>{label}</div>;
};
