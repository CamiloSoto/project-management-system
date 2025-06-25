import {Provider} from "react-redux";

import AppRouter from "./router/AppRouter.tsx";
import store from "./store/store.ts";

const App = () => {
    return (
        <>
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </>
    );
};

export default App;
