import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import Layout from "./components/Layout";
import ContentList from "./components/ContentList";

function App() {
  return <Router>
    <Layout>
      <Route component={ContentList} />
    </Layout>
  </Router>
}

export default App;
