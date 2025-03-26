import { Dispatch, SetStateAction } from "react";

function ChecboxToggle({
  isChecked,
  setIsChecked,
  isDisabled,
}: {
  isChecked: boolean | undefined;
  setIsChecked: Dispatch<SetStateAction<boolean | undefined>>;
  isDisabled?: boolean | undefined;
}) {
  const id = crypto.randomUUID();

  return (
    <label
      htmlFor={id}
      className={`${!isDisabled ? "cursor-pointer" : "cursor-not-allowed"}`}
    >
      <div
        className={`w-10 h-6 flex items-center transition-colors
            ${isChecked ? "bg-base-content" : "bg-base-300"}
            `}
        style={{ borderRadius: "50vw" }}
      >
        <div
          className="w-5 bg-base-100 rounded-full transition-transform"
          style={{
            height: 20,
            transform: `${isChecked ? "translateX(18px)" : "translateX(2px)"}`,
          }}
        ></div>
      </div>
      <input
        type="checkbox"
        name={id}
        id={id}
        hidden
        checked={isChecked}
        disabled={isDisabled}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    </label>
  );
}
export default ChecboxToggle;
