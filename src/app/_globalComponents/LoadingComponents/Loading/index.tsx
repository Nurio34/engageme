function Loading({ size }: { size?: number }) {
  return (
    <div className="relative w-3 aspect-square">
      <div className="absolute top-1/2 left-1/2 -translate-y-[3px] -translate-x-[1px]">
        <style>
          {`
                @keyframes spin {
                    from {
                     opacity : 0
                    }
                    to {
                        opacity : 1
                    }
                }
                `}
        </style>
        {Array(8)
          .fill("#")
          .map((_, index) => (
            <div
              key={index}
              className=" absolute w-[2px] h-[6px] bg-base-content"
              style={{
                height: size || 6,
                transform: `rotateZ(${index * 45}deg) translateY(${
                  size || 6
                }px)`,
                animation: `spin 1s ${index / 8}s ease infinite`,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}
export default Loading;
