import { Provider } from "./Context";
import Form from "./components/Form";
import AllChannels from "./components/AllChannels";
import { Actions } from "./Actions";

function App() {
  const data = Actions();
  return (
    <Provider value={data}>
      <div className="flex-row ">
        <Form />
        <AllChannels />
      </div>
    </Provider>
  );
}

export default App;
