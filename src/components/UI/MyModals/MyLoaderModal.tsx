type MyLoaderModal = {
  children: React.ReactNode;
};

function MyLoaderModal({ children }: MyLoaderModal) {
  return (
    <div className="absolute top-[40%] left-[50%] -translate-x-[50px] rounded-[10px] bg-white z-20">
      <p className="px-4 py-1 text-black cursor-default">{children}</p>
    </div>
  );
}

export default MyLoaderModal;
