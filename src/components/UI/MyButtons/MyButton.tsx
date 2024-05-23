type MyButtonProps = {
  children?: React.ReactNode;
  className?: string;
};

function MyButton({ children, className }: MyButtonProps) {
  return (
    <button
      className={
        "px-3 py-1 rounded-[8px] cursor-pointer duration-150 hover:bg-[#3758c5]" +
        " " +
        className
      }
    >
      {children}
    </button>
  );
}

export default MyButton;
