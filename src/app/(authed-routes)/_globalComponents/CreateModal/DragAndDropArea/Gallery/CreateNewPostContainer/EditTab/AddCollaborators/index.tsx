import toast from "react-hot-toast";
import { FaCircleInfo } from "react-icons/fa6";

function AddCollaborators() {
  return (
    <button
      type="button"
      className=" flex justify-center items-center px-4 py-2"
      onClick={(e) => {
        e.stopPropagation();
        toast("This feature is under development !", {
          className: "text-center",
          icon: <FaCircleInfo className="text-4xl text-info" />,
        });
      }}
    >
      Add Collaborators
    </button>
  );
  // return (
  //   <div className="flex items-center justify-between px-4 py-2">
  //     <input
  //       type="text"
  //       name="collaborators"
  //       id="collaborators"
  //       placeholder="Add Collaborators"
  //       className="outline-none bg-transparent"
  //     />
  //     <CollaboratorsIcon />
  //   </div>
  // );
}
export default AddCollaborators;
