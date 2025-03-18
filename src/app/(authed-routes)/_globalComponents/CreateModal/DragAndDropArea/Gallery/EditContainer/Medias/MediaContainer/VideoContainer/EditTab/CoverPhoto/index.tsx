function CoverPhoto() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Cover Photo</h2>
        <label
          htmlFor="coverPhoto"
          className="font-semibold text-info cursor-pointer hover:text-base-content/80"
        >
          Select from computer
          <input type="file" name="coverPhoto" id="coverPhoto" hidden />
        </label>
      </div>
    </div>
  );
}
export default CoverPhoto;
