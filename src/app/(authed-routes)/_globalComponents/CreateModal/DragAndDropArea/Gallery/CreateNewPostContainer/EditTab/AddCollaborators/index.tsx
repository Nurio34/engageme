import CollaboratorsIcon from "@/app/_globalComponents/Svg/CollaboratorsIcon";

function AddCollaborators() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <input
        type="text"
        name="collaborators"
        id="collaborators"
        placeholder="Add Collaborators"
        className="outline-none bg-transparent"
      />
      <CollaboratorsIcon />
    </div>
  );
}
export default AddCollaborators;
