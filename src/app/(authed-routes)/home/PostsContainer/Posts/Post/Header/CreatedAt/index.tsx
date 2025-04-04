function CreatedAt({ updatedAt }: { updatedAt: Date }) {
  return (
    <p className="text-base-content/60 text-sm">
      {new Date(updatedAt).toDateString()}
    </p>
  );
}
export default CreatedAt;
