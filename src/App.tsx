import { ArrowDown, HomeActive } from "./svg";

function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <div className="flex gap-10 items-center">
        <span>Hello world!</span>
        <ArrowDown color="red" />
        <HomeActive color="red" />
        <i className="friends_requests_icon"></i>
      </div>
    </h1>
  );
}

export default App;
