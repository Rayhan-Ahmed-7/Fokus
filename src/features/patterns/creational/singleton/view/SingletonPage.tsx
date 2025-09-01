import SingletonCounter from "../components/SingletonCounter";
import NormalCounter from "../components/NormalCounter";

const SingletonPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-6">
      <h1 className="text-3xl font-bold">Singleton vs Non-Singleton</h1>

      <div className="flex gap-12">
        <div className="flex flex-col items-center gap-4">
          <SingletonCounter title="Counter A" />
          <SingletonCounter title="Counter B" />
          <SingletonCounter title="Counter C" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <NormalCounter title="Counter A" />
          <NormalCounter title="Counter B" />
          <NormalCounter title="Counter C" />
        </div>
      </div>
    </main>
  );
};

export default SingletonPage;
