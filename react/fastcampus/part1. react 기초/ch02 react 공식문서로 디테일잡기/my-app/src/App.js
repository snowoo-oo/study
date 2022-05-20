import './App.css';
import ClassComponent2 from './component/2-6.LifeCycle/ClassComponent';
import Composition from './component/2-4.Props/Composition';
import Extraction from './component/2-4.Props/Extraction/Extraction';
import ClassComponent from './component/2-5.State/ClassComponent';
import Event from './component/2-7.Event/Event';
import Condition from './component/2-8.ConditionalRendering/Condition';
import List from './component/2-9.List/List';
import ControlledComponent from './component/2-10.Form/ControlledComponent';
import UncontrolledComponent from './component/2-10.Form/UncontrolledComponent';
function App() {
  return (
    <div className="App">
      <UncontrolledComponent/>
      <ControlledComponent/>
      {/* <List/> */}
      {/* <Condition/> */}
      {/* <Event/> */}
      {/* <ClassComponent2 /> */}
      {/* <Extraction /> */}
      {/* <ClassComponent/> */}
      {/* <Composition /> */}
    </div>
  );
}

export default App;
