const Home = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4"></div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4"></div>
      </div>
    </div>
  );
};

export default Home;
