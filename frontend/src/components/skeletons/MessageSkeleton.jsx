const messageSkeleton = () => {
  return (
    <>
      <div className="flex gap-3 items-center mb-3">
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-40"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end mb-3">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-40"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
        <div className="skeleton w-10 h-10 rounded-full shrink-0"></div>
      </div>
    </>
  );
};
export default messageSkeleton;
