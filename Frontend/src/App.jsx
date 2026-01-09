
import { Provider } from "react-redux"
import MyStore from "./assets/MyStore"
import Body from "./Components/Body"

const App = () => {

  return (
    <div>
      <Provider store={MyStore}>
        <Body />
      </Provider>
    </div>)
}
export default App