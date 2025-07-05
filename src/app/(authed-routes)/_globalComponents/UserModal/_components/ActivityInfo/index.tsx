function ActivityInfo({
  count,
}: {
  count: {
    posts: number;
    following: number;
    followers: number;
  };
}) {
  const { posts, following, followers } = count;

  return (
    <div className="flex justify-between">
      <div className="grow text-center text-sm">
        <div className="font-bold leading-4">{posts}</div>
        <div>posts</div>
      </div>
      <div className="grow text-center text-sm">
        <div className="font-bold leading-4">{followers}</div>
        <div>followers</div>
      </div>
      <div className="grow text-center text-sm">
        <div className="font-bold leading-4">{following}</div>
        <div>following</div>
      </div>
    </div>
  );
}
export default ActivityInfo;
