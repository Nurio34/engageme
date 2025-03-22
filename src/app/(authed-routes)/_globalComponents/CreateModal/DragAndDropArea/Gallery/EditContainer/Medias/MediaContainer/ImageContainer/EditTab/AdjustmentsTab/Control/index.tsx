import { Dispatch, SetStateAction, useState } from "react";
import { ControlType } from "..";
import { StyleType } from "../../..";

function Control({
  control,
  setStyle,
  setOtherStyle,
}: {
  control: ControlType;
  setStyle: Dispatch<SetStateAction<StyleType>>;
  setOtherStyle: Dispatch<SetStateAction<StyleType>>;
}) {
  const { label, name, value } = control;

  //! *** reset button render condition ***
  const [isHovered, setIsHovered] = useState(false);
  const resetRenderCondition1 = isHovered === true;
  const resetRenderCondition2 =
    label === "brightness" || label === "contrast" || label === "saturation";
  const resetRenderCondition3 = resetRenderCondition2 && value !== 1;
  const resetRenderCondition4 =
    label === "fade" || label === "temperature" || label === "vignette";
  const resetRenderCondition5 = resetRenderCondition4 && value !== 0;
  const resetRenderCondition6 = resetRenderCondition3 || resetRenderCondition5;

  const resetRenderCondition = resetRenderCondition1 && resetRenderCondition6;
  //! ************************************

  return (
    <li
      className="py-2 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center  py-2">
        <label htmlFor={name} className="block capitalize">
          {label}
        </label>
        {resetRenderCondition && (
          <button
            type="button"
            className=" text-info font-semibold text-sm"
            onClick={() => {
              setStyle((prev) => ({
                ...prev,
                [name]:
                  label === "fade" ||
                  label === "vignette" ||
                  label === "temperature"
                    ? 0
                    : 1,
              }));
              if (label === "fade")
                setOtherStyle((prev) => ({ ...prev, opacity: 1 }));
              if (label === "vignette")
                setOtherStyle((prev) => ({ ...prev, depth: 0 }));
            }}
          >
            Reset
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative grow">
          <input
            type="range"
            name={name}
            id={name}
            min={label === "temperature" ? -360 : 0}
            max={label === "temperature" ? 360 : 2}
            step={label === "temperature" ? 1 : 0.01}
            value={value}
            onChange={(e) => {
              setStyle((prev) => {
                return {
                  ...prev,
                  [name]: +e.target.value,
                };
              });
              if (label === "fade") {
                setOtherStyle((prev) => ({
                  ...prev,
                  opacity: +(1 - +e.target.value / 4).toFixed(2),
                }));
              }
              if (label === "vignette") {
                setOtherStyle((prev) => ({
                  ...prev,
                  depth: +(+e.target.value / 2).toFixed(2),
                }));
              }
            }}
          />
          <div
            className={`absolute bottom-[6px]
            ${
              label === "fade" || label === "vignette"
                ? "left-0 origin-left"
                : "left-1/2 origin-left"
            }
            w-1/2 h-[2px] bg-black  select-none pointer-events-none`}
            style={{
              transform: `scaleX(${
                label === "temperature"
                  ? value / 360
                  : label === "fade" || label === "vignette"
                  ? value
                  : value - 1
              })`,
            }}
          ></div>
        </div>
        <div className=" text-sm">
          {label === "fade" || label === "vignette"
            ? (value * 50).toFixed()
            : label === "temperature"
            ? (value / 3.6).toFixed()
            : (value * 100 - 100).toFixed()}
        </div>
      </div>
    </li>
  );
}
export default Control;
